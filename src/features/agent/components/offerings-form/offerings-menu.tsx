"use client";

import { EllipsisIcon } from "lucide-react";

import { ConfirmAlert } from "@/components/confirm-alert";
import { DeleteIcon, PenIcon } from "@/components/icons";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteOffering } from "../../actions/offerings";
import { useOfferingById } from "../../providers/offerings-provider";
import { OfferingsModal, OfferingsModalContent, OfferingsModalTrigger } from "./offerings-modal";

interface OfferingsMenuProps {
  offeringId: number;
}

export function OfferingsMenu({ offeringId }: OfferingsMenuProps) {
  const offering = useOfferingById(offeringId);

  async function handleDeleteOffering() {
    await deleteOffering(offering.agentId, offering.id);
  }

  return (
    <ConfirmAlert
      title="Delete Offering"
      description="Are you sure you want to delete this offering? This action cannot be undone."
      onConfirm={handleDeleteOffering}
    >
      <OfferingsModal>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <OfferingsModalTrigger asChild>
              <DropdownMenuItem>
                <PenIcon className="size-4" />
                <span>Edit Offering</span>
              </DropdownMenuItem>
            </OfferingsModalTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem variant="destructive">
                <DeleteIcon className="size-4" />
                Delete Offering
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <OfferingsModalContent offeringId={offeringId} />
      </OfferingsModal>
    </ConfirmAlert>
  );
}
