"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MainNavLinks({ role }: { role?: string }) {

    const links: { label: string, href: string, adminOnly: boolean, }[] = [
        {
            label: "Dashboard",
            href: '/',
            adminOnly: false,
        },
        {
            label: "Tickets",
            href: '/tickets',
            adminOnly: false,
        },
        {
            label: "User",
            href: '/users',
            adminOnly: true,
        },
    ]

    const currentPath = usePathname();

    return (
        <div className='flex items-center gap-2' >
            {links.filter((link) => !link.adminOnly || role === "ADMIN").map((link, index) => (
                <Link key={index} href={link.href} className={`navbar-link ${currentPath == link.href && 'cursor-default text-primary/70 hover:text-primary/60'}`}>{link.label}</Link>
            ))}
        </div >
    )
}

export default MainNavLinks

