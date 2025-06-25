import { Footer } from "@/features/website/components/footer";
import { Header } from "@/features/website/components/header";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
