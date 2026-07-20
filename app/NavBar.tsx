'use client';
import {Skeleton} from "@/app/components"
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react/jsx-runtime";



const NavBar = () => {

  return (
    <nav className='flex space-x-6 mb-5 px-5 h-14 items-center'>    
        <Flex justify="between" align="center" width="100%" >
          <Flex align="center" gap="3">
            <Link href="/" className="flex items-center gap-2">
              {/* <FaBugs/>*/}
         <Image 
  src="/ethio-telecom-logo.png" // Points directly to public/ethio-telecom-logo.png
  alt="Ethio Telecom Logo" 
  width={150}           
  height={350}           
  priority              
/>

            </Link>  
             <NavLinks />     
          </Flex > 
            <AuthStatus/>    
        </Flex>
   
    </nav>
);
};


const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
      {label: 'Dashboard',  href: '/'},  
      {label: 'Issues', href: '/issues/list'},
     
  ];

      return (
    // Changed space-x-6 to gap-6 and added h-5 items-center for layout stability
    <ul className="flex h-5 items-center gap-6">
      {links.map((link, index) => (
        <Fragment key={link.href}>
          <li>
            <Link             
              className={classnames({
                "nav-link": true,                
                '!text-zinc-400': link.href === currentPath,
              })}
              href={link.href}
            > 
              {link.label} 
            </Link>
          </li>
          
          {/* Insert the separator line between the links */}
          {index < links.length - 1 && (
            <Separator orientation="vertical" className="h-4 w-[1px] bg-neutral-500 dark:bg-neutral-900" />
          )}
        </Fragment>
      ))}  
    </ul>
  );
};


const AuthStatus = () => {
   const { status, data: session  } = useSession();
  
   if (status === "loading") return <Skeleton width="3"/>;

   if (status === "unauthenticated")       
        return <Link className="nav-link" href="/login">Login</Link>;
        
   return(  
        <Flex align="center" gap="3">
          {/* User email */}
          <Text size="2" className="text-gray-600 hidden sm:block">
            {session!.user!.name || session!.user!.email}
          </Text>

          {/* Avatar with dropdown */}
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

          {/* Standalone logout button */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition"
          >
            Logout
          </button>
        </Flex>
  );
};

export default NavBar