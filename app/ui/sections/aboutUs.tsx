import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="Sabout border-2 border-red-300">
      <div className="flex h-full flex-row">
        <div className="w-1/2">
          <Image src="/logo.png" alt="About Us" width={500} height={500} />
        </div>
        <div className="flex w-1/2 flex-col justify-center">
          <h1 className="text-4xl font-bold">Our story</h1>
          <p className="text-lg">
            Six years ago, our founder started Lily Cake from her own kitchen
            table, driven by a simple belief: every celebration deserves a cake
            that&apos;s made with the same love you&apos;d give your own family.
            What began as weekend baking for friends and neighbors has blossomed
            into something magical. We&apos;ve been there for first birthdays
            where tiny hands smash into frosting, golden anniversaries where
            couples cut their cake with the same knife from 50 years ago, and
            graduation parties where proud parents beam with joy. hands smash
            into frosting, golden anniversaries where couples cut their cake
            with the same knife from 50 years ago, and graduation parties where
            proud parents beam with joy.
          </p>
        </div>
      </div>
    </section>
  );
}
