import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-bakery-primary text-bakery-background flex flex-col items-center justify-between pt-4">
      <div className="mb-2 flex space-x-8 p-2">
        <div className="mb-1 font-semibold">Social Media</div>
        <div className="flex space-x-4">
          <Link
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/instagram-icon.svg"
              alt="Instagram Icon"
              width={25}
              height={25}
            />
          </Link>
          <Link
            href="https://tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Image
              src="/tiktok-icon.svg"
              alt="TikTok Icon"
              width={25}
              height={25}
            />
          </Link>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <Image
              src="/whatsapp-icon.svg"
              alt="WhatsApp Icon"
              width={25}
              height={25}
            />
          </a>
        </div>
      </div>
      <div className="text-sm">&copy; 2025 Lily App. All rights reserved.</div>
    </footer>
  );
}
