'use client';
import { Skeleton } from "@/app/components";
import { Avatar, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

const NavBar = () => {
  return (
    <nav className="flex px-5 h-14 items-center border-b border-gray-100 bg-white shadow-sm mb-5">
      <Flex justify="between" align="center" width="100%">
        <Flex align="center" gap="4">
          <Link href="/" className="flex items-center">
            <Image
              src="/ethio-telecom-logo.png"
              alt="Ethio Telecom"
              width={120}
              height={40}
              priority
            />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className="flex items-center gap-1">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              {
                'bg-green-50 text-green-700': link.href === currentPath,
                'text-gray-600 hover:text-green-600 hover:bg-gray-50': link.href !== currentPath,
              }
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3" />;

  if (status === "unauthenticated")
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
      >
        Login
      </Link>
    );

  return (
    <Flex align="center" gap="3">
      <Text size="2" className="text-gray-600 hidden sm:block">
        {session!.user!.name || session!.user!.email}
      </Text>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback={session!.user!.name?.[0]?.toUpperCase() ?? "?"}
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            color="red"
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default NavBar;
