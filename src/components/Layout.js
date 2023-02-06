import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";

function Layout({ children }) {
  const [active, setActive] = useState(0);
  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden relative">
      <div className="w-[3.30rem] absolute left-0 top-0 overflow-hidden border-r hover:w-56 bg-white shadow-lg transition-all ease-in-out duration-200">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5 font-bold">EM</div>
            <ul className="mt-6 space-y-2 tracking-wide">
              {routes.map((route, k) => {
                return (
                  <li className="min-w-max">
                    <Link
                      to={route.path}
                      className={`relative flex items-center px-4 py-3  space-x-4 ${
                        active === k
                          ? "bg-gradient-to-r from-sky-600 to-cyan-400  text-white"
                          : "text-gray-600"
                      } `}
                      onClick={() => setActive(k)}
                    >
                      {route.icon}
                      <span className="-mr-1 font-medium">{route.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <main className="h-screen overflow-y-auto ml-[3.30rem]">{children}</main>
    </div>
  );
}

export default Layout;
