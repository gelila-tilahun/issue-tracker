import React from 'react';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
  href: string;
  // Changed from string to ReactNode to support icons or formatted text
  children: React.ReactNode; 
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      {/* Removed the extra whitespace around {children} to fix inline rendering gaps */}
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;