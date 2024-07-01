import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/liste-tache.png";

type Props = {
  onChangeSideBar: (title: string) => void;
};

const Sidebar: React.FC<any> = (props: Props) => {
  //   const location = useLocation();
  function onChangeSideBar(value: string) {
    return props.onChangeSideBar(value);
  }
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <img
          className="logo-tache"
          src={Logo}
          alt="Logo tâche"
          width="50"
          height="200"
        ></img>
        <ul className="mt-4">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white block p-2"
              onClick={() => onChangeSideBar("Accueil")}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="text-gray-300 hover:text-white block p-2"
              onClick={() => onChangeSideBar("Tâches")}
            >
              Tâches
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white block p-2"
              //   className={location.pathname === "/" ? "gras" : ""}
              onClick={() => onChangeSideBar("A propos")}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
