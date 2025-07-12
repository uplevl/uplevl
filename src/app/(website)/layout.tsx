import { Footer } from "@/components/features/website/footer";
import { Header } from "@/components/features/website/header";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
