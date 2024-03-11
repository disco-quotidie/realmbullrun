"use client"

import { Logo } from "./Logo"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useRouter } from "next/navigation"
import { WalletConnect } from "../WalletConnect"
import { ModeToggle } from "../ui/ModeToggle"
import { BsList } from 'react-icons/bs'
import Link from "next/link"

export const Header = () => {

  const router = useRouter()

  const menuItems = [
    {
      text: "Explore",
      href: "/explore"
    },
    {
      text: "Mint Subrealm",
      href: "/mint-subrealm"
    }
  ]

  return (
    <>
      <Menubar className="flex justify-between p-8 rounded-none border-x-0">
        <Logo />

        <div className="sm:hidden">
          <MenubarMenu >
            <MenubarTrigger><BsList size="24" /></MenubarTrigger>
            <MenubarContent className="flex flex-col gap-2">
              {
                menuItems.map((item: any) => (
                  <MenubarItem key={item.href} onClick={() => router.push(item.href)}>
                    {item.text}
                  </MenubarItem>
                ))
              }
            </MenubarContent>
          </MenubarMenu>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:space-x-12 md:pl-20">
          {
            menuItems.map((item: any) => (
              <Link key={item.text} href={item.href}>
                {item.text}
              </Link>
            ))
          }
        </div>

        <div className="flex flex-row space-x-2">
          <ModeToggle />
          <WalletConnect />
        </div>


      </Menubar>

    </>
  )
}