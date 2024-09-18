"use client";

import { Drawer } from "antd";
import Link from "next/link";
import { TbX } from "react-icons/tb";

const NavbarMobile = ({ handle, menu, options }: unknown) => {
  return (
    <Drawer
      onClose={handle}
      open={menu}
      closeIcon={null}
      headerStyle={{ display: "none" }}
    >
      <div className="flex flex-col text-lg h-full w-full">
        <button
          type="button"
          onClick={handle}
          className="flex text-xl items-center justify-end"
        >
          <TbX />
        </button>

        <div className="flex flex-1 py-10 text-center flex-col gap-3">
          {options?.map(({ id, label, url }) => (
            <Link onClick={handle} className="text-black" key={id} href={url}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default NavbarMobile;
