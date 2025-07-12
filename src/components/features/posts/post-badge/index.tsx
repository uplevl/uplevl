import { POST_STATUSES, type PostStatus } from "@/database/schema";

import { Badge } from "@/components/ui/badge";

const statusBadgeMap = {
  [POST_STATUSES.DRAFT]: "Draft",
  [POST_STATUSES.PUBLISHED]: "Published",
  [POST_STATUSES.ARCHIVED]: "Archived",
} as const;

const statusVariantMap = {
  [POST_STATUSES.DRAFT]: "secondary",
  [POST_STATUSES.PUBLISHED]: "default",
  [POST_STATUSES.ARCHIVED]: "outline",
} as const;

interface PostBadgeProps extends React.ComponentProps<typeof Badge> {
  status: PostStatus;
}

export default function PostBadge({ status, ...props }: PostBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} {...props}>
      {statusBadgeMap[status]}
    </Badge>
  );
}
