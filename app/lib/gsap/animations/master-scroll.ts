import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function masterScroll() {
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  const panels = gsap.utils.toArray<HTMLElement>('.panel');

  const heroPanel = panels[0];

  // Pin the hero section
  ScrollTrigger.create({
    trigger: heroPanel,
    start: 'top top',
    pin: true,
    pinSpacing: false,
  });

}
