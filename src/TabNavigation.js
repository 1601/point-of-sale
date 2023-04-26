// TabNavigation.js
import React from "react";

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tab-navigation">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={activeTab === tab ? "active-tab" : ""}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
