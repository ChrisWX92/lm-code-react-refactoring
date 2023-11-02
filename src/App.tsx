import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useHero } from "./hooks/useHero";
import "./App.css";
import { Header } from "./components/header";
import { heroSection } from "./components/heroSection";
import { tripsSection } from "./components/tripsSection";

function App() {
  const [trips, setTrips] = useState(0);
  const [nav , setNav] = useState<string[]>([]);
  const [, setBoughtIt] = useState(false);
  const { data, isLoading } = useFetch();
  const { heroics, waitAMo } = useHero();

  useEffect(() => {
    setNav(() => {
      return ["trending", "your orders", "community"];
    });
    if (heroics) if (data) setTrips(data.length);
  }, [data, heroics]);

  return (
    <>
      <Header nav={nav} />
      {waitAMo && <p>...getting heroics...</p>}
      {heroics && heroSection(heroics)}
      {isLoading && <h2>Loading...</h2>}
      {data && trips && tripsSection(trips, data, setBoughtIt)}
    </>
  );
}

export default App;
