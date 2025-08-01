import { Suspense } from "react";

import { Page, PageHeader } from "@/components/page";
import { PageLoading } from "@/components/page-loading";

import { PageContent } from "./page-content";

export default function NewPostPage() {
  return (
    <Page>
      <PageHeader title="New Post(s)" description="Create a new social post(s)." />
      <div className="space-y-6">
        <Suspense fallback={<PageLoading />}>
          <PageContent />
        </Suspense>
      </div>
    </Page>
  );
}
