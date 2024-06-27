import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { SGIIcon } from "../icons/sgi";

export function Header() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <div className="flex gap-2 text-3xl dark:text-white">
          <SGIIcon />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ">
            SGI
          </span>
        </div>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="#">
          Inicio
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
