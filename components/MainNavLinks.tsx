"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MainNavLinks() {

    const links: { label: string, href: string }[] = [
        {
            label: "Dashboard",
            href: '/',
        },
        {
            label: "Tickets",
            href: '/tickets',
        },
        {
            label: "User",
            href: '/users',
        },
    ]

    const currentPath = usePathname();

    return (
        <div className='flex items-center gap-2' >
            {links.map((link, index) => (
                <Link key={index} href={link.href} className={`navbar-link ${currentPath == link.href && 'cursor-default text-primary/70 hover:text-primary/60'}`}>{link.label}</Link>
            ))}
        </div >
    )
}

export default MainNavLinks

