
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    Product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '#' },
      { name: 'Testimonials', path: '/#testimonials' },
      { name: 'FAQ', path: '#' }
    ],
    Company: [
      { name: 'About Us', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Contact', path: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' }
    ]
  };

  return (
    <footer className="border-t border-border mt-12">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary font-bold text-xl"
            >
              <Code className="h-6 w-6" />
              <span>CodeNinja</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Empowering developers to write better code through AI-powered insights, personalized learning, and community challenges.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} CodeNinja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
