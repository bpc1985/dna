import React from "react";
import Card from './Card';

import "./ListCard.scss";

export default function ListCard({data, onDetail}) {
  const subscriptionList = data.map((subscription, index) => {
    return (
      <Card
        key={index}
        subscription={subscription}
        onDetail={onDetail}
      />
    );
  });

  return (
    <ul className="subscriptionList">{subscriptionList}</ul>
  );
}