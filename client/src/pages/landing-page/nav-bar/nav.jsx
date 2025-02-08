import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from '../../../../../client/public/AIGIRI.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false); // Close menu when route changes
  }, [location.pathname]);

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur-md shadow-lg bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      <img className="h-10 w-auto" src={logo} alt="logo" />
        {/* <Link to="/" className="text-2xl font-bold text-[#7670AC]">AIGIRI</Link> */}
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" isActive={isActiveLink("/")}>Home</NavLink>
          <NavLink to="/coursess" isActive={isActiveLink("/coursess")}>
            Courses
          </NavLink>
          {/* <NavLink to="/pricing" isActive={isActiveLink("/pricing")}>
            Pricing
          </NavLink> */}
          <NavLink to="/aboutus" isActive={isActiveLink("/aboutus")}>
            About Us
          </NavLink>
          <NavLink to="/faq" isActive={isActiveLink("/faq")}>
            FAQ
          </NavLink>
          <NavLink to="/contactus" isActive={isActiveLink("/contactus")}>
            Contact Us
          </NavLink>
          
        </div>

        {/* Desktop Get Started Button */}
        <Link
          to="/login"
          className="hidden md:block bg-gradient-to-r from-[#7670AC] to-[#5491CA] text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Get Started
        </Link>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} color="#7670AC" /> : <Menu size={32} color="#7670AC" />}
        </button>
      </div>

      {/* Mobile Navigation - Side Drawer */}
      <motion.div 
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isMenuOpen ? "0%" : "-100%", opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden fixed top-16 left-0 w-full bg-white p-4 flex flex-col space-y-4 shadow-lg backdrop-blur-sm"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <NavLink to="/" isActive={isActiveLink("/")} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        <NavLink to="/coursess" isActive={isActiveLink("/coursess")} onClick={() => setIsMenuOpen(false)}>Courses</NavLink>
        <NavLink to="/pricing" isActive={isActiveLink("/pricing")} onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>
        <NavLink to="/faq" isActive={isActiveLink("/faq")} onClick={() => setIsMenuOpen(false)}>FAQ</NavLink>
        <NavLink to="/contactus" isActive={isActiveLink("/contactus")} onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
        <NavLink to="/aboutus" isActive={isActiveLink("/aboutus")} onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
        <Link to="/login" className="text-center bg-[#5491CA] text-white px-4 py-2 rounded-lg">Next</Link>
      </motion.div>
    </nav>
  );
}

const isActiveLink = (path) => {
  const location = useLocation();
  return location.pathname === path;
};

const NavLink = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    className={`relative px-4 py-2 text-gray-700 hover:text-[#5491CA] transition-all before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-[#5491CA] hover:before:w-full before:transition-all cursor-pointer ${isActive ? "font-bold text-[#7670AC]" : ""}`}
    onClick={onClick}
  >
    {children}
  </Link>
);