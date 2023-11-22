'use client';
import Link from 'next/link';
import React from 'react';
import { GiLongAntennaeBug } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';
import { Spinner } from './components';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', hfref: '/' },
    { label: 'Issues', hfref: '/issues/list' },
  ];

  return (
    <nav className="flex border-b space-x-6 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <GiLongAntennaeBug className="text-5xl text-cyan-600" />
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
      <Box>
        {status === 'authenticated' && (
          <Link href={'/api/auth/signout'}>Log out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href={'/api/auth/signin'}>Log in</Link>
        )}
        {status === 'loading' && <Spinner />}
      </Box>
    </nav>
  );
};

export default NavBar;
