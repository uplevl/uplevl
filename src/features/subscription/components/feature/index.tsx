import { Separator } from "@/components/ui/separator";

interface FeatureTypeSeparator {
  type: "separator";
  key: string;
}

interface FeatureTypeListing {
  type: "listing";
  key: string;
  label: string;
  icon: React.ReactNode;
  special?: boolean;
}

export type FeatureItem = FeatureTypeSeparator | FeatureTypeListing;

interface FeatureProps {
  feature: FeatureItem;
}

export function Feature({ feature }: FeatureProps) {
  if (feature.type === "separator") {
    return (
      <li className="py-1">
        <Separator />
      </li>
    );
  }

  return (
    <li className="flex items-center gap-4 text-sm">
      {feature.special ? (
        <>
          {feature.icon}
          <strong>{feature.label}</strong>
        </>
      ) : (
        <>
          {feature.icon}
          <span>{feature.label}</span>
        </>
      )}
    </li>
  );
}
