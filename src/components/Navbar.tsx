
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Testimonials', path: '/#testimonials' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out ${
        isScrolled ? 'glass-dark shadow-md py-3' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary font-bold text-xl"
        >
          <Code className="h-6 w-6" />
          <span className="animate-blur-in">CodeNinja</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="block lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className="rounded-full px-6">
              Log in
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="rounded-full px-6">Get Started</Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass-dark shadow-lg p-4 lg:hidden animate-fade-in">
          <nav className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium px-4 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border my-2" />
            <div className="flex flex-col gap-3 px-4 pt-2">
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  Log in
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
