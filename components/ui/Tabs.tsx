import React, { useState } from "react";

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid #444", marginBottom: "1rem" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === index ? "#333" : "transparent",
              color: activeTab === index ? "#fff" : "#aaa",
              borderBottom:
                activeTab === index ? "2px solid #4CAF50" : "2px solid transparent",
              fontSize: '1em',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;