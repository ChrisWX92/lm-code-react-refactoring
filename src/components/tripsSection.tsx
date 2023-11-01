import React from 'react';

export const tripsSection = () => (
<div className="trips">
<h3>We found {tripsSection} trips for you!</h3>{" "}
<ul className="trip-list">
  {data.map(
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
            onClick={handleClick}
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