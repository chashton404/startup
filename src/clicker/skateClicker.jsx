import React from 'react';
import { NavLink } from "react-router-dom";
;

export function SkateClicker({accountData, setAccountData}) {

    // Declare the click state variable and the username
    const [count, setCount] = React.useState(0);
    const user = localStorage.getItem('username');

    // Find if user already exists
    React.useEffect(() => {     
        let existingUserIndex = accountData.findIndex((accountData) => accountData.name === user)

        if (existingUserIndex !== -1) {
            // Existing user: set count to their stored score
            setCount(accountData[existingUserIndex].clicks);
            localStorage.setItem('count', accountData[existingUserIndex].clicks);
        } else {
            // New user: set count to 0
            setCount(0);
            localStorage.setItem('count', 0);
        }
    }, [user]);
    
    function skateClicked() {
        let temporaryCount = count + 1;
        setCount(temporaryCount);
        localStorage.setItem('count', temporaryCount)
        saveScore(temporaryCount);
    }

    async function saveScore(temporaryCount) {
        const newScore = {name: localStorage.getItem('username'), clicks: temporaryCount};
        updateScoresLocal(newScore)
    }

    async function updateScoresLocal(newScore) {
        // Find if user already exists
        let existingUserIndex = accountData.findIndex((accountData) => accountData.name === user);

        // Get current scores from localStorage
        let localScores = [];
        const scoresText = localStorage.getItem('accountData');
        
        if (scoresText) {
            localScores = JSON.parse(scoresText);
        }

    
        if (existingUserIndex !== -1) {
            // Update existing user's score if new score is higher
            if (newScore.clicks > accountData[existingUserIndex].clicks) {
                localScores[existingUserIndex] = newScore;
            }
        } else {
            // Add new user
            localScores.push(newScore);
        }

        localScores.sort((a, b) => b.clicks - a.clicks);
        if (localScores.length > 10) {
            localScores.length = 10;
        }
    
        // Always update localStorage
        localStorage.setItem('accountData', JSON.stringify(localScores));
        
        // Update state with the new scores array
        setAccountData([...localScores]); // Create a new array to ensure React detects the change
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