import React, { useState, useEffect } from 'react';

export const MyAccountSectionForm = ({ label, clearForm }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (clearForm) {
      setInputValue('');
    }
  }, [clearForm]);

  return (
    <div className="flex flex-col gap-1">
      <label className='text-md'>{label.title}</label>
      <input
        className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
        type={label.type}
        placeholder={label.placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      
    </div>
  );
};
