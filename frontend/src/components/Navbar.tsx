"use client";

import Link from "next/link";
import { useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navRoutes = [
    { id: 2, label: "Win Predictor", url: "/win" },
    { id: 2, label: "Manifesto Comparator", url: "/compare" },
    { id: 2, label: "Election Bot", url: "/bot" },
  ];

  const handleNav = () => setOpenMenu((prev) => !prev);

  return (
    <nav className="sticky flex shadow-sm items-center justify-center h-16 top-0 w-full z-[1000] bg-white">
      <div className="w-full flex flex-col gap-3 py-3 px-5 max-w-screen-xl">
        {/* navbar desktop */}
        <div className="flex items-center w-full justify-between">
          <Link href="/">Logo</Link>

          <div className="sm:flex hidden font-semibold items-center gap-10">
            {navRoutes?.map(({ id, label, url }) => (
              <Link key={id} href={url}>
                {label}
              </Link>
            ))}
          </div>
          {!openMenu && (
            <button
              onClick={handleNav}
              type="button"
              className="sm:hidden block"
            >
              <TbMenu2 />
            </button>
          )}
        </div>

        {/* navbar mobile */}
        <NavbarMobile handle={handleNav} menu={openMenu} options={navRoutes} />
      </div>
    </nav>
  );
};

export default Navbar;
