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
    },
    {
      text: "Profil",
      href: "/profil"
    },
    {
      text: "Whitelist",
      href: "/whitelist"
    }
  ]

  return (
    <>
      <Menubar className="fixed z-50 top-0 w-full flex justify-between sm:px-8 px-4 py-8 rounded-none border-x-0 border-t-0 bg-[#1e293b]">  {/* //#bf94eb21 */}
        <Logo />

        <div className="sm:hidden text-[#f8fafc]">
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
              <div className="flex sm:hidden flex-row space-x-2">
                <ModeToggle />
                <WalletConnect />
              </div>
            </MenubarContent>
          </MenubarMenu>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:space-x-10 ">
          {
            menuItems.map((item: any) => (
              <Link className="text-[#f8fafc]" key={item.text} href={item.href}>
                {item.text}
              </Link>
            ))
          }
        </div>

        <div className="hidden sm:flex flex-row space-x-2">
          <ModeToggle />
          <WalletConnect />
        </div>


      </Menubar>

    </>
  )
}