import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import type { ReactNode } from 'react';


export function sanitizerHTML(html:string):ReactNode{
  if (!html || typeof html !== 'string') return '';
  const sanitizedHtml = DOMPurify.sanitize(html);
  return parse(sanitizedHtml);
}
