'use client';
import Link from 'next/link';
import React from 'react';
import { GiLongAntennaeBug } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { Spinner } from './components';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', hfref: '/' },
    { label: 'Issues', hfref: '/issues/list' },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiLongAntennaeBug className="text-2xl text-cyan-600" />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.hfref}>
                  <Link
                    className={classNames({
                      'text-zinc-900': link.hfref === currentPath,
                      'text-zinc-500': link.hfref !== currentPath,
                      'hover:text-zinc-800 transition-colors': true,
                    })}
                    href={link.hfref}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={'/api/auth/signout'}>Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href={'/api/auth/signin'}>Log in</Link>
            )}
            {status === 'loading' && <Spinner />}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
