import gsap from 'gsap';

/*
 * One paused timeline that lives for the whole session.
 * Because the file is a module, it’s executed once and cached.
 */
export const MasterTL = gsap.timeline({ paused: true });
