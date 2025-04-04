import React from 'react';
import { NavLink } from "react-router-dom";
import { RollerSkate } from '../../lib/originalRollerskate';

export function SkateClicker({accountData, setAccountData, highScores, setHighScores}) {

    // Declare the click state variable and the username
    const [count, setCount] = React.useState(0);
    const user = localStorage.getItem('username');
    let existingUserIndex = accountData.findIndex((accountData) => accountData.name === user);
    const localEquippedSkate = accountData[existingUserIndex].equippedSkate;

    // Find if user already exists
    React.useEffect(() => {     
        // Existing user: set count to their stored score
        setCount(accountData[existingUserIndex].clicks);
        localStorage.setItem('count', accountData[existingUserIndex].clicks);
    }, [user]);
    
    function skateClicked() {
        let temporaryCount = count + 1;
        setCount(temporaryCount);
        localStorage.setItem('count', temporaryCount)
        updateScoresLocal(temporaryCount);
    }

    async function updateScoresLocal(temporaryCount) {

        // Create a new score object
        const newScore = {name: localStorage.getItem('username'), clicks: temporaryCount, skates: accountData[existingUserIndex].skates, equippedSkate: accountData[existingUserIndex].equippedSkate};

        // Get current scores from localStorage
        let localScores = JSON.parse(localStorage.getItem('accountData'));

        if (newScore.clicks > accountData[existingUserIndex].clicks) {
            localScores[existingUserIndex] = newScore;
        }

        // Sort the scores array
        localScores.sort((a, b) => b.clicks - a.clicks);

        // Get the top 10 scores and set them equal to the highScores array, map through them and only take the name and the clicks
        let localHighScores = localScores.slice(0, 10).map((score) => {
            return {name: score.name, clicks: score.clicks};}
        );
    
        // Always update localStorage
        localStorage.setItem('accountData', JSON.stringify(localScores));
        localStorage.setItem('highScores', JSON.stringify(localHighScores));
        
        // Update state with the new scores array
        setAccountData([...localScores]); // Create a new array to ensure React detects the change
        setHighScores([...localHighScores]);
    }


    return (
        <main style={{ height: 'calc(100vh - 200px)' }}>
            <div className="container">
                <div className="row w-100 pt-4">
                    <div className="col">
                        <NavLink to="/landing" className="btn signin-button-primary">Back</NavLink>
                    </div>
                </div>
                <div className="row w-100 pt-4">
                    <div className="col-md-12">
                        <h2 className="justify-content-center" style={{ textAlign: 'center' }}>Click the Skate to increase your score and become the top skater!</h2>
                    </div>  
                </div>
                <div onClick={skateClicked}  className="row w-100 p-3 align-items-center justify-content-center">
                    <div style={{border: "2px solid black", backgroundColor: "white", borderRadius: "15px", padding: "20px", width: "350px"}}>
                        <RollerSkate
                            topColor={localEquippedSkate.topColor}
                            stripeColor={localEquippedSkate.stripeColor}
                            baseColor={localEquippedSkate.baseColor}
                            wheelColor= {localEquippedSkate.wheelColor}
                            toeStopColor= {localEquippedSkate.toeStopColor}
                            width="300px"
                            height="300px"
                        /> 
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