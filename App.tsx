
import React from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import LPP from './pages/LPP';
import Booking from './pages/Booking';
import NzAuZone from './pages/NzAuZone';
import { About, Team, SuccessStories, FAQ, Media, Contact, Legal } from './pages/InfoPages';

// ScrollToTop component to handle scroll restoration on route change
const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Manual scroll handling for HashRouter if needed, or rely on ScrollRestoration in newer routers, but manual effect is safer for generic React usage */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/nz-au" element={<NzAuZone />} />
          <Route path="/lpp" element={<LPP />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/success" element={<SuccessStories />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
