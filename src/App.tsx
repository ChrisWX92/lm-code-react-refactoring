import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useHero } from "./hooks/useHero";
import { v4 as uuid } from "uuid";
import "./App.css";
import { header } from "./components/header";
import { heroSection } from "./components/heroSection";
import { tripsSection } from "./components/tripsSection";

function App() {
  const [trips, setTrips] = useState(0);
  const [nav, setNav] = useState<string[]>([]);
  const [boughtIt, setBoughtIt] = useState(false);
  const { data, isLoading, error } = useFetch();
  const { heroics, waitAMo, fail } = useHero();

  useEffect(() => {
    setNav(() => {
      return ["trending", "your orders", "community"];
    });
    if (heroics) if (data) setTrips(data.length);
  }, [data, heroics]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBoughtIt(true);
    if (e.currentTarget.value) {
      const stuff = e.currentTarget.value.split("/");
      const experience = stuff[0];
      const cost = parseInt(stuff[1]);
      alert(
        `Okie dokie, so you've bought the '${experience}' excursion, at a cost of ${
          cost &&
          cost.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
        }\rNice one 🚀`
      );
    }
  };

  const renderReviewScore = (score: number) => {
    const icons = [];
    for (let i = 0; i < score; i++) {
      icons.push(
        <span key={uuid()}>🪐</span>
      );
    }
    return icons;
  };

  return (
    <>
      {header}
      {waitAMo && <p>...getting heroics...</p>}
      {heroics && heroSection}
      {isLoading && <h2>Loading...</h2>}
      {data && tripsSection}
    </>
  );
}

export default App;
