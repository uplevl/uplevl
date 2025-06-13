import { Test } from "./shared/components/test";
import { Providers } from "./shared/providers";

export function App() {
  return (
    <Providers>
      <h1 className="text-2xl font-semibold">Hello from the Uplevl Dashboard</h1>
      <Test />
    </Providers>
  );
}
