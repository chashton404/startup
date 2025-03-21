import React from 'react';
import { NavLink } from "react-router-dom";
;

export function SkateClicker({scores, setScores}) {

    const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
    
    function skateClicked() {
        setCount(count + 1);
        localStorage.setItem('count', count + 1)
        saveScore();
    }

    async function saveScore() {
        const newScore = {name: localStorage.getItem('username'), clicks: count};
        updateScoresLocal(newScore)
    }

    async function updateScoresLocal(newScore) {
        // Get current scores from localStorage
        let scores = [];
        const scoresText = localStorage.getItem('scores');
        
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
    
        // Find if user already exists
        let existingUserIndex = scores.findIndex((score) => score.name === newScore.name);
    
        if (existingUserIndex !== -1) {
            // Update existing user's score if new score is higher
            if (newScore.clicks > scores[existingUserIndex].clicks) {
                scores[existingUserIndex] = newScore;
            }
        } else {
            // Add new user
            scores.push(newScore);
        }

        scores.sort((a, b) => b.clicks - a.clicks);
        if (scores.length > 10) {
            scores.length = 10;
        }
    
        // Always update localStorage
        localStorage.setItem('scores', JSON.stringify(scores));
        
        // Update state with the new scores array
        setScores([...scores]); // Create a new array to ensure React detects the change
    }


    return (
        <main style={{ height: 'calc(100vh - 200px)' }}>
            <div className="container">
                <div className="row w-100 pt-4">
                    <div className="col-md-2">
                        <NavLink to="/landing" className="back-button"> &lt; &lt; BACK </NavLink>
                    </div>
                    <div className="col-md-10">
                        <h2>Click the Skate to increase your score and become the top skater!</h2>
                    </div>  
                </div>
                <div onClick={skateClicked}  className="row w-100 p-3 align-items-center justify-content-center">
                    <div style={{border: "2px solid black", backgroundColor: "white", borderRadius: "15px", padding: "20px", width: "350px"}}>
                        <img src="public/skate-placeholders/ninja-skate.svg" alt="live rendering of the options selected" className="skate-designer-rendering"/>
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <h1>Clicks:</h1>
                    <h1 style={{fontFamily: 'Syne'}}>{count}</h1>
                </div>
            </div>
        </main>
    );
}