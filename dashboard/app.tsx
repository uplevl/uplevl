import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

import { PageLoading } from "@@/components/page-loading";
import { AuthProvider } from "@@/features/auth/providers/auth.provider";
import { Layout } from "@@/features/layout";

import { AgentProvider } from "./features/agent/providers/agent.provider";

const DashboardPage = lazy(() => import("./pages/dashboard.page"));
const SignInPage = lazy(() => import("./pages/sign-in.page"));
const AgentPage = lazy(() => import("./pages/agent.page"));

export function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route
          element={
            <AuthProvider>
              <AgentProvider>
                <Layout />
              </AgentProvider>
            </AuthProvider>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/agent" element={<AgentPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </Suspense>
  );
}
