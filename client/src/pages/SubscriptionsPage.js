import React, { useState, useEffect } from "react";
import Search from "../components/Search/Search";
import ListCard from "../components/Cards/ListCard";
import Loading from '../components/Loading/Loading'
import { fetchData, isSearchTermIncluded } from "../utils";

import "./SubscriptionsPage.scss";

const initalState = {
  searchTerm: "",
  subscriptions: null,
  filteredSubscriptions: null
};

export default function SubscriptionsPage(props) {
  const [state, setState] = useState(initalState);

  useEffect(() => {
    async function fetchSubscriptionsData() {
      const subscriptions = await fetchData("subscriptions?_expand=dnaPackage");
      setState({
        ...state,
        subscriptions,
        filteredSubscriptions: subscriptions
      });
    }
    fetchSubscriptionsData();

    return () => {};
  }, []);

  useEffect(() => {
    if (state.subscriptions) {
      const filteredSubscriptions = state.subscriptions.filter(sub =>
        isSearchTermIncluded(sub.dnaPackage, state.searchTerm)
      );
      setState({ ...state, filteredSubscriptions });
    }
  }, [state.searchTerm]);

  const onDetail = sid => {
    props.history.push(`/subscriptions/${sid}`);
  };

  const onSearch = searchTerm => {
    setState({ ...state, searchTerm });
  };

  const { searchTerm, filteredSubscriptions } = state;

  if (!filteredSubscriptions) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="searchGroup">
        <div className="pageTitle">Subscriptions</div>
        <Search searchTerm={searchTerm} onSearch={onSearch} />
      </div>
      <ListCard data={filteredSubscriptions} onDetail={onDetail} />
    </React.Fragment>
  );
}
