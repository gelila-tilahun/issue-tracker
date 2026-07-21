import { Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-2xl space-y-4">
      <Skeleton height="2.5rem" />
      <Skeleton height="22rem" />
      <Skeleton height="2.5rem" width="8rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
