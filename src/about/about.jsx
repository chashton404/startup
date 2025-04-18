import React from 'react';
import { NavLink } from "react-router-dom";





export function AboutPage() {
    const [joke, setJoke] = React.useState(''); 

    const fetchJoke = () => {
        const url = "https://api.chucknorris.io/jokes/random?category=dev";
    
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setJoke(`${data.value}`);
            setError("");
          })
          .catch((err) => {
            setError(`Error: ${err.message}`);
            setJoke("");
          });
      };

    return(
        <main style={{height: 'calc(100vh - 200px)'}}>
            <div className="container">
                <div className="row w-100 pt-4">
                    <div className="col">
                        <NavLink to="/landing" className="btn signin-button-primary"> Back </NavLink>
                    </div>
                </div>
                <h1>About</h1>
                <p style={{textAlign: 'center'}}>
                    This is a simple application that allows users to design their own skates. Users can choose from a variety of colors and designs to create a custom skate.
                </p>
                <p style={{textAlign: 'center'}}>
                    In all reality this page is just a page that I will use to test different things as I continue to develop the website more, so enjoy the random stuff here!
                </p>
                <h3>
                    Additional API goes here...
                </h3>
                <div className="row justify-content-center align-items-center">
                    <button className="btn btn-primary mb-3" onClick={fetchJoke}>
                        Get a joke
                    </button>
                </div>
                <p style={{textAlign: 'center'}}>
                    {joke}
                </p>
            </div>
        </main>
    );
}