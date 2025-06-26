'use client';
import NavBar from './ui/navBar';
import Hero from './ui/sections/hero';
import AboutUs from './ui/sections/aboutUs';
import ItemsList from './ui/sections/itemsList';
import HomeRevel from './assits/homeRevel';
import Proses from './ui/sections/proses';
import Footer from './ui/sections/footer';
import { useEffect } from 'react';
import { MasterTL } from './assits/masterTL';

export default function Home() {
  useEffect(() => {
    MasterTL.play(0);
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <NavBar />
      <HomeRevel />
      <Hero />
      <AboutUs />
      <Proses/>
      <ItemsList />
      <Footer />
    </div>
  );
}
