import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white block p-2">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="text-gray-300 hover:text-white block p-2"
            >
              Tâches
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
