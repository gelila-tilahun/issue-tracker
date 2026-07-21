'use client';

import { Skeleton } from "@/app/components";
import { Avatar, DropdownMenu, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { useState } from 'react';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues/list' },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm mb-5">
      {/* Desktop / tablet bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 h-14">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/ethio-telecom-logo.png"
              alt="Ethio Telecom"
              width={110}
              height={36}
              priority
            />
          </Link>
          {/* Nav links — hidden on mobile */}
          <ul className="hidden sm:flex items-center gap-1">
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
        </div>

        {/* Right: auth status + hamburger */}
        <div className="flex items-center gap-2">
          <AuthStatus />
          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={classnames(
                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                {
                  'bg-green-50 text-green-700': link.href === currentPath,
                  'text-gray-600 hover:text-green-600 hover:bg-gray-50': link.href !== currentPath,
                }
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3" />;

  if (status === "unauthenticated")
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors px-3 py-1.5"
      >
        Login
      </Link>
    );

  return (
    <div className="flex items-center gap-2">
      {/* Name — hidden on small screens */}
      <Text size="2" className="text-gray-600 hidden md:block truncate max-w-[140px]">
        {session!.user!.name || session!.user!.email}
      </Text>

      {/* Avatar dropdown */}
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
        <DropdownMenu.Content align="end">
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

      {/* Logout button — hidden on mobile, shown on sm+ */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span className="hidden lg:inline">Logout</span>
      </button>
    </div>
  );
};

export default NavBar;
