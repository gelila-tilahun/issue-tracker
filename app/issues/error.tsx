'use client';

import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function IssuesError({ error, reset }: Props) {
  return (
    <Flex direction="column" align="center" justify="center" className="min-h-[60vh]" gap="4">
      <Heading size="6">Failed to load issues</Heading>
      <Text color="gray" size="3">
        Something went wrong while loading this page.
      </Text>
      <Flex gap="3">
        <Button onClick={reset} variant="solid">
          Try Again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go to Dashboard</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
