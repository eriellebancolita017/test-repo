// Parent Component: TabComponent.tsx
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabComponentProps {
  tabs: Tab[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;
  return (
    <div>
      <div className="relative main_tab_section justify-center">
        <div
          className="absolute showing_tab_border bottom-0 w-full bg-slate-200 dark:bg-slate-700"
          aria-hidden="true"
        ></div>

        <ul className="flex flex-wrap justify-start md:justify-center">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`flex mr-6 last:mr-0 last:pr-4 sm:last:pr-6 lg:last:pr-8 ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <a
                className={`block pb-3 whitespace-nowrap font-medium ${
                  activeTab === tab.id
                    ? "border-primaryMain border-b-2 text-primaryMain"
                    : ""
                }`}
                href="#0"
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content min-h-[250px]">{activeTabContent}</div>
    </div>
  );
};

export default TabComponent;
