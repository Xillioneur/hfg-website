import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';

const Games = lazy(() => import('./pages/Games'));
const GameDetail = lazy(() => import('./pages/GameDetail'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="w-8 h-8 border-2 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin opacity-20"></div>
  </div>
);

function App() {
  // Background Prefetching: Preload major routes after initial paint
  useEffect(() => {
    const prefetch = () => {
      import('./pages/Games');
      import('./pages/About');
    };
    
    if (window.requestIdleCallback) {
      window.requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 2000);
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<GameDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
