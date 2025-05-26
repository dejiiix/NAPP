import React from 'react';
import { BookOpenCheck, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BookOpenCheck className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">PublishNaija</span>
            </div>
            <p className="mt-4 text-gray-400">
              Empowering Nigerian authors to share their stories with the world.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-green-500 transition-colors duration-200">Home</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-green-500 transition-colors duration-200">Dashboard</a></li>
              <li><a href="/upload" className="text-gray-400 hover:text-green-500 transition-colors duration-200">Upload</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-green-500 transition-colors duration-200">About Us</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-400 hover:text-green-500 transition-colors duration-200">Help Center</a></li>
              <li><a href="/formatting" className="text-gray-400 hover:text-green-500 transition-colors duration-200">Formatting Guide</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-green-500 transition-colors duration-200">FAQ</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-green-500 transition-colors duration-200">Blog</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-500 mr-2" />
                <a href="mailto:info@publishnaija.com" className="text-gray-400 hover:text-green-500 transition-colors duration-200">info@publishnaija.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-500 mr-2" />
                <a href="tel:+2341234567890" className="text-gray-400 hover:text-green-500 transition-colors duration-200">+234 123 456 7890</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-500 mr-2 mt-1" />
                <span className="text-gray-400">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PublishNaija. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;