import BestSellersSec from "@/components/Home/bestSellersSec/BestSellersSec";
import Hero from "@/components/Home/heroSec/Hero";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellersSec />
      <AboutPage />
      <ContactPage />
    </main>
  );
}