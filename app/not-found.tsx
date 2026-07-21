import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Flex direction="column" align="center" justify="center" className="min-h-[60vh]" gap="4">
      <Heading size="6">404 — Page Not Found</Heading>
      <Text color="gray" size="3">
        The page you are looking for does not exist or has been moved.
      </Text>
      <Button asChild variant="solid">
        <Link href="/">Go to Dashboard</Link>
      </Button>
    </Flex>
  );
}
