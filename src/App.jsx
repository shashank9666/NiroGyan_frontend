import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfile from './pages/DoctorProfile';
import DoctorsList from './pages/DoctorsList'; // New component needed
import AppointmentsList from './pages/AppointmentsList'; // New component needed
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import axios from 'axios';

// Set base URL for API requests
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsList />} /> {/* New route */}
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/appointments" element={<AppointmentsList />} /> {/* New route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;