import { ThemeProviders } from "../components/providers/themeProvider";
import { Inter } from "next/font/google";
import Template from "@/components/organisms/Template";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cargo",
  description: "Online Cargo App Custome",
};

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="en" {...pageProps}>
      <body>
        <ThemeProviders>
          <Template>
            {children}
          </Template>
        </ThemeProviders>
      </body>
    </html>
  );
}
