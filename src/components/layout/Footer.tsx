
import Link from 'next/link';
import { Facebook, Instagram, Send, Smartphone, MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-headline font-bold mb-4">Ватерпас</h3>
            <p className="text-base text-primary-foreground/80">
              Ваш надійний партнер у будівництві та ремонті в смт Градизьк. Якісні матеріали та професійні консультації.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Контакти</h4>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-3">
                <MapPin size={20} />
                <span>вул. Київська, смт Градизьк</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} />
                <a href="tel:+380000000000" className="hover:underline text-primary-foreground/80 hover:text-primary-foreground">+38 (000) 000-00-00</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} />
                <span>Пн-Пт: 8:00-19:00, Сб: 9:00-17:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Ми в соцмережах</h4>
            <div className="flex space-x-4">
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 transition-transform">
                <Send size={28} />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Viber" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 transition-transform">
                <Smartphone size={28} />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 transition-transform">
                <Instagram size={28} />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 transition-transform">
                <Facebook size={28} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/20 pt-8 text-center text-base text-primary-foreground/80">
          <p>&copy; {currentYear} Ватерпас. Всі права захищено.</p>
        </div>
      </div>
    </footer>
  );
}
