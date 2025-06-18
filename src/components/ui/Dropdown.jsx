import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Dropdown({ buttonContent, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button type="button" className="flex items-center focus:outline-none" onClick={() => setIsOpen(!isOpen)} >
        {buttonContent}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              {items.map((item) => (
                <button key={item.value} className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${item.className || ''}`}
                  onClick={() => { onSelect(item.value)
                    setIsOpen(false)
                  }}
                >
                  {item.icon && item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fermer le dropdown quand on clique ailleurs */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Dropdown;