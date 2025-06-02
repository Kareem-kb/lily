'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="Shero border-2 border-amber-950">
      <div className="flex h-full flex-row">
        <div className="w-1/2">
          <Image src="/logo.png" alt="Hero" width={500} height={500} />
        </div>
        <div className="hero-text flex w-1/2 flex-col justify-center">
          <h1 className="text-4xl font-bold">
            Baked with Love, Delivered with Joy
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <button className="rounded-md bg-amber-950 px-4 py-2 text-white">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
