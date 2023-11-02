import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useReview } from "./hooks/useReview";
import "./App.css";
import { Header } from "./components/header";
import { TripsSection } from "./components/tripsSection";
import { ReviewsSection } from "./components/reviewsSection";

function App() {
  const [tripCount, setTripCount] = useState(0);
  const [nav , setNav] = useState<string[]>([]);
  const [, setBought] = useState(false);
  const { trips, loading } = useFetch();
  const { reviews, wait } = useReview();

  useEffect(() => {
    setNav(() => {
      return ["trending", "your orders", "community"];
    });
    if (reviews) if (trips) setTripCount(trips.length);
  }, [trips, reviews]);

  return (
    <>
      <Header nav={nav} />
      {wait && <p>...getting heroics...</p>}
      {reviews && <ReviewsSection {...reviews}/>}
      {loading && <h2>Loading...</h2>}
      {trips && tripCount && <TripsSection count={tripCount} trips={trips} setBought={setBought} />}
    </>
  );
}

export default App;
