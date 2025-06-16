import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

import { Layout } from "./features/layout";

const DashboardPage = lazy(() => import("./pages/dashboard"));
const SettingsPage = lazy(() => import("./pages/settings"));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
