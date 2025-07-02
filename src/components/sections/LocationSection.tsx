import { MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LocationSection() {
  return (
    <section id="contact" className="bg-background">
      <div className="container">
        <h2 className="text-4xl font-extrabold font-headline text-center mb-16">
          Завітайте до нас
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Card className="shadow-xl rounded-xl p-4 sm:p-6 bg-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline">Наша адреса та контакти</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xl">Адреса:</h4>
                  <p className="text-muted-foreground">вулиця Київська, смт Градизьк, Полтавська обл., Україна</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xl">Телефон:</h4>
                  <a href="tel:+380123456789" className="text-muted-foreground hover:text-primary transition-colors">
                    +38 (012) 345-67-89
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-10 w-10 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xl">Графік роботи:</h4>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Сб: 10:00 - 16:00</p>
                  <p className="text-muted-foreground">Нд: вихідний</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10452.128292839958!2d33.135177000000005!3d49.2444812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d7367df0e87263%3A0xcc073c49e2f228fb!2z0JLQsNGC0LXRgNGA0LDRgdCw!5e0!3m2!1sen!2sua!4v1689263435887!5m2!1sen!2sua"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта розташування магазину Ватерпас"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
