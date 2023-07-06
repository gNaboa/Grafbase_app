import { footerLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type ColumnProps = {
    title: string,
    links: string[]
}

const FooterColumn = ({ title, links }: ColumnProps) => (
    <div className='flex-1 flex flex-col gap-3 text-sm min-w-max'>
        <strong>{title}</strong>
        <ul className='flex flex-col gap-2 font-normal'>
            {links.map(link => (
                <Link href={'/'}>{link}</Link>
            ))}
        </ul>
    </div>
)


export default function Footer() {

    return (
        <footer className=' flex-col paddings w-full
   gap-20 bg-light-white flex items-center justify-start'>
            <div className='flex flex-col gap-12 w-full '>
                <div className='flex flex-col items-start'>
                    <Image
                        src={'/logo-purple.svg'}
                        width={115}
                        height={38}
                        alt='Flexibble'
                    />
                    <p className='text-start text-sm font-normal mt-5 max-w-xs'>
                        Flexibble is the world's leading community for
                        creatives to share, grow, and get hired.
                    </p>
                </div>
                <div className='flex flex-wrap gap-12'>
                    {footerLinks.map(footerLink => (

                        <FooterColumn
                            links={footerLink.links}
                            title={footerLink.title} />
                    ))}
                </div>
            </div>

            <div className=' flex justify-between items-center 
             max-sm:flex-col w-full text-sm font-normal'>
                <p>@ 2023 Flexibble.All rights reserved</p>
                <p className='text-gray'>
                    <span className='text-black font-semibold'>
                        10,214
                    </span> projects submitted
                </p>
            </div>
        </footer>
    )
}
