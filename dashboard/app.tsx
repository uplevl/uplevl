import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

import { PageLoading } from "@@/components/page-loading";
import { AuthProvider } from "@@/features/auth/providers/auth.provider";
import { Layout } from "@@/features/layout";

const DashboardPage = lazy(() => import("./pages/dashboard.page"));
const SignInPage = lazy(() => import("./pages/sign-in.page"));

export function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route
          element={
            <AuthProvider>
              <Layout />
            </AuthProvider>
          }
        >
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Suspense>
  );
}
