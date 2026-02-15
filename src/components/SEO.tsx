import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SEO_DEFAULTS } from '../constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = SEO_DEFAULTS.title, 
  description = SEO_DEFAULTS.description,
  image = SEO_DEFAULTS.image,
  type = "website"
}) => {
  const location = useLocation();
  const url = `${SITE_URL}${location.pathname}`;
  
  // Ensure image is absolute for crawlers
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  
  // Cache buster for production social previews
  const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  const finalImage = isProduction ? `${absoluteImage}?v=${Date.now()}` : absoluteImage;

  useEffect(() => {
    document.title = title;
    
    const updateMeta = (selector: string, attr: string, value: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, value);
      } else {
        const meta = document.createElement('meta');
        if (selector.includes('property')) {
            meta.setAttribute('property', selector.split('"')[1]);
        } else {
            meta.setAttribute('name', selector.split('"')[1]);
        }
        meta.setAttribute(attr, value);
        document.head.appendChild(meta);
      }
    };

    // Standard Meta
    updateMeta('meta[name="title"]', 'content', title);
    updateMeta('meta[name="description"]', 'content', description);

    // OpenGraph
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:image"]', 'content', finalImage);
    updateMeta('meta[property="og:url"]', 'content', url);
    updateMeta('meta[property="og:type"]', 'content', type);

    // Twitter / X
    updateMeta('meta[name="twitter:title"]', 'content', title);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[name="twitter:image"]', 'content', finalImage);
    updateMeta('meta[name="twitter:url"]', 'content', url);

  }, [title, description, finalImage, url, type]);

  return null;
};

export default SEO;
