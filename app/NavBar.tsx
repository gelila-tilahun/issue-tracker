'use client';

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBugs } from "react-icons/fa6";

const NavBar = () => {

  return (
    <nav className='flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center'>  
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
               <FaBugs/>
            </Link>  
             <NavLinks />     
          </Flex> 
            <AuthStatus/>    
        </Flex>
    </Container> 
    </nav>
);
};

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
      {label: 'Dashboard',  href: '/'},
      {label: 'Issues', href: '/issues/list'}
  ];

      return (<ul className='flex space-x-6'>
        {links.map((link) =>(
           <li  key={link.href} >
           <Link             
              className= {classnames({
                "nav-link": true,
                '!text-zinc-900': link.href === currentPath,
              })}
              href={link.href}
              > 
              {link.label} 
              </Link>
            </li>
          ))}  
      </ul>
      );
};

const AuthStatus = () => {
   const { status, data: session  } = useSession();
  
   if (status === "loading") return null;

   if (status === "unauthenticated")       
        return <Link className= "nav-link" href="/api/auth/signin">Login</Link>;
        
   return(  
        <Box>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar src={session!.user!.image!} 
                  fallback="?"
                  size = "2"
                  radius="full"
                  className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">
                    { session!.user!.email }
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                 <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
                </DropdownMenu.Root>
          </Box>          
  );
};

export default NavBar