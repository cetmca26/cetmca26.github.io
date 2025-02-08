import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Loader from "./components/loader/Loader";
import Header from "./components/navbar/Navbar";
import Page from "./components/main/Page";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
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
    <Header />
    <Page />

    <Footer />
    </div>
   
    </>
  );
}

export default App;
