import { useState } from 'react';

/**
 * 代码块元素渲染组件
 */
const CodeBlockElement = ({ attributes, children, element }: any) => {
  const [copied, setCopied] = useState(false);
  const language = element.language || 'plaintext';
  
  const handleCopy = () => {
    const code = element.children.map((c: any) => c.text).join('\n');
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div {...attributes}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', color: '#999', paddingLeft: '10px' }}>
          {language}
        </div>
        <button 
          onClick={handleCopy}
          style={{ 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            padding: '4px 8px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          {copied ? '已复制!' : '复制'}
        </button>
      </div>
      <pre {...attributes}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlockElement;