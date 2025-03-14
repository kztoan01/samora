import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const ContactBanner = () => {
  return (
    <div className="w-full bg-blue-50 py-3 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Số điện thoại */}
        <div className="flex items-center gap-2">
          <Phone size={20} className="text-blue-600" />
          <span className="font-medium">Hotline: <a href="tel:0905 422 412" className="text-blue-700 hover:underline">0905 422 412</a></span>
        </div>
        
        {/* Nút gọi Zalo */}
        <div className="flex items-center">
          <a 
            href="https://zalo.me/0905422412" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full transition duration-300"
          >
            <MessageSquare size={18} />
            <span className="font-medium">Chat Zalo</span>
          </a>
        </div>
        
        {/* Email liên hệ */}
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-blue-600" />
          <span className="font-medium">Email: <a href="mailto:contact@example.com" className="text-blue-700 hover:underline">contact@example.com</a></span>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;