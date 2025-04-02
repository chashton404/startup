import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

//We make an error modal for the user so that they can't access skateView and skateClicker if they don't have any skates
function ErrorModal({ isOpen, onCancel}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>You don't have any skates</h3>
                <p style={{ textAlign: 'center' }}>Please design a skate first</p>
                <div className="button-container">
                    <button className="btn cancel-button" onClick={onCancel}>Ok</button>
                </div>
            </div>
        </div>
    );

}

export function LandingPage({username, accountData, setAccountData, highScores, setHighScores}) {
    //we get the account data from local storage
    let localAccountData = [];
    const accountDataText = localStorage.getItem('accountData');

    if (accountDataText) {
        localAccountData = JSON.parse(accountDataText);
    }

    //we check if the user already exists, returns -1 if they don't
    let existingUserIndex = localAccountData.findIndex((accountData) => accountData.name === username);

    //we create a react state variable for the error modal
    let [errorModalOpen, setErrorModalOpen] = React.useState(false);
    
    React.useEffect(() => {
        //if the account data and highscores exist, we set them equal to what is stored in local storage
        if (accountDataText) {
          setAccountData(JSON.parse(accountDataText));
        }
        if (localStorage.getItem('highScores')) {
          setHighScores(JSON.parse(localStorage.getItem('highScores')));
        }
        //if the account data doesn't exist, we create an empty array and set the account data to that
        else {
            const initialData = [];
            localStorage.setItem('accountData', JSON.stringify(initialData));
            localStorage.setItem('highScores', JSON.stringify(initialData));
            setAccountData(initialData);
            setHighScores(initialData);
        }
    }, []);

    React.useEffect(() => {
        //If the user doesn't exist then create a new "user" and intitalize their name as username, their clicks as 0, and their skates as 0

        if (existingUserIndex === -1) {
            const newUser = {name: username, clicks: 0, skates: [
                { skateName: 'orange', topColor:'#F1592A' , stripeColor:'#F1592A' , baseColor:'#F1592A' , wheelColor:'#F1592A' , toeStopColor:'#F1592A' , skateStatus: 'equipped'},
                { skateName: 'blue', topColor:'#0F75BC' , stripeColor:'#0F75BC' , baseColor:'#0F75BC' , wheelColor:'#0F75BC' , toeStopColor:'#0F75BC' , skateStatus: 'not equipped'}
                ]};
            localAccountData.push(newUser);
            setAccountData([...localAccountData]);
            localStorage.setItem('accountData', JSON.stringify(localAccountData));
        }
    }, [username]);

    const leaderBoard = [];
    if (highScores.length) {
        for (const [i, score] of highScores.entries()) {
          leaderBoard.push(
            <tr key={i}>
                <td>{i+1}</td>
                <td>{score.name}</td>
                <td>{score.clicks}</td>
            </tr>
          );
        }
      } else {
        leaderBoard.push(
          <tr key='0'>
            <td colSpan='4'>Be the first to score!</td>
          </tr>
        );
    }

    function logoutUser() {
        localStorage.removeItem('username');
    }

    function openErrorModal() {
        setErrorModalOpen(true);
    }

    function closeModal() {
        setErrorModalOpen(false);
    }

return (
    <main style={{ height: 'calc(100vh - 200px)', position: 'relative'}}>
        <ErrorModal isOpen={errorModalOpen} onCancel={closeModal} />
        <NavLink to="/login" className="position-absolute top-0 end-0 mt-3 me-3"
        style={{ fontFamily: 'Syne', zIndex: 1 }} onClick={logoutUser}>Logout</NavLink>
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <div className="row w-100 pb-3">
                            <h2>Welcome, {username}!</h2>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateDesign" className="landing-page-button">DESIGN SKATE</NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateView" className="landing-page-button" onClick={(e) => {
                                if (accountData[existingUserIndex]?.skates === 0) {
                                    e.preventDefault();
                                    openErrorModal();
                                }
                            }}>VIEW SKATES</NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateClicker" className="landing-page-button"onClick={(e) => {
                                if (accountData[existingUserIndex]?.skates === 0) {
                                    e.preventDefault();
                                    openErrorModal();
                                }
                            }}>SKATE CLICKER</NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/about" className="landing-page-button">ABOUT</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row w-100 mb-3">
                            <h2 className="text-center">TOP SKATERS</h2>
                        </div>
                        <div className="row w-100">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Skater</th>
                                        <th>Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderBoard}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
}