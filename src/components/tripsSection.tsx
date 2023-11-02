import React from "react";
import { Trip } from "../hooks/useFetch";

interface TripsSectionProps {
  count: number;
  trips: Trip[];
  setBought: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TripsSection: React.FC<TripsSectionProps> = ({ count, trips, setBought }) => (
<div className="trips">
<h3>We found {count} trips for you!</h3>{" "}
<ul className="trip-list">
  {trips.map(
    ({
      id,
      tripName,
      description,
      imageUrl,
      cost,
      lengthInDays,
      isBookable,
    }) => {
      return (
        <li key={id} className="trip-card">
          <h3 className="trip-name grid-col-span-2">{tripName}</h3>
          <p className="trip-description grid-col-span-2">
            {description}
          </p>
          <img
            className="trip-thumbnail"
            src={imageUrl}
            alt={`representation of ${tripName}`}
          />
          <p className="trip-duration">
            Duration: {lengthInDays} day
            {lengthInDays > 1 && "s"}
          </p>
          <p className="trip-price">
            Price:{" "}
            {cost.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
          </p>
          <button
            className="grid-col-span-2 trip-book-button"
            disabled={!isBookable}
            onClick={(e) => handleClick(e, setBought)}
            value={`${tripName}/${cost}`}
          >
            {isBookable ? "book now" : "fully booked"}
          </button>
        </li>
      );
    }
  )}
</ul>
</div>);

const handleClick = (e: React.MouseEvent<HTMLButtonElement>, setBought : React.Dispatch<React.SetStateAction<boolean>>) => {
  setBought(true);
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