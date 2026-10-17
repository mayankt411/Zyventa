import Hero from '@/components/Hero';
import HomeServices from '@/components/HomeServices';
import TrackRecord from '@/components/TrackRecord';
import WhyPartner from '@/components/WhyPartner';
import PartnersMarquee from '@/components/PartnersMarquee';
import HomeCta from '@/components/HomeCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeServices />
      <TrackRecord />
      <WhyPartner />
      <PartnersMarquee />
      <HomeCta />
    </>
  );
}
