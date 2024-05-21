import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 

export const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new EditorJS({ 
      holder: 'editorjs', 
      tools: { 
        header: Header, 
        list: List 
      },
    });

    // Assign the editor instance to ref
    editorRef.current = editor;

    // Clean up editor instance when component is unmounted
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div id="editorjs" className=''></div>
    </div>
  );
};
