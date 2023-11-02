import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useReview } from "./hooks/useReview";
import "./App.css";
import { Header } from "./components/header";
import { TripsSection } from "./components/tripsSection";
import { ReviewsSection } from "./components/reviewsSection";

function App() {
  const [trips, setTrips] = useState(0);
  const [nav , setNav] = useState<string[]>([]);
  const [, setBought] = useState(false);
  const { data, loading } = useFetch();
  const { reviews, wait } = useReview();

  useEffect(() => {
    setNav(() => {
      return ["trending", "your orders", "community"];
    });
    if (reviews) if (data) setTrips(data.length);
  }, [data, reviews]);

  return (
    <>
      <Header nav={nav} />
      {wait && <p>...getting heroics...</p>}
      {reviews && ReviewsSection(reviews)}
      {loading && <h2>Loading...</h2>}
      {data && trips && TripsSection(trips, data, setBought)}
    </>
  );
}

export default App;
