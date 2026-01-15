import React, { useState, useEffect, useCallback } from 'react';
import './Modal.css';

// Simple grid-based game: Avoid the dogs/police (obstacles) to reach the loot (goal)
export function MiniGameModal({ type, difficulty, onResult, onClose }) {
    const [gameState, setGameState] = useState('playing'); // playing, won, lost
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });

    // Config based on type
    // Dynamic Config based on difficulty
    const GRID_SIZE = 5 + difficulty; // 6, 7, 8...

    // Generate Level
    const [levelConfig] = useState(() => {
        const goal = { x: GRID_SIZE - 1, y: GRID_SIZE - 1 };
        const obstacles = [];
        const numObstacles = Math.floor((GRID_SIZE * GRID_SIZE) * (0.15 + (difficulty * 0.05))); // 20-30% density

        // Simple random placement (ensuring start and end are clear)
        for (let i = 0; i < numObstacles; i++) {
            let x, y;
            do {
                x = Math.floor(Math.random() * GRID_SIZE);
                y = Math.floor(Math.random() * GRID_SIZE);
            } while ((x === 0 && y === 0) || (x === goal.x && y === goal.y) || obstacles.some(o => o.x === x && o.y === y));
            obstacles.push({ x, y });
        }
        return { goal, obstacles };
    });

    const GOAL_POS = levelConfig.goal;
    const OBSTACLES = levelConfig.obstacles;

    const movePlayer = useCallback((dx, dy) => {
        if (gameState !== 'playing') return;

        setPlayerPos(prev => {
            const newX = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dx));
            const newY = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dy));

            // Check collision with obstacles
            if (OBSTACLES.some(obs => obs.x === newX && obs.y === newY)) {
                setGameState('lost');
                setTimeout(() => onResult(false), 1000);
                return { x: newX, y: newY };
            }

            // Check win
            if (newX === GOAL_POS.x && newY === GOAL_POS.y) {
                setGameState('won');
                setTimeout(() => onResult(true), 1000);
            }

            return { x: newX, y: newY };
        });
    }, [gameState, onResult]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') movePlayer(0, -1);
            if (e.key === 'ArrowDown') movePlayer(0, 1);
            if (e.key === 'ArrowLeft') movePlayer(-1, 0);
            if (e.key === 'ArrowRight') movePlayer(1, 0);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer]);

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ textAlign: 'center' }}>
                <h3 className="modal-title">Burglary: Steal the Loot!</h3>
                {gameState === 'lost' && <h2 style={{ color: 'red' }}>BUSTED! 👮</h2>}
                {gameState === 'won' && <h2 style={{ color: 'green' }}>ESCAPED! 💰</h2>}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)`,
                    gap: '4px',
                    justifyContent: 'center',
                    margin: '20px auto',
                    userSelect: 'none'
                }}>
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE;
                        const y = Math.floor(i / GRID_SIZE);

                        let content = '';
                        let bg = '#eee';

                        if (x === playerPos.x && y === playerPos.y) {
                            content = '🦹'; // Player
                            bg = '#fffde7'; // Highlight
                        } else if (x === GOAL_POS.x && y === GOAL_POS.y) {
                            content = '💎'; // Goal
                            bg = '#e3f2fd';
                        } else if (OBSTACLES.some(o => o.x === x && o.y === y)) {
                            content = '🐕'; // Dog/Guard
                            bg = '#ffebee';
                        }

                        return (
                            <div key={i} style={{
                                width: '40px',
                                height: '40px',
                                background: bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}>
                                {content}
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '200px', margin: '0 auto' }}>
                    <div />
                    <button onClick={() => movePlayer(0, -1)}>⬆️</button>
                    <div />
                    <button onClick={() => movePlayer(-1, 0)}>⬅️</button>
                    <button onClick={() => movePlayer(0, 1)}>⬇️</button>
                    <button onClick={() => movePlayer(1, 0)}>➡️</button>
                </div>

                <button onClick={onClose} style={{ marginTop: '20px', padding: '8px 16px' }}>Cancel</button>
            </div>
        </div>
    );
}
