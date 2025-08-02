import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="text-bakery-primary flex flex-col items-center justify-between pt-4 shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)]">
      <div className="mb-2 flex space-x-8 p-2">
        <div className="mb-1 font-semibold">Social Media</div>
        <div className="flex space-x-4">
          <Link
            href="https://www.instagram.com/lilycake.2/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram-icon.svg"
              alt="Instagram Icon"
              width={25}
              height={25}
              className="h-6 w-6"
            />
          </Link>
          <Link
            href="https://www.tiktok.com/@lilycake2?_t=ZN-8yUvC59XlGI&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Image
              src="/icons/tiktok-icon.svg"
              alt="TikTok Icon"
              width={25}
              height={25}
              className="h-6 w-6"
            />
          </Link>
          <a
            href="https://wa.me/+966558194872?text=Hi%20Lily%20Cake!%20I%20would%20like%20to%20order%20a%20cake."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <Image
              src="/icons/whatsapp-icon.svg"
              alt="WhatsApp Icon"
              width={25}
              height={25}
              className="h-6 w-6"
            />
          </a>
        </div>
      </div>
      <div className="text-sm">&copy; 2025 Lily App. All rights reserved.</div>
    </footer>
  );
}
