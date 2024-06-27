import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function FooterLayout() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterBrand
            href="/"
            src="/favicon.png"
            alt="Flowbite Logo"
            name="SGI"
          />
          <FooterLinkGroup className="flex flex-row">
            <FooterLink href="#">Nosotros</FooterLink>
            <FooterLink href="#">Politica de privacidad</FooterLink>
            <FooterLink href="#">Terminos</FooterLink>
            <FooterLink href="#">Contacto</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Cube Bunny" year={2024} />
      </div>
    </Footer>
  );
}
