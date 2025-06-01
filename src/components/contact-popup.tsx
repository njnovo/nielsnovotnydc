"use client";

import Card from './card';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-80 max-w-sm">
          <Card className="bg-white border-gray-300 shadow-2xl">
            <Card.Header>
              <div className="h-16 w-full transition-transform duration-300" style={{backgroundColor: 'var(--color-tertiary)'}} />
            </Card.Header>
            <Card.Content className="flex-col items-start text-left space-y-4 p-6">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-2xl font-medium" style={{color: 'var(--color-tertiary)'}}>Get In Touch</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3 w-full">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1 text-sm">Email</h4>
                  <a 
                    href="mailto:niels.novotny@gmail.com" 
                    className="text-gray-700 hover:underline text-sm"
                  >
                    niels.novotny@gmail.com
                  </a>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1 text-sm">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com/in/nielsnovotny" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:underline text-sm"
                  >
                    linkedin.com/in/nielsnovotny
                  </a>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-1 text-sm">GitHub</h4>
                  <a 
                    href="https://github.com/njnovo" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:underline text-sm"
                  >
                    github.com/njnovo
                  </a>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}
    </>
  );
} 