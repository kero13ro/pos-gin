import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "components/Header";
import preval from "preval.macro";
import useMutateStock from "hook/useMutateStock";

export default function Layout() {
  const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;
  const { FetchSheet } = useMutateStock();

  useEffect(() => {
    FetchSheet();
  }, [FetchSheet]);

  return (
    <div>
      <div className="deployTimestamp">{dateTimeStamp}</div>
      <Header></Header>
      <Outlet />
    </div>
  );
}
