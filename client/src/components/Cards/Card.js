import React from "react";
import "./Card.scss";

export default function Card({subscription, onDetail}) {
  const { _id, phone_number, address, dnaPackage } = subscription;
  return (
    <li className="subscriptionItem">
      <div>
        <h1>{dnaPackage.name}</h1>
        <h2>
          {dnaPackage.type === 'mobile' ? phone_number : address}
        </h2>
      </div>
      <div>
        <span>{dnaPackage.type}</span>
        <button className="btn" onClick={() => onDetail(_id)}>
          Details
        </button>
      </div>
    </li>
  );
}
