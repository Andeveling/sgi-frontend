import { Flowbite, ThemeModeScript } from "flowbite-react";
import { Inter } from "next/font/google";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { FooterLayout } from "./components/footer";
import "./globals.css";
import { flowbiteTheme } from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SGI Sistemas de inventario",
  description: "SGI Sistemas de inventario para tu negocio",
};

const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <html
      lang="es"
      className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-50"
    >
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={twMerge(
          "box-border min-h-dvh min-w-full bg-gray-100 font-sans text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-50",
          inter.className,
        )}
      >
        <Flowbite theme={{ theme: flowbiteTheme }}>{children}</Flowbite>
        <FooterLayout />
      </body>
    </html>
  );
};

export default RootLayout;
