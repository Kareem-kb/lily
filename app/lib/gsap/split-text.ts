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
