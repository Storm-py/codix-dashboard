'use client';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Blog() {
  const [value, setValue] = useState('');

  useEffect(() => {
    
    const quillEditor = document.querySelector('.ql-editor');
    if (quillEditor) {
      quillEditor.classList.add(
        'min-h-[400px]', 
        'opacity-80',
        'p-4',          
        'text-lg',      
        'leading-relaxed', 
        'bg-white',     
        'rounded-lg',   
        'text-gray-800'
      );
    }
  }, []);

  return (
    <div className="p-5 m-5 border border-gray-300 rounded-lg bg-gray-300">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="rounded-lg" 
      />
    </div>
  );
}

export default Blog;
