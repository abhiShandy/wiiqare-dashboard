import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CashIcon,
  ChatIcon,
  MenuIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type Navigation = {
  name: string;
  href: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  current: boolean;
};

const navigation: Navigation[] = [
  // { name: "Channels", href: "/channels", icon: CashIcon, current: false },
  {
    name: "Payments",
    href: "/channel-payments",
    icon: CashIcon,
    current: false,
  },
  { name: "Wallets", href: "/wallets", icon: CashIcon, current: false },
  { name: "Transfers", href: "/transfers", icon: CashIcon, current: false },
  // { name: "Currencies", href: "/currencies", icon: CashIcon, current: false },
  // { name: "Quotes", href: "/quotes", icon: ChatIcon, current: false },
  // {
  //   name: "Merchants",
  //   href: "/merchants",
  //   icon: ShoppingBagIcon,
  //   current: false,
  // },
  // { name: "Admins", href: "/admins", icon: UserGroupIcon, current: false },
  {
    name: "Customers",
    href: "/customers",
    icon: UserGroupIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <Image
                        className="h-8 w-auto"
                        src="/wiiqare_logo_inv_orange.png"
                        alt="WiiQare"
                      />
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-indigo-800 text-white"
                                : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-indigo-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Image
                  src="/wiiqare_logo_inv_orange.png"
                  alt="WiiQare"
                  width={480}
                  height={100}
                />
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-800 text-white"
                        : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
              {session ? (
                <button
                  className="text-white text-sm font-medium border border-white rounded-md h-8 mx-4"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              ) : (
                <button
                  className="text-white text-sm font-medium border border-white rounded-md h-8 mx-4"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4 px-4 sm:px-6 lg:px-8">
                  {title}
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
