import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import { FaGithub } from 'react-icons/fa';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login } from './login/login';
import { LandingPage } from './landing/landing';
import { SkateView } from './view/skateView';
import { SkateDesign } from './design/skateDesign';
import { AboutPage } from './about/about';
import { SkateClicker } from './clicker/skateClicker';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || null);


  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <div className="container">
            <header className="d-flex flex-wrap justify-content-center pt-3">
                <h1>ROLLERSKATE RACING</h1>
            </header>
          </div>
          <div className="divider"></div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Login setUserName={setUserName} />} />
            <Route path="/login" element={<Login setUserName={setUserName} />} />
            <Route path="/landing" element={<LandingPage userName={userName} />} />
            <Route path="/skateView" element={<SkateView />} />
            <Route path="/skateDesign" element={<SkateDesign />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skateClicker" element={<SkateClicker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </main>

        <footer>
          <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center my-4">
              <svg style={{display: "none"}}>
                <symbol id="github" viewBox="0 0 24 24">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </symbol>
              </svg>
              <div className="col-md-4 d-flex align-items-center">
                <p>Made by Chase Ashton</p>
              </div>
                  
              <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3">
                  <a className="text-muted" href="https://github.com/chashton404/startup" target="_blank">
                    <FaGithub size={50} />
                  </a>
                </li>
              </ul>
            </footer>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}