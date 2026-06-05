import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  isEditable: boolean;
  tagName?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'a';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  isEditable,
  tagName = 'span',
}) => {
  const Tag = tagName as any;
  const elementRef = useRef<HTMLElement>(null);

  // Sync value if changed from sidebar/props
  useEffect(() => {
    if (elementRef.current && elementRef.current.textContent !== value) {
      elementRef.current.textContent = value;
    }
  }, [value]);

  if (!isEditable) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleBlur = () => {
    if (elementRef.current) {
      const text = elementRef.current.textContent || '';
      if (text !== value) {
        onChange(text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Blur on enter (except in paragraph tags where line breaks are standard)
    if (e.key === 'Enter' && tagName !== 'p') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  return (
    <Tag
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={(e: React.MouseEvent) => {
        // Prevent selecting the parent section card in the sidebar while editing text!
        e.stopPropagation();
      }}
      className={`${className} outline-none focus:ring-2 focus:ring-indigo-500/60 focus:bg-indigo-950/20 px-1 rounded transition-all cursor-text min-w-[20px] inline-block`}
      title="Click to edit text inline"
    >
      {value}
    </Tag>
  );
};
