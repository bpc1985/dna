import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils";
import Loading from '../components/Loading/Loading'

import "./DetailsPage.scss";

export default function DetailsPage() {
  const { sid } = useParams();
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function fetchDetailsData() {
      const data = await fetchData(`subscriptions/${sid}?_expand=dnaPackage&_expand=user`);
      setDetail(data);
    }
    fetchDetailsData();

    return () => {};
  }, []);

  if (!detail) {
    return <Loading />;
  }

  const { phone_number, address, end_user, user, dnaPackage } = detail;

  return (
    <React.Fragment>
      <h2>Subscription Details</h2>
      <div className="detailListItem">
        <div className="detailInfoLeft">
          <h1>Customer Info</h1>
          <div>Payer: {user.first_name} {user.last_name}</div>
          <div>User: {end_user}</div>
          <div>Email: {user.email}</div>
          {phone_number && <div>Phone Number: {phone_number}</div>}
          {address && <div>Address: {address}</div>}
        </div>
        <div className="detailInfoRight">
          <h1>
            <div>{dnaPackage.name}</div>
            <div>({dnaPackage.type})</div>
          </h1>
          <div>{dnaPackage.description}</div>
          <div>
            Price: €{dnaPackage.price}{" "}
            {dnaPackage.agreement !== "prepaid" && " / month"}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
