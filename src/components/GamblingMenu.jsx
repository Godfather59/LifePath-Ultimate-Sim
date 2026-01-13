import React, { useState, useEffect } from 'react';
import { createDeck, calculateScore, HORSES, runRace, playLottery } from '../logic/Gambling';
import './Modal.css';

export function GamblingMenu({ person, onResult, onClose }) {
    const [view, setView] = useState('menu'); // menu, blackjack, horses, lottery
    const [bet, setBet] = useState(100);

    // Blackjack State
    const [deck, setDeck] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameState, setGameState] = useState('betting'); // betting, playing, result

    // Racing State
    const [selectedHorse, setSelectedHorse] = useState(null);

    // Helpers
    const handleBetChange = (e) => setBet(Number(e.target.value));

    // --- BLACKJACK LOGIC ---
    const startBlackjack = () => {
        if (person.money < bet) {
            alert("You don't have enough money!");
            return;
        }
        const newDeck = createDeck();
        const pHand = [newDeck.pop(), newDeck.pop()];
        const dHand = [newDeck.pop(), newDeck.pop()];
        setDeck(newDeck);
        setPlayerHand(pHand);
        setDealerHand(dHand);
        setGameState('playing');
        onResult(-bet); // Deduct bet immediately
    };

    const hit = () => {
        const newDeck = [...deck];
        const card = newDeck.pop();
        const newHand = [...playerHand, card];
        setPlayerHand(newHand);
        setDeck(newDeck);
        if (calculateScore(newHand) > 21) {
            endBlackjack(newHand, dealerHand, 'bust');
        }
    };

    const stand = () => {
        let dHand = [...dealerHand];
        let dDeck = [...deck];
        while (calculateScore(dHand) < 17) {
            dHand.push(dDeck.pop());
        }
        setDealerHand(dHand);
        setDeck(dDeck);
        endBlackjack(playerHand, dHand, 'compare');
    };

    const endBlackjack = (pHand, dHand, reason) => {
        const pScore = calculateScore(pHand);
        const dScore = calculateScore(dHand);
        let winAmount = 0;
        let msg = "";

        if (reason === 'bust') {
            msg = "Busted! You lose.";
        } else if (dScore > 21) {
            msg = "Dealer busts! You win!";
            winAmount = bet * 2;
        } else if (pScore > dScore) {
            msg = "You win!";
            winAmount = bet * 2;
        } else if (pScore === dScore) {
            msg = "Push (Tie). Back your money.";
            winAmount = bet;
        } else {
            msg = "Dealer wins.";
        }

        if (winAmount > 0) onResult(winAmount);
        setGameState('result');
        alert(`${msg} (Results: You ${pScore}, Dealer ${dScore})`);
    };

    // --- RACING LOGIC ---
    const betHorse = () => {
        if (person.money < bet) {
            alert("Broke!");
            return;
        }
        if (!selectedHorse) return;

        onResult(-bet); // Pay entry
        const winnerId = runRace();
        const winner = HORSES.find(h => h.id === winnerId);

        if (selectedHorse === winnerId) {
            const winnings = bet * winner.odds;
            onResult(winnings);
            alert(`🏆 ${winner.name} WON! You won $${winnings.toLocaleString()}!`);
        } else {
            alert(`🐎 ${winner.name} won the race. You lost.`);
        }
    };

    // --- RENDER ---
    if (view === 'menu') {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">🎰 High Roller Casino</h2>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <button className="list-item" onClick={() => setView('blackjack')}>
                            🃏 Blackjack
                        </button>
                        <button className="list-item" onClick={() => setView('horses')}>
                            🐎 Horse Racing
                        </button>
                        <button className="list-item" onClick={() => {
                            if (person.money < 5) return;
                            onResult(-5);
                            if (playLottery()) {
                                onResult(10000000);
                                alert("JACKPOT!!! YOU WON $10,000,000!");
                            } else {
                                alert("You lost the lottery. ($5)");
                            }
                        }}>
                            🎟️ Buy Lottery Ticket ($5)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'blackjack') {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Blackjack</h2>
                        <button onClick={() => setView('menu')}>Back</button>
                    </div>
                    <div className="modal-body" style={{ textAlign: 'center' }}>
                        {gameState === 'betting' ? (
                            <div>
                                <input type="number" value={bet} onChange={handleBetChange} />
                                <button className="btn-primary" onClick={startBlackjack}>Deal</button>
                            </div>
                        ) : (
                            <div>
                                <h3>Dealer: {gameState === 'playing' ? '?' : calculateScore(dealerHand)}</h3>
                                <div>{dealerHand.map(c => `${c.rank}${c.suit} `)}</div>

                                <h3>You: {calculateScore(playerHand)}</h3>
                                <div>{playerHand.map(c => `${c.rank}${c.suit} `)}</div>

                                {gameState === 'playing' && (
                                    <div style={{ marginTop: '20px' }}>
                                        <button className="btn-primary" onClick={hit}>Hit</button>
                                        <button className="btn-secondary" onClick={stand}>Stand</button>
                                    </div>
                                )}
                                {gameState === 'result' && (
                                    <button className="btn-primary" onClick={() => setGameState('betting')}>Play Again</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'horses') {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Horse Racing</h2>
                        <button onClick={() => setView('menu')}>Back</button>
                    </div>
                    <div className="modal-body">
                        <input type="number" value={bet} onChange={handleBetChange} style={{ marginBottom: '10px' }} />
                        {HORSES.map(h => (
                            <div key={h.id}
                                className={`list-item ${selectedHorse === h.id ? 'selected' : ''}`}
                                onClick={() => setSelectedHorse(h.id)}
                                style={{ background: selectedHorse === h.id ? '#4caf50' : '' }}
                            >
                                <span>{h.name}</span>
                                <span>{h.odds}:1</span>
                            </div>
                        ))}
                        <button className="btn-primary" onClick={betHorse}>Start Race!</button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
