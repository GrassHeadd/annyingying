"use client";

import { useState } from "react";
import OriginTab from "./components/OriginTab";
import ValentineGameTab from "./components/ValentineGameTab";

const tabs = [
  { id: "confession", label: "Confession" },
  { id: "valentine", label: "Valentine" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("valentine");

  function switchTab(id) {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <nav className={`nav ${activeTab === "valentine" ? "nav-dark" : ""}`}>
        {tabs.map((tab, i) => (
          <span key={tab.id}>
            {i > 0 && <span className="nav-divider">|</span>}
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => switchTab(tab.id)}
            >
              {tab.label}
            </button>
          </span>
        ))}
      </nav>

      {activeTab === "confession" && <OriginTab />}
      {activeTab === "valentine" && <ValentineGameTab />}
    </>
  );
}
