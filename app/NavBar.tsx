'use client';
import Link from 'next/link';
import React from 'react';
import { GiLongAntennaeBug } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();

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
          <Link
            key={link.hfref}
            className={classNames({
              'text-zinc-900': link.hfref === currentPath,
              'text-zinc-500': link.hfref !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.hfref}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
