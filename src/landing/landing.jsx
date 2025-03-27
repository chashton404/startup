import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export function LandingPage({username, accountData, setAccountData}) {

    React.useEffect(() => {
        const scoresText = localStorage.getItem('accountData');
        if (scoresText) {
          setAccountData(JSON.parse(scoresText));
        }[]
      }, []);

    const leaderBoard = [];
    if (accountData.length) {
        for (const [i, score] of accountData.entries()) {
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
return (
    <main style={{ height: 'calc(100vh - 200px)', position: 'relative'}}>
        <NavLink to="/login" className="position-absolute top-0 end-0 mt-3 me-3"
        style={{ fontFamily: 'Syne', zIndex: 1 }}>Logout</NavLink>
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
                            <NavLink to="/skateView" className="landing-page-button">VIEW SKATES</NavLink>
                        </div>
                        <div className="row w-100 mb-3">
                            <NavLink to="/skateClicker" className="landing-page-button">SKATE CLICKER</NavLink>
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