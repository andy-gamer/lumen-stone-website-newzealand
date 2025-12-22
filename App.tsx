
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NzGuideZone from './pages/NzGuideZone'; // 合併後的頁面
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import LPP from './pages/LPP';
import Booking from './pages/Booking';
import { About, Team, SuccessStories, FAQ, Media, Contact, Legal } from './pages/InfoPages';

const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => window.location, []);
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nz-guide" element={<NzGuideZone />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
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
