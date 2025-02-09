import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Loader from "./components/loader/Loader";
import Header from "./components/navbar/Navbar";
import Page from "./components/main/Page";
import Footer from "./components/footer/Footer";
import AboutUsCard from "./components/main/AboutUsCard";
import CommunityProjects from "./components/main/CommunityProjects";
import ContributingRule from "./components/main/ContributingRule";
import SemesterPrograms from "./components/main/SemesterPrograms";
import Team from "./components/main/Team";
import Notes from "./components/main/Notes";
import "./App.css";

function App() {
  // Routing 
  const [activeComponent, setActiveComponent] = useState('home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'about':
        return <AboutUsCard />;
      case 'projects':
        return <CommunityProjects/>;
      case 'rules':
        return <ContributingRule/>;
      case 'lab':
        return <SemesterPrograms/>;
      case 'team':
        return <Team/>;
      case 'notes':
        return <Notes/>
      case 'home':
      default:
        return <Page />;
    }
  };

  // loaderstate
  const [isLoading, setIsLoading] = useState(true);
  // Fake data Fetch
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fakeDataFetch();
  }, []);

  return isLoading ? (
    <Loader />
  )  : (
    <>
    
    <div className="hero-anime">
    <Header onNavigate={setActiveComponent} />
    {renderComponent()}

    <Footer />
    </div>
   
    </>
  );
}

export default App;
