import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { NavLinks } from '@/constants'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'
export  default async function Navbar() {

    const session = await getCurrentUser()
    console.log("sessao",session)
    return (
        <nav className='navbar flexBetween '>
            <div className='flex-1 flexStart gap-10'>
                <Link href={'/'}>
                    <Image
                        src={'/logo.svg'}
                        width={115}
                        height={43}
                        alt='Flexible'
                    />
                </Link>
                <ul className='hidden 
          text-small gap-7 xl:flex'>
                    {NavLinks.map(link => (
                        <Link key={link.key} href={link.href}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>

            <div className='flex justify-center items-center gap-4'>
                {session?.user ?
                    <>
                         {session.user.name}
                        <Link href={'/create-project'}>Share Work</Link>
                    </>
                    : <AuthProviders />}
            </div>
        </nav>
    )
}
