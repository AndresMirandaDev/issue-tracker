import Link from 'next/link'
import React from 'react'
import { GiLongAntennaeBug } from 'react-icons/gi'

const NavBar = () => {
    const links = [
        { label : 'Dashboard', hfref: '/'},
        { label : 'Issues', hfref: '/issues'},
    ]

  return (
    <nav className='flex border-b space-x-6 mb-5 px-5 h-14 items-center'>
        <Link href='/'>
            <GiLongAntennaeBug className='text-5xl text-cyan-600'/>
        </Link>
        <ul className='flex space-x-6'>
            {links.map(link=>
            <Link 
                className=' text-zinc-500 hover:text-zinc-800 transition-colors' 
                href={link.hfref}>
                {link.label}
            </Link>)}
        </ul>
    </nav>
  )
}

export default NavBar