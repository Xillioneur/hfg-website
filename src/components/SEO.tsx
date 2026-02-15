import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "HolyForge Games | Native C++ Web Gaming", 
  description = "Experience elite C++ games running natively in your browser via WebAssembly.",
  image = "https://holyforgegames.pages.dev/og-image.png",
  type = "website"
}) => {
  const location = useLocation();
  const url = `https://holyforgegames.pages.dev${location.pathname}`;

  useEffect(() => {
    document.title = title;
    
    const updateMeta = (selector: string, attr: string, value: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, value);
      } else {
        // Create if missing (helps with some crawlers)
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
    updateMeta('meta[property="og:image"]', 'content', image);
    updateMeta('meta[property="og:url"]', 'content', url);
    updateMeta('meta[property="og:type"]', 'content', type);

    // Twitter / X
    updateMeta('meta[name="twitter:title"]', 'content', title);
    updateMeta('meta[name="twitter:description"]', 'content', description);
    updateMeta('meta[name="twitter:image"]', 'content', image);
    updateMeta('meta[name="twitter:url"]', 'content', url);

  }, [title, description, image, url, type]);

  return null;
};

export default SEO;
