import { Skeleton } from '@/app/components';
import { Box, Card, Flex, Grid } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="6">
      <Box className="sm:col-span-4 space-y-3">
        <Skeleton height="2rem" />
        <Flex gap="3">
          <Skeleton width="5rem" height="1.5rem" />
          <Skeleton width="8rem" height="1.5rem" />
        </Flex>
        <Card>
          <Skeleton count={5} />
        </Card>
      </Box>
      <Box>
        <Card>
          <Skeleton height="2rem" className="mb-3" />
          <Skeleton height="2.5rem" className="mb-2" />
          <Skeleton height="2.5rem" className="mb-2" />
          <Skeleton height="2.5rem" className="mb-2" />
          <Skeleton height="2.5rem" />
        </Card>
      </Box>
    </Grid>
  );
};

export default LoadingIssueDetailPage;
