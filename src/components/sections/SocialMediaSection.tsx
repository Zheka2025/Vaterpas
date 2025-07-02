
import Link from 'next/link';
import { Facebook, Instagram, Send, Smartphone } from 'lucide-react';

const socialLinks = [
  { name: 'Telegram', Icon: Send, href: 'https://t.me/example' },
  { name: 'Viber', Icon: Smartphone, href: 'viber://chat?number=%2B380000000000' },
  { name: 'Instagram', Icon: Instagram, href: 'https://instagram.com/example' },
  { name: 'Facebook', Icon: Facebook, href: 'https://facebook.com/example' },
];

export function SocialMediaSection() {
  return (
    <section className="bg-secondary">
      <div className="container text-center">
        <h2 className="text-4xl font-extrabold font-headline mb-12">
          Слідкуйте за нами в соцмережах
        </h2>
        <div className="flex justify-center flex-wrap gap-6 md:gap-8">
          {socialLinks.map(({ name, Icon, href }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ми в ${name}`}
              className="group flex items-center justify-center h-20 w-20 rounded-full bg-background hover:bg-primary transition-all duration-300 transform hover:scale-110"
            >
              <Icon size={40} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
