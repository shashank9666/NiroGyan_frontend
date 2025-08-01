import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const DoctorProfile = lazy(() => import('./pages/DoctorProfile'));
const DoctorsList = lazy(() => import('./pages/DoctorsList'));
const AppointmentsList = lazy(() => import('./pages/AppointmentsList'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Set base URL for API requests - using Vite's environment variables
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="text-center text-lg font-semibold text-gray-500">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/doctors/:id" element={<DoctorProfile />} />
              <Route path="/appointments" element={<AppointmentsList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
