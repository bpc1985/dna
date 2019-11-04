import React from "react";
import "./Card.scss";

export default function Card({subscription, onDetail}) {
  return (
    <li className="subscriptionItem">
      <div>
        <h1>{subscription.dnaPackage.name}</h1>
        <h2>
          {subscription.phone_number || subscription.address}
        </h2>
      </div>
      <div>
        <span>{subscription.dnaPackage.type}</span>
        <button className="btn" onClick={() => onDetail(subscription.id)}>
          Details
        </button>
      </div>
    </li>
  );
}
