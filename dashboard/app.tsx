import { Route, Routes } from "react-router";

import { Layout } from "./features/layout";
import DashboardPage from "./pages/dashboard";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
