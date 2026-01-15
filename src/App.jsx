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
import { PoliticsMenu } from './components/PoliticsMenu';
import { GamblingMenu } from './components/GamblingMenu';
import { SocialMenu } from './components/SocialMenu';
import { GodModeMenu } from './components/GodModeMenu';
import { Minesweeper } from './components/Minesweeper';
import { DoctorMenu } from './components/DoctorMenu';
import { SaveSlotMenu } from './components/SaveSlotMenu';
import { ACHIEVEMENTS, checkAchievements } from './logic/Achievements';

function App() {
  const [person, setPerson] = useState(null);
  const [modal, setModal] = useState(null); // 'occupation', 'activities', etc.

  // Achievements State
  const [achievements, setAchievements] = useState([]);

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

  // Initialize: Check for save file
  useEffect(() => {
    // Load Achievements
    const savedAch = localStorage.getItem('bitlife_achievements');
    if (savedAch) {
      setAchievements(JSON.parse(savedAch));
    }

    // Check for Game Save
    const savedData = localStorage.getItem('bitlife_save'); // This is the old single save, will be removed later
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setHasSave(true);
        // Extract summary details safely
        setSaveSummary({
          name: `${data.name?.first || 'Unknown'} ${data.name?.last || ''}`,
          age: data.age || 0,
          job: data.job?.title || 'Unemployed'
        });
      } catch (e) {
        console.error("Corrupt save found:", e);
        localStorage.removeItem('bitlife_save');
      }
    }
  }, []);

  const handleContinue = () => {
    const savedData = localStorage.getItem('bitlife_save');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        const loadedPerson = Person.load(data);
        setPerson(loadedPerson);
        // Ensure toast system is ready? It's part of render, so yes.
        showToast(`Welcome back, ${loadedPerson.name.first}!`, "good");
      } catch (e) {
        showToast("Failed to load save file.", "bad");
      }
    }
  };

  const handleExitToMenu = () => {
    // Save before exiting just in case
    if (person) {
      localStorage.setItem('bitlife_save', JSON.stringify(person));
    }
    setPerson(null);
    // Re-check save state
    setHasSave(true);
    // We assume if we just exited, we have a save. 
    // To be safer we could re-read localStorage but this is fine.
    const savedData = localStorage.getItem('bitlife_save');
    if (savedData) {
      const data = JSON.parse(savedData);
      setSaveSummary({
        name: `${data.name?.first} ${data.name?.last}`,
        age: data.age,
        job: data.job?.title || 'Unemployed'
      });
    }
  };

  // Auto-save whenever person changes
  useEffect(() => {
    if (person) {
      localStorage.setItem('bitlife_save', JSON.stringify(person));

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
  }, [person, achievements]);

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
        p.joinMilitary(job.branch);
        setModal(null);
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
    if (activity.crimeType === 'burglary') {
      setModal('minigame_burglary');
      return;
    }
    if (activity.isMafia) {
      setModal('mafia');
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
    runAction(p => p.performActivity(activity));
  };

  // Main Menu Logic
  const [showLoadMenu, setShowLoadMenu] = useState(false);

  if (!person) {
    if (showLoadMenu) {
      return (
        <SaveSlotMenu
          onSelectSlot={loadGameData}
          onNewGame={() => setShowLoadMenu(false)} // user wants new game instead
          onClose={() => setShowLoadMenu(false)}
        />
      );
    }
    return (
      <MainMenu
        onStartGame={initNewGame}
        onContinue={() => setShowLoadMenu(true)} // "Load Game" button now opens menu
        hasSave={true} // Always show Load button (it handles empty check inside)
        saveSummary={null} // Deprecated summary view
      />
    );
  }

  return (
    <div className="app-container">
      <Hud person={person} onOpenMenu={() => setModal('system')} />
      <EventLog history={person.history} />
      <ActionMenu onAgeUp={handleAgeUp} onAction={handleAction} />

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
          onUpdatePerson={(p) => updatePerson(p)}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'relationships' && (
        <RelationshipsMenu
          person={person}
          onInteract={(id, action) => {
            runAction(p => p.interactWithRel(id, action));
          }}
          onClose={() => setModal(null)}
        />
      )}

      {modal === 'mafia' && (
        <MafiaMenu
          person={person}
          onJoin={(family) => {
            const success = person.joinMafia(family); // Returns bool, but we need to update state
            runAction(p => p.joinMafia(family)); // Re-run to update state properly
            if (!success) setModal(null); // Close if rejected? Actually better to stay open or show toast. 
            // simplify: let logEvent show result, we just rerender
          }}
          onAction={(action) => {
            runAction(p => p.performMafiaAction(action));
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
          difficulty={1} // Could scale with age or something
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
              localStorage.setItem('bitlife_save', JSON.stringify(heir));
            } else {
              // Clean Restart - Go back to Main Menu
              localStorage.removeItem('bitlife_save');
              setPerson(null);
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
