import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Workshops from './pages/Workshops.jsx';
import Departments from './pages/Departments.jsx';
import Join from './pages/Join.jsx';
import TerminalPage from './pages/TerminalPage.jsx';

// Once someone has passed through the terminal, don't gate them again this visit.
function alreadyEntered() {
  try {
    return sessionStorage.getItem('sdc-entered') === '1';
  } catch {
    return false;
  }
}

function App() {
  const { pathname } = useLocation();
  const [entered, setEntered] = useState(alreadyEntered);

  // Router keeps the old scroll position across pages; start each one at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const enter = () => {
    try {
      sessionStorage.setItem('sdc-entered', '1');
    } catch {
      /* ignore private-mode storage errors */
    }
    setEntered(true);
  };

  // First-time visitors land in the terminal; `sudo sdc` hands off to the site.
  if (!entered && pathname === '/') {
    return <TerminalPage onEnter={enter} />;
  }

  return (
    <div className="site">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
