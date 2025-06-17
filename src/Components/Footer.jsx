import React from 'react';
import { Mail, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">News API</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Get started</a></li>
            <li><a href="#" className="hover:text-white">Documentation</a></li>
            <li><a href="#" className="hover:text-white">News sources</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Google News API</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Privacy policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of service</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href="#" className="hover:text-white">Contact</a></li>
            <li className="flex items-center gap-2"><Twitter className="w-4 h-4" /><a href="#" className="hover:text-white">Twitter</a></li>
            <li className="flex items-center gap-2"><Github className="w-4 h-4" /><a href="#" className="hover:text-white">Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
