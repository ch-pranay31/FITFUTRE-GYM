import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./sections/Features";
import Programs from './components/Programs';
import Team from './components/Team';
import Footer from "./sections/Footer";
import ScrollIndicator from "./components/ScrollIndicator";

import "./styles/globals.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/intro.css";
import "./styles/features.css";

function App() {
  return (
    <>
      <Navbar />
      
      {/* Global Scroll Indicator sits completely outside the main document flow */}
      <ScrollIndicator />

      <main>
        <Hero />
        <Features />
        <Programs />
        <Team /> 
      </main>
      
      {/* Footer sits OUTSIDE main so it stays fixed behind it */}
      <Footer /> 
    </>
  );
}

export default App;