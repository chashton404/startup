import React from 'react';
import { NavLink } from "react-router-dom";
import { RollerSkate } from '../../lib/originalRollerskate';

export function SkateClicker() {

    const [equippedSkate, setEquippedSkate] = React.useState();
    const [userScore, setUserScore] = React.useState(0);
    const [isClicked, setIsClicked] = React.useState(false);

    React.useEffect(() => {
        async function fetchEquippedSkateAndScore() {
            const skateResponse = await fetch(`api/getEquippedSkate`, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
            const data = await skateResponse.json();
            setEquippedSkate(data);

            const scoreResponse = await fetch(`api/getUserScore`, {
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (scoreResponse.status === 200) {
                const scoreData = await scoreResponse.json();
                setUserScore(scoreData.userScore);
            }
        }

        fetchEquippedSkateAndScore();
    }, []);


    
    async function skateClicked() {

        setIsClicked(true);
        setTimeout(() =>(setIsClicked(false)), 150);
        // Call the skate clicked API
        const response = await fetch(`api/skateClicked`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setUserScore(data.userScore);
        } else {
            console.error('Error updating score:', await response.json());
        }
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
                <div onClick={skateClicked}  className={`row w-100 p-3 align-items-center justify-content-center no-select ${isClicked ? 'skate-bounce' : ''}`}>
                    <div style={{border: "2px solid black", backgroundColor: "white", borderRadius: "15px", padding: "20px", width: "350px"}}>
                    {equippedSkate ? (
                        <RollerSkate
                            topColor={equippedSkate.topColor}
                            stripeColor={equippedSkate.stripeColor}
                            baseColor={equippedSkate.baseColor}
                            wheelColor={equippedSkate.wheelColor}
                            toeStopColor={equippedSkate.toeStopColor}
                            width="300px"
                            height="300px"
                        />
                    ) : (
                        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    </div>
                </div>
                <div className="row w-100 mb-3">
                    <h1 className={"no-select"}>Clicks:</h1>
                    <h1 style={{fontFamily: 'Syne'}}>{userScore ? (userScore) : "Loading"}</h1>
                </div>
            </div>
        </main>
    );
}