import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to the Farmers' Storage Portal</h1>
        <p style={styles.description}>
          Easily find storage facilities near you. Register or log in to get started!
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.loginButton }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            style={{ ...styles.button, ...styles.registerButton }}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #d9f9ff, #a8e1ff)',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '90%',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#0078d7',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#333333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    textTransform: 'uppercase',
  },
  loginButton: {
    backgroundColor: '#0078d7',
    color: '#ffffff',
    boxShadow: '0 4px 10px rgba(0, 120, 215, 0.3)',
  },
  registerButton: {
    backgroundColor: '#28a745',
    color: '#ffffff',
    boxShadow: '0 4px 10px rgba(40, 167, 69, 0.3)',
  },
};

styles.loginButton[":hover"] = {
  backgroundColor: "#005bb5",
};

styles.registerButton[":hover"] = {
  backgroundColor: "#218838",
};

export default Home;
