import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, placeholder = "Tanlang..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || (value ? {label: value, value} : options[0]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-lg outline-none transition-all flex justify-between items-center cursor-pointer shadow-sm ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-gray-300 bg-white hover:border-gray-400'}`}
      >
        <span className="text-gray-900 truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 origin-top">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                value === option.value 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {option.colorClass && (
                  <div className={`w-3.5 h-3.5 rounded-full ${option.colorClass} shadow-sm border border-black/5`}></div>
                )}
                <span className="truncate">{option.label}</span>
              </div>
              {value === option.value && <Check size={16} className="text-indigo-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
