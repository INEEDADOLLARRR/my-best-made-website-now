import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Quote } from './components/pages/Quote';
import { MoreServices } from './components/pages/MoreServices';
import { ServiceDetail } from './components/pages/ServiceDetail';
import { EnterpriseServiceDetail } from './components/pages/EnterpriseServiceDetail';
import { BlogIndex } from './components/pages/BlogIndex';
import { BlogPost } from './components/pages/BlogPost';
import { NotFound } from './components/pages/NotFound';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { TrustTicker } from './components/sections/TrustTicker';
import { ValueGrid } from './components/sections/ValueGrid';
import { Services } from './components/sections/Services';
import { Gallery } from './components/sections/Gallery';
import { LatestArticles } from './components/sections/LatestArticles';
import { ContactLocations } from './components/sections/ContactLocations';
import { Testimonials } from './components/sections/Testimonials';
import { Footer } from './components/sections/Footer';
import { OrganizationJsonLd, WebSiteJsonLd } from './components/seo/JsonLd';
import { CanvasSlide } from './components/ui/CanvasSlide';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import { CustomCursor } from './components/ui/CustomCursor';
import { LogoPreloader } from './components/ui/LogoPreloader';
import { LayoutGroup } from 'framer-motion';

function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  // Lerp-based smooth scroll — buttery fluid feel
  useSmoothScroll(0.08);

  return (
    <Router>
      <LayoutGroup>
        <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-blue selection:text-white relative">
          {isPreloading && <LogoPreloader onComplete={() => setIsPreloading(false)} />}
          <CustomCursor />
          <Navbar isPreloading={isPreloading} />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <OrganizationJsonLd />
                  <WebSiteJsonLd />
                  <Hero />
                  <div className="relative z-20 bg-brand-black">
                    <CanvasSlide>
                      <Services />
                    </CanvasSlide>
                    <CanvasSlide>
                      <TrustTicker />
                    </CanvasSlide>
                    <CanvasSlide>
                      <ValueGrid />
                    </CanvasSlide>
                  </div>
                  <Gallery />
                  <CanvasSlide>
                    <LatestArticles />
                  </CanvasSlide>
                  <CanvasSlide>
                    <Testimonials />
                  </CanvasSlide>
                  <CanvasSlide>
                    <ContactLocations />
                  </CanvasSlide>
                </>
              } />
              <Route path="/more-services" element={<MoreServices />} />
              <Route path="/enterprise-services/:id" element={<EnterpriseServiceDetail />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />


        </div>
      </LayoutGroup>
    </Router>
  );
}

export default App;