import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ContributingRule = () => {
  const [markdown, setMarkdown] = useState('Loading...');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/cetmca26/MCA-Laboratory/main/CONTRIBUTING.md')
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch((error) => setMarkdown('Failed to load Markdown'));
  }, []);

  return (
  
   <>
  
<div className=" p-1 ps-4 card" style={{marginTop:'100px', lineSpacing:'1px'}}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  
    </>
    
  );
};

export default ContributingRule;
