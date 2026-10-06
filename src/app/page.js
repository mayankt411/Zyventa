import Hero from '@/components/Hero';
import AboutIntroStats from '@/components/AboutIntroStats';
import DistributionTabs from '@/components/DistributionTabs';
import KeyServicesGrid from '@/components/KeyServicesGrid';
import PartnersMarquee from '@/components/PartnersMarquee';
import OurJourney from '@/components/OurJourney';
import OurBrandsShowcase from '@/components/OurBrandsShowcase';
import LeadershipSpotlight from '@/components/LeadershipSpotlight';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntroStats />
      <DistributionTabs />
      <KeyServicesGrid />
      <PartnersMarquee />
      <OurJourney />
      <OurBrandsShowcase />
      <LeadershipSpotlight />
    </>
  );
}
