import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import AllProjects from './pages/AllProjects';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;