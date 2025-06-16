import Hero from './ui/sections/hero';
import AboutUs from './ui/sections/aboutUs';
import ItemsList from './ui/sections/itemsList';
import Footer from './ui/sections/footer';


export default function Home() {

  return (
    <div className='  mx-auto'>
      <Hero />
      <AboutUs />
      <ItemsList />
      <Footer />
    </div>
  );
}
