import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

async function checkHasSkates() {
    const response = await fetch('/api/hasSkates', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log(data.hasSkates);
        return data.hasSkates; // Returns true or false
    } else {
        console.error('Error checking skates:', await response.json());
        return false;
    }
}

export function LandingPage({username}) {

    // Code to handle navigation
    const navigate = useNavigate();

    const handleClick = async (route) => {
        const hasSkates = await checkHasSkates();
        if (!hasSkates) {
            openErrorModal();
        } else {
            navigate(route);
        }
    };


    //we create a react state variable for the error modal
    let [errorModalOpen, setErrorModalOpen] = React.useState(false);

    const [highScores, setHighScores] = React.useState([]);
    
    React.useEffect(() => {
        //if the account data and highscores exist, we set them equal to what is stored in local storage
        //Add code to fetch the high scores from the server
        const fetchHighScores = async () => {
            const response = await fetch(`/api/getHighScores`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.status === 200) {
                const data = await response.json();
                setHighScores(data);
            }
        }
        fetchHighScores();

    }, []);

    const leaderBoard = [];
    if (highScores.length) {
        for (const [i, score] of highScores.entries()) {
          leaderBoard.push(
            <tr key={i}>
                <td>{i+1}</td>
                <td>{score.username}</td>
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
                            <button className="landing-page-button" style={{ border: 'none' }} onClick={() => handleClick('/skateView')}>VIEW SKATES</button>
                        </div>
                        <div className="row w-100 mb-3">
                            <button className="landing-page-button" style={{ border: 'none' }} onClick={() => handleClick('/skateClicker')}>SKATE CLICKER</button>
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