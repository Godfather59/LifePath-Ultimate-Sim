import React, { useState, useEffect } from 'react';
import { Person } from './logic/Person';
import { GameEngine } from './logic/GameEngine';
import { INITIAL_EVENTS } from './logic/Events';
import { Hud } from './components/Hud';
import { EventLog } from './components/EventLog';
import { ActionMenu } from './components/ActionMenu';
import { OccupationMenu } from './components/OccupationMenu';
import { ActivitiesMenu } from './components/ActivitiesMenu';
import { DecisionModal } from './components/DecisionModal';
import { AssetsMenu } from './components/AssetsMenu';
import { RelationshipsMenu } from './components/RelationshipsMenu';
import { EducationMenu } from './components/EducationMenu';
import { GameOver } from './components/GameOver';
import { AchievementsMenu } from './components/AchievementsMenu';
import { MainMenu } from './components/MainMenu';
import { MiniGameModal } from './components/MiniGameModal';
import { Toast } from './components/Toast';
import { SystemMenu } from './components/SystemMenu';
import { LoveMenu } from './components/LoveMenu';
import { CareerModal } from './components/CareerModal';
import { MafiaMenu } from './components/MafiaMenu';
import { RoyaltyMenu } from './components/RoyaltyMenu';
import { PoliticsMenu } from './components/PoliticsMenu';
import { GamblingMenu } from './components/GamblingMenu';
import { SocialMenu } from './components/SocialMenu';
import { GodModeMenu } from './components/GodModeMenu';
import { Minesweeper } from './components/Minesweeper';
import { DoctorMenu } from './components/DoctorMenu';
import { SaveSlotMenu } from './components/SaveSlotMenu';
import { HobbiesMenu } from './components/HobbiesMenu';
import { PetsMenu } from './components/PetsMenu';
import { PrisonMenu } from './components/PrisonMenu';
import { WillMenu } from './components/WillMenu';
import { StatsMenu } from './components/StatsMenu';
import { FamilyTreeMenu } from './components/FamilyTreeMenu';
import { ACHIEVEMENTS, checkAchievements } from './logic/Achievements';
import { applyTheme, getStoredTheme } from './logic/themes';
import { lifetimeStats } from './logic/LifetimeStats';
import { familyTree } from './logic/DynastyMode';

function App() {
  const [person, setPerson] = useState(null);
  const [modal, setModal] = useState(null); // 'occupation', 'activities', etc.
  const [modalData, setModalData] = useState({}); // Extra data for modals

  // Achievements State
  const [achievements, setAchievements] = useState([]);

  // Theme State
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme());

  // Save Slots State
  const [currentSlotId, setCurrentSlotId] = useState(null);

  // Initialize Logic
  const initNewGame = (config) => {
    const newPerson = new Person(config.firstName, config.lastName, config.gender, config.country);

    // Create new slot ID
    const slotId = `slot_${Date.now()}`;
    setCurrentSlotId(slotId);

    INITIAL_EVENTS.forEach(eventGen => {
      newPerson.logEvent(eventGen(newPerson), "neutral");
    });
    newPerson.logEvent(`You were born in ${newPerson.country}.`, "neutral");

    GameEngine.initializeFamily(newPerson);
    setPerson(newPerson);

    // Save Initial State
    saveGameData(newPerson, slotId);
  };

  const saveGameData = (personObj, slotId) => {
    if (!slotId) return;

    // Save Person Data
    localStorage.setItem(`bitlife_save_${slotId}`, JSON.stringify(personObj));

    // Update Meta
    let meta = [];
    try {
      const existing = localStorage.getItem('bitlife_save_meta');
      if (existing) meta = JSON.parse(existing);
    } catch (e) { meta = []; }

    // Remove existing entry for this slot if generic check
    meta = meta.filter(m => m.id !== slotId);

    // Add updated entry
    meta.unshift({
      id: slotId,
      name: personObj.getFullName(),
      age: personObj.age,
      job: personObj.job ? personObj.job.title : 'Unemployed',
      lastPlayed: Date.now()
    });

    localStorage.setItem('bitlife_save_meta', JSON.stringify(meta));
  };

  const loadGameData = (slotId) => {
    try {
      const data = localStorage.getItem(`bitlife_save_${slotId}`);
      if (!data) throw new Error("Save not found");

      const loadedPerson = Person.load(JSON.parse(data));
      setPerson(loadedPerson);
      setCurrentSlotId(slotId);
      showToast(`Welcome back, ${loadedPerson.name.first}!`, "good");
    } catch (e) {
      showToast("Failed to load save.", "bad");
    }
  };

  // Save State
  const [hasSave, setHasSave] = useState(false);
  const [saveSummary, setSaveSummary] = useState(null);

  // Initialize: Check for save file and apply theme
  useEffect(() => {
    // Apply saved theme
    applyTheme(currentTheme);

    // Load Achievements
    const savedAch = localStorage.getItem('bitlife_achievements');
    if (savedAch) {
      setAchievements(JSON.parse(savedAch));
    }

    // Check for Game Saves (Meta)
    const metaStr = localStorage.getItem('bitlife_save_meta');
    // Migration check: if no meta but old save exists
    const oldSave = localStorage.getItem('bitlife_save');
    if (!metaStr && oldSave) {
      // Migrate Logic could go here, or just ignore. 
      // Let's keep it simple: if meta exists, use it.
    }

    if (metaStr) {
      try {
        const meta = JSON.parse(metaStr);
        if (meta.length > 0) {
          setHasSave(true);
          const recent = meta.sort((a, b) => b.lastPlayed - a.lastPlayed)[0];
          setSaveSummary(recent);
        }
      } catch (e) { console.error(e); }
    }
  }, []);



  const handleContinue = () => {
    // Continue most recent save
    const meta = JSON.parse(localStorage.getItem('bitlife_save_meta') || '[]');
    if (meta.length > 0) {
      const recent = meta.sort((a, b) => b.lastPlayed - a.lastPlayed)[0];
      loadGameData(recent.id);
    }
  };

  const handleLoadSlot = (slotId) => {
    loadGameData(slotId);
    setModal(null);
  };


  const handleExitToMenu = () => {
    // Save before exiting just in case
    if (person && currentSlotId) {
      saveGameData(person, currentSlotId);
    }
    setPerson(null);
    setCurrentSlotId(null);

    // Refresh Meta for Main Menu
    const meta = JSON.parse(localStorage.getItem('bitlife_save_meta') || '[]');
    if (meta.length > 0) {
      setHasSave(true);
      // Find most recent
      const recent = meta.sort((a, b) => b.lastPlayed - a.lastPlayed)[0];
      setSaveSummary(recent);
    } else {
      setHasSave(false);
      setSaveSummary(null);
    }
  };

  // Auto-save whenever person changes
  useEffect(() => {
    if (person && currentSlotId) {
      saveGameData(person, currentSlotId);

      // Check for new achievements
      const newUnlocks = checkAchievements(person, achievements);
      if (newUnlocks.length > 0) {
        const updatedAch = [...achievements, ...newUnlocks];
        setAchievements(updatedAch);
        localStorage.setItem('bitlife_achievements', JSON.stringify(updatedAch));

        // Notify user
        newUnlocks.forEach(id => {
          const ach = ACHIEVEMENTS.find(a => a.id === id);
          person.logEvent(`🏆 Achievement Unlocked: ${ach.title}!`, "good");
        });
        updatePerson(person);
      }
    }
  }, [person, achievements, currentSlotId]);

  // Helper to safely update person state
  const runAction = (actionFn) => {
    setPerson(prevPerson => {
      const newPerson = prevPerson.clone();
      actionFn(newPerson);
      return newPerson;
    });
  };

  // Deprecated: updatePerson was causing issues, replacing usages
  // Keeping it temporarily if needed but runAction is preferred
  const updatePerson = (newPerson) => {
    setPerson(newPerson.clone());
  };

  const handleAgeUp = () => {
    if (!person.isAlive) return;
    runAction(p => GameEngine.ageUp(p));
  };

  const handleAgeSkip = (years) => {
    if (!person.isAlive) return;
    for (let i = 0; i < years; i++) {
      if (!person.isAlive) break;
      runAction(p => GameEngine.ageUp(p));
    }
  };

  // Toast State
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'neutral') => {
    setToast({ message, type });
  };

  const handleAction = (type) => {
    if (!person.isAlive) return;

    if (type === 'occupation') {
      if (person.age < 18) {
        showToast("You are too young to work full-time!", "bad");
        return;
      }
      setModal('occupation');
      return;
    }
    if (type === 'education') {
      // Allow opening education at any age now, so we can see elementary school
      setModal('education');
      return;
    }
    if (type === 'assets') {
      if (person.age < 18) {
        showToast("You must be 18 to manage assets!", "bad");
        return;
      }
      setModal('assets');
      return;
    }
    if (type === 'relationships') {
      setModal('relationships');
      return;
    }
    if (type === 'pets') {
      setModal('pets');
      return;
    }
    if (type === 'activities') {
      setModal('activities');
      return;
    }
    if (type === 'achievements') {
      setModal('achievements');
      return;
    }

    showToast(`You opened ${type}. (Feature coming soon)`, "neutral");
  };

  const handleJobApplication = (job) => {
    runAction(p => {
      if (job.isMilitary) {
        const success = p.joinMilitary(job.branch, job.isOfficer);
        if (success) setModal(null);
      } else {
        const hired = p.setJob(job);
        if (hired) setModal(null);
      }
    });
  };

  const handleActivity = (activity) => {
    if (activity.isSocial) {
      setModal('social');
      return;
    }
    if (activity.isLove) {
      if (person.age < 14) {
        showToast("You are too young to date!", "bad");
        return;
      }
      setModal('love');
      return;
    }
    if (activity.isMusic) {
      setModal('career_music');
      return;
    }
    if (activity.isMafia) {
      setModal('mafia');
      return;
    }
    if (activity.crimeType === 'burglary') {
      setModal('minigame_burglary');
      setModalData({ difficulty: Math.floor(Math.random() * 3) + 1 });
      return;
    }
    if (activity.isMafia) {
      setModal('mafia');
      return;
    }
    if (activity.isRoyalty) {
      setModal('royalty');
      return;
    }
    if (activity.isPolitics) {
      setModal('politics');
      return;
    }
    if (activity.isGambling) {
      setModal('gambling');
      return;
    }
    if (activity.isDoctor) {
      setModal('doctor');
      return;
    }
    if (activity.isDoctor) {
      setModal('doctor');
      return;
    }
    if (activity.isHobbies) {
      setModal('hobbies');
      return;
    }
    if (activity.isWill) {
      if (person.age < 18) {
        showToast("You must be 18 to create a will!", "bad");
        return;
      }
      setModal('will');
      return;
    }
    runAction(p => p.performActivity(activity));
  };

  // Main Menu Logic
  const [showLoadMenu, setShowLoadMenu] = useState(false);

  if (!person) {
    if (showLoadMenu) {
      return (
        <SaveSlotMenu
          onSelectSlot={(slotId) => {
            loadGameData(slotId);
            setShowLoadMenu(false);
          }}
          onNewGame={() => setShowLoadMenu(false)}
          onClose={() => setShowLoadMenu(false)}
        />
      );
    }
    return (
      <MainMenu
        onStartGame={initNewGame}
        onContinue={handleContinue}
        onLoad={() => setShowLoadMenu(true)}
        hasSave={hasSave}
        saveSummary={saveSummary}
      />
    );
  }

  return (
    <div className="app-container">
      <Hud person={person} onOpenMenu={() => setModal('system')} />
      <EventLog history={person.history} />
      {person.isInPrison ? (
        <PrisonMenu
          person={person}
          onAction={(action) => runAction(p => p.prisonAction(action))}
          onClose={() => { }}
        />
      ) : (
        <ActionMenu
          onAgeUp={handleAgeUp}
          onAction={handleAction}
          onAgeSkip={handleAgeSkip}
        />
      )}

      {/* Interactive Modals */}
      {modal === 'system' && (
        <SystemMenu
          onResume={() => setModal(null)}
          onSave={() => {
            localStorage.setItem('bitlife_save', JSON.stringify(person));
            showToast("Game Saved!", "good");
            setModal(null);
          }}
          onGodMode={() => setModal('god_mode')}
          onExit={() => {
            handleExitToMenu();
            setModal(null);
          }}
        />
      )}

      {modal === 'god_mode' && (
        <GodModeMenu
          person={person}
          onUpdate={(updateFn) => {
            runAction(updateFn);
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'occupation' && (
        <OccupationMenu
          person={person}
          onApply={handleJobApplication}
          onQuit={() => runAction(p => p.quitJob())}
          onClose={(action) => {
            if (action === 'deploy') {
              setModal('minesweeper');
            } else {
              setModal(null);
            }
          }}
        />
      )}

      {modal === 'activities' && (
        <ActivitiesMenu
          person={person}
          onDoActivity={handleActivity}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'love' && (
        <LoveMenu
          person={person}
          onDate={(candidate) => {
            runAction(p => p.startDating(candidate));
            setModal(null);
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'career_music' && (
        <CareerModal
          person={person}
          onAction={(action, payload) => {
            if (action === 'voice') runAction(p => p.practiceSkill('voice'));
            if (action === 'practice') runAction(p => p.practiceSkill(payload));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'social' && (
        <SocialMenu
          person={person}
          onPost={(platform, post) => runAction(p => p.postToSocial(platform.id, post.id))}
          onMonetize={(platform) => runAction(p => p.monetizeSocial(platform.id))}
          onBuyFollowers={(platform) => {
            runAction(p => {
              if (p.money >= 100) {
                p.money -= 100;
                if (!p.social.platforms[platform.id]) p.social.platforms[platform.id] = { followers: 0, posts: 0 };
                p.social.platforms[platform.id].followers += 500;
                p.logEvent(`You bought 500 followers for ${platform.name}.`, "neutral");
              } else {
                p.logEvent("You can't afford that!", "bad");
              }
            });
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'relationships' && (
        <RelationshipsMenu
          person={person}
          onInteract={(id, action, payload) => {
            runAction(p => p.interactWithRel(id, action, payload));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'mafia' && (
        <MafiaMenu
          person={person}
          onJoin={(family) => {
            runAction(p => {
              const joined = p.joinMafia(family);
              // If failed, maybe we alert? Log event handles it.
              // We rely on log events.
            });
          }}
          onAction={(action) => {
            runAction(p => p.performMafiaAction(action));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'royalty' && (
        <RoyaltyMenu
          person={person}
          onAction={(action) => {
            runAction(p => {
              if (action === 'public_service') p.performRoyalDuty();
              if (action === 'abdicate') p.abdicate();
              if (action === 'execute') p.executeSubject();
              if (action === 'abdicate' || action === 'execute') setModal(null); // Close on big actions
            });
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'politics' && (
        <PoliticsMenu
          person={person}
          onRun={(office) => {
            runAction(p => {
              if (p.startCampaign(office)) {
                // Keep modal open to show campaign dashboard immediately if desired
                // or rely on re-render to show dashboard view
              }
            });
          }}
          onCampaignAction={(action) => {
            runAction(p => p.campaignAction(action));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'gambling' && (
        <GamblingMenu
          person={person}
          onResult={(amount) => {
            runAction(p => {
              p.money += amount;
              if (amount > 0) p.logEvent(`You won $${amount.toLocaleString()} gambling!`, "good");
              else p.logEvent(`You lost $${Math.abs(amount).toLocaleString()} gambling.`, "bad");
            });
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'education' && (
        <EducationMenu
          person={person}
          onEnroll={(school) => {
            runAction(p => {
              const success = p.enrollInSchool(school);
              if (success) setModal(null);
            });
          }}
          onStudy={() => {
            runAction(p => p.studyHard());
          }}
          onDropOut={() => {
            runAction(p => p.dropOut());
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'assets' && (
        <AssetsMenu
          person={person}
          onBuy={(asset, mortgage) => {
            runAction(p => p.buyAsset(asset, mortgage));
          }}
          onSell={(index) => {
            runAction(p => p.sellAsset(index));
          }}
          onRent={(index, amount) => runAction(p => p.rentAsset(index, amount))}
          onEvict={(index) => runAction(p => p.evictTenant(index))}
          onInvest={(asset, amount) => runAction(p => p.buyInvestment(asset, amount))}
          onDivest={(id) => runAction(p => p.sellInvestment(id))}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'achievements' && (
        <AchievementsMenu
          unlockedIds={achievements}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'minigame_burglary' && (
        <MiniGameModal
          type="burglary"
          difficulty={modalData?.difficulty || 1} // Dynamic difficulty
          onResult={(success) => {
            setModal(null);
            runAction(p => p.commitCrime('burglary', success));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'minesweeper' && (
        <Minesweeper
          onWin={() => {
            setModal(null);
            runAction(p => {
              p.logEvent("MISSION ACCOMPLISHED! You survived the minefield.", "good");
              p.promoteMilitary(); // Promotion for heroism
            });
          }}
          onLose={() => {
            setModal(null);
            runAction(p => {
              p.logEvent("BOOM! You stepped on a mine.", "bad");
              p.isAlive = false;
              p.logEvent("You were killed in action.", "bad");
            });
          }}
          onClose={() => {
            setModal(null);
            runAction(p => p.logEvent("You retreated from the minefield. Coward.", "bad"));
          }}
        />
      )}


      {modal === 'doctor' && (
        <DoctorMenu
          person={person}
          onTreat={(t) => {
            runAction(p => p.visitDoctor(t));
            setModal(null);
          }}
          onSurgery={(s) => {
            runAction(p => p.plasticSurgery(s));
            setModal(null);
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'will' && (
        <WillMenu
          person={person}
          onCreateWill={(beneficiary, allocations) => {
            runAction(p => p.createWill(beneficiary, allocations));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'hobbies' && (
        <HobbiesMenu
          person={person}
          onPractice={(skillId) => {
            runAction(p => p.practiceSkill(skillId));
          }}
          onClose={() => setModal(null)}
        />

      )}

      {modal === 'pets' && (
        <PetsMenu
          person={person}
          onInteract={(index, action) => {
            runAction(p => p.interactWithPet(index, action));
          }}
          onAdopt={(pet) => {
            runAction(p => p.adoptPet(pet));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'stats' && (
        <StatsMenu
          stats={lifetimeStats.getStats()}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'familytree' && (
        <FamilyTreeMenu
          familyTree={familyTree}
          onClose={() => setModal(null)}
        />
      )}

      {person.pendingEvent && (
        <DecisionModal
          event={person.pendingEvent}
          onChoice={(choice) => {
            runAction(p => p.resolveEvent(choice));
          }}
        />
      )}

      {!person.isAlive && (
        <GameOver
          person={person}
          onRestart={(child) => {
            if (child && child.type === 'Child') {
              // Inheritance Mode
              const heir = person.inherit(child);
              // Ensure immediate save and state update
              setPerson(heir);
              // Overwrite current slot? Or new one? Let's overwrite for continuity.
              saveGameData(heir, currentSlotId);
            } else {
              // Clean Restart - Go back to Main Menu
              // Maybe delete the save slot if they died and didn't inherit?
              // For now, just clear person.
              setPerson(null);
              setCurrentSlotId(null);
            }
          }}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
