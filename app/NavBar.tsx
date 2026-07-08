'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBugs } from "react-icons/fa6";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session  } = useSession();

  const links = [
    {label: 'Dashboard',  href: '/'},
    {label: 'Issues', href: '/issues/list'}
  ]
  return (
    <nav className='flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center'>  
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/"> <FaBugs /></Link> 
      <ul className='flex space-x-6'>
        {links.map((link) =>(
           <li  key={link.href} >
           <Link             
              className= {classnames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'hover:text-xinc-800 transition-colors' : true
              })}
              href={link.href}
              > 
              {link.label} 
              </Link>
            </li>
          ))}  
      </ul>
          </Flex>

          <Box>
     { status === "authenticated" && (
          <Link href="/api/auth/signout">Logout</Link>
          )}
          { status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
          </Box>          
        </Flex>
    </Container> 
    </nav>
);
};


export default NavBar