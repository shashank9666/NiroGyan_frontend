import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          NiroGyan
        </Link>

        {/* Hamburger Button */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Menu Items */}
        <div className={`flex-col sm:flex-row sm:flex space-y-2 sm:space-y-0 sm:space-x-6 
                         ${menuOpen ? 'flex' : 'hidden'} sm:items-center sm:static absolute top-16 left-0 w-full sm:w-auto bg-white z-10 p-4 sm:p-0`}>
          <NavLink to="/" text="Home" />
          <NavLink to="/doctors" text="Doctors" />
          <NavLink to="/appointments" text="Appointments" />
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="block text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50"
  >
    {text}
  </Link>
);

export default Navbar;
