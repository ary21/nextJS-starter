import { Inter } from "next/font/google";
import { ThemeProviders } from "../components/providers/themeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyApp",
  description: "Online Admin App Custome",
};

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="en" {...pageProps}>
      <body>
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
