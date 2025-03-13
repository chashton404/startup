import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyForm() {
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
      navigate("/landing"); // Navigates to the landing page
    };
}

export function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }


    return (
        <main className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 200px)'}}>
            <form action="/landing" className="text-center" style={{ width: '33%' }}>
                <h2 style={{ textAlign: 'center' }}>Please sign in to begin racing</h2>
                <div>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        style={{
                            marginBottom: '-1px',
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '18px'
                        }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        style={{
                            marginBottom: '10px',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '18px'
                        }}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn signin-button-primary" style={{ width: '100%' }}>
                            Login
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn signin-button-secondary" style={{ width: '100%' }}>
                            Create Account
                        </button>
                    </div>
                </div>
                <div>{username}</div>
                <div>{password}</div>
            </form>
        </main>
    );
}