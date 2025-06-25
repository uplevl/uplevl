import { createContext, useContext } from "react";

import { type AgentWithOfferings } from "../../actions/agent";

const OfferingsContext = createContext<AgentWithOfferings["offerings"]>([]);

interface OfferingsProviderProps {
  offerings: AgentWithOfferings["offerings"];
  children: React.ReactNode;
}

export default function OfferingsProvider({ children, offerings }: OfferingsProviderProps) {
  return <OfferingsContext.Provider value={offerings}>{children}</OfferingsContext.Provider>;
}

export function useOfferings() {
  const context = useContext(OfferingsContext);

  if (!context) {
    throw new Error("useOfferings must be used within an OfferingsProvider");
  }

  return context;
}

export function useOfferingById(offeringId: number) {
  const offerings = useOfferings();

  return offerings.find((offering) => offering.id === offeringId)!;
}
