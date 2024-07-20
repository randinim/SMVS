import React from "react";
import ResponsiveDrawer from "../Layout/Drawer";
import CommonCard from "./Components/CommonCard";

export const AdminPanel = () => {
  return (
    <ResponsiveDrawer>
      <div className="grid grid-cols-4 gap-2">
        <CommonCard value="LKR: 521,120.00" title="Account Balance" />
        <CommonCard value="5" title="Total orders" />
        <CommonCard value="5" title="Total orders" />
        <CommonCard value="5" title="Total orders" />
      </div>
    </ResponsiveDrawer>
  );
};