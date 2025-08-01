import { Footer } from "@/features/website/components/footer/footer";
import { Header } from "@/features/website/components/header/header";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
