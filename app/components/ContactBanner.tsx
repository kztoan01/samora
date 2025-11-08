import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const ContactBanner = () => {
  return (
    <div className="w-full bg-green-50 py-3 px-4 md:px-8 shadow-sm mb-6 mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Số điện thoại */}
        <div className="flex items-center gap-2">
          <Phone size={20} className="text-green-600" />
          <span className="font-medium">Hotline: <a href="tel:0903 924 405" className="text-green-700 hover:underline">0903 924 405</a></span>
        </div>
        
        {/* Nút gọi Zalo */}
        <div className="flex items-center">
          <a 
            href="https://zalo.me/0903924405" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full transition duration-300"
          >
            <MessageSquare size={18} />
            <span className="font-medium">Chat Zalo</span>
          </a>
        </div>
        
        {/* Email liên hệ */}
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-green-600" />
          <span className="font-medium">Email: <a href="mailto:maiphuccl@gmail.com" className="text-green-700 hover:underline">maiphuccl@gmail.com</a></span>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;