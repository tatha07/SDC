import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Workshops from './pages/Workshops.jsx';
import Departments from './pages/Departments.jsx';

function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/departments" element={<Departments />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
