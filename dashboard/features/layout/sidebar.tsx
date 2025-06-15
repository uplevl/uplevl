import { Link } from "react-router";

import logo from "@@/assets/logo.svg";

export function Sidebar() {
  return (
    <nav className="w-[250px] space-y-4 bg-white">
      <h1 className="p-4">
        <img src={logo} width={102} height={31} className="aspect-[102/31] h-[31px] w-[102px]" alt="The uplevl logo" />
      </h1>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <Link to="/">Dashboard</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </div>
    </nav>
  );
}
