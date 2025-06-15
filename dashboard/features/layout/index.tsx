import { Outlet } from "react-router";

import { Sidebar } from "./sidebar";

export function Layout() {
  return (
    <>
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
}
