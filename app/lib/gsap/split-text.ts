'use client';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export async function splitText(selector: string | Element) {
  await document.fonts.ready;

  return new SplitText(selector, {
    type: 'lines words',
    mask: 'lines',
    linesClass: 'block overflow-hidden about-lines',
  });
}

export function slideWords(selector: string) {
  const split = new SplitText(selector, { type: 'lines' });
  const tl = gsap.timeline({ repeat: -1 });

  split.lines.forEach((line, i) => {
    tl.to(split.lines, {
      yPercent: -100 * i,
      duration: 1,
      ease: 'power2.inOut',
    }).to({}, { duration: 5 }); // pause between transitions
  });
  return tl;
}
