import { useState, useEffect } from "react";
import reactLogo from "./assets/logonobg.png";
import Loader from "./components/loader/Loader";
import "./App.css";

function App() {
  // loaderstate
  const [isLoading, setIsLoading] = useState(true);
  // Fake data Fetch
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fakeDataFetch();
  }, []);

  return isLoading ? (
    <Loader />
  )  : (
    <h1>Welcome</h1>
  );
}

export default App;
