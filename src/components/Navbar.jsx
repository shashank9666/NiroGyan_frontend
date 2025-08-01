import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          NiroGyan
        </Link>
        <div className="flex space-x-6">
          <NavLink to="/" text="Home" />
          <NavLink to="/doctors" text="Doctors" />
          <NavLink to="/appointments" text="Appointments" />
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component for consistent styling
const NavLink = ({ to, text }) => (
  <Link 
    to={to} 
    className="text-gray-700 hover:text-blue-600 transition-colors
               px-3 py-2 rounded-md text-sm font-medium
               hover:bg-blue-50"
  >
    {text}
  </Link>
);

export default Navbar;