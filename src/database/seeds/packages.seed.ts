import { db } from "@/database";
import { PackageFeatureTable, PackageTable } from "@/database/schema";

import packages from "./data/packages.data.json";

export async function seedPackages() {
  await db.transaction(async (tx) => {
    console.log("Seeding packages...");

    let numberOfPackages = 0;

    for (const { features, ...pck } of packages) {
      // Insert package and verify result
      const packageResult = await tx.insert(PackageTable).values(pck).returning({ id: PackageTable.id });

      if (packageResult.length === 0) {
        throw new Error(`Failed to create package: ${JSON.stringify(pck)}`);
      }

      const insertedPackage = packageResult[0];

      numberOfPackages++;

      // Construct the feature data with the package ID
      const featureData = features.map((feature) => ({
        ...feature,
        description: "",
        packageId: insertedPackage.id,
      }));

      // Insert features and verify result
      const featureResult = await tx
        .insert(PackageFeatureTable)
        .values(featureData)
        .returning({ id: PackageFeatureTable.id });

      if (featureResult.length === 0) {
        throw new Error(`Failed to create features for package ${insertedPackage.id}`);
      }
    }

    console.log("  ... Packages seeded successfully: ", numberOfPackages);
  });
}
