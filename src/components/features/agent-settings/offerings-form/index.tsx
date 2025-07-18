"use client";

import { formatCentsToDollarsIntl } from "@/lib/utils";

import { type AgentWithOfferings } from "@/data/agent/types";

import { FormPanel } from "@/components/common/form-panel";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import OfferingsProvider from "../offerings-provider";
import { OfferingsMenu } from "./offerings-menu";

interface OfferingsFormProps {
  agent: AgentWithOfferings;
}

export function OfferingsForm({ agent }: OfferingsFormProps) {
  return (
    <OfferingsProvider offerings={agent.offerings}>
      <FormPanel
        title="Offerings"
        description="These are your products or services. It is best practice to add a good description that is clear and concise. You can add tiers to each offering to offer different pricing options."
      >
        <div className="col-span-2 space-y-2">
          {agent.offerings.map((offering) => (
            <Card key={offering.id} className="py-2 sm:py-4">
              <CardContent className="px-3 sm:px-5">
                <div className="grid gap-8 sm:grid-cols-10">
                  {/* Title and description */}
                  <div className="col-span-4 space-y-1">
                    <h3 className="text-base font-medium">{offering.title}</h3>
                    <p className="text-muted-foreground text-sm">{offering.description}</p>
                  </div>
                  {/* Tiers */}
                  <div className="col-span-4 col-start-6 space-y-1">
                    <h4 className="border-b pb-1 text-sm font-medium">Tiers</h4>
                    <Table>
                      <TableBody className="divide-none">
                        {offering.prices.map((price) => (
                          <TableRow key={price.id}>
                            <TableCell className="py-1 pl-0 text-xs">{price.tier}</TableCell>
                            <TableCell className="flex items-center gap-1 py-1 text-xs">
                              {price.price && (
                                <span className="font-semibold">{formatCentsToDollarsIntl(price.price)}</span>
                              )}
                              {price.unit && <span>{price.unit}</span>}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {/* Actions */}
                  <div className="col-span-1 flex justify-end">
                    <OfferingsMenu offeringId={offering.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FormPanel>
    </OfferingsProvider>
  );
}
