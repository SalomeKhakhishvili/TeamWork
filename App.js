import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IngredientsPage from './pages/IngredientsPage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav style={styles.nav}>
          <Link to="/ingredients" style={styles.link}>Manage Ingredients</Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/ingredients" element={<IngredientsPage />} />
          {/* Default route (for root path "/") */}
          <Route path="/" element={<h1 style={styles.home}>Welcome to the App!</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    marginBottom: '20px',
  },
  link: {
    marginRight: '10px',
    textDecoration: 'none',
    color: 'blue',
  },
  home: {
    textAlign: 'center',
    fontSize: '24px',
  }
};

export default App;
