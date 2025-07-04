"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    href: "/",
    label: "Home",
  }
]

export default function Navbar() {

  const pathName = usePathname();

  return (
    <nav>
      <ul className='hidden gap-2 md:flex'>
        {navLinks.map((link) => {
          const isActive = link.href === pathName

          return (
            <li key={link.label} className='relative flex h-[60px] items-center justify-center'>
              <Link
                className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
              {isActive ? (
              <>
                <div className='absolute bottom-0 left-1/2 h-px w-12 -translate-x-1/2 bg-primary' />
                <div className='absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-[4px] bg-primary/70 blur' />
              </>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
