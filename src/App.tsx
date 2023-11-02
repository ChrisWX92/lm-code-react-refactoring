import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useReview } from "./hooks/useReview";
import "./App.css";
import { Header } from "./components/header";
import { HeroSection } from "./components/heroSection";
import { tripsSection } from "./components/tripsSection";

function App() {
  const [trips, setTrips] = useState(0);
  const [nav , setNav] = useState<string[]>([]);
  const [, setBoughtIt] = useState(false);
  const { data, isLoading } = useFetch();
  const { heroics, waitAMo } = useReview();

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
      {heroics && Reviews(heroics)}
      {isLoading && <h2>Loading...</h2>}
      {data && trips && tripsSection(trips, data, setBoughtIt)}
    </>
  );
}

export default App;
