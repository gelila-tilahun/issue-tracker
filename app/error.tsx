'use client';

import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex direction="column" align="center" justify="center" className="min-h-[60vh]" gap="4">
      <Heading size="6">Something went wrong</Heading>
      <Text color="gray" size="3">
        An unexpected error occurred. Please try again.
      </Text>
      <Button onClick={reset} variant="solid">
        Try Again
      </Button>
    </Flex>
  );
}
