import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: File | null }>({
    passport: null,
    visa: null,
    insurance: null,
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleFileUpload = (docType: string, file: File | null) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: file }));
    if (file) {
      toast({
        title: 'Документ загружен',
        description: `${file.name} успешно добавлен`,
      });
    }
  };

  const programs = [
    {
      title: 'Европейские столицы',
      duration: '14 дней',
      price: '89 000 ₽',
      description: 'Посещение Парижа, Берлина, Праги с образовательной программой',
      image: 'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/71d3a957-e18d-47f7-8940-6a100a57403c.jpg',
      features: ['Лекции', 'Экскурсии', 'Проживание', 'Питание'],
    },
    {
      title: 'Летняя школа в Оксфорде',
      duration: '21 день',
      price: '145 000 ₽',
      description: 'Интенсивное обучение в одном из лучших университетов мира',
      image: 'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/3fa02154-f5d5-4bed-b629-3d6d0db2eeda.jpg',
      features: ['Курсы', 'Сертификат', 'Проживание', 'Менторство'],
    },
    {
      title: 'Культурный обмен в Испании',
      duration: '10 дней',
      price: '65 000 ₽',
      description: 'Изучение испанского языка и культуры в Барселоне и Мадриде',
      image: 'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/7ab14690-2f1c-4e79-bee2-cc9899d8d5e2.jpg',
      features: ['Языковые курсы', 'Экскурсии', 'Проживание', 'Активности'],
    },
  ];

  const testimonials = [
    {
      name: 'Анна Соколова',
      university: 'МГУ, 3 курс',
      text: 'Поездка в Оксфорд полностью изменила мое представление об образовании. Невероятный опыт!',
      rating: 5,
    },
    {
      name: 'Дмитрий Петров',
      university: 'СПбГУ, 2 курс',
      text: 'Отлично организованная программа, все продумано до мелочей. Обязательно поеду еще раз.',
      rating: 5,
    },
    {
      name: 'Мария Иванова',
      university: 'ВШЭ, 4 курс',
      text: 'Trip Together помогли с визой и всеми документами. Очень благодарна за поддержку!',
      rating: 5,
    },
  ];

  const gallery = [
    'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/71d3a957-e18d-47f7-8940-6a100a57403c.jpg',
    'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/3fa02154-f5d5-4bed-b629-3d6d0db2eeda.jpg',
    'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/7ab14690-2f1c-4e79-bee2-cc9899d8d5e2.jpg',
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Trip Together</h1>
            <div className="hidden md:flex gap-6">
              {['home', 'programs', 'gallery', 'testimonials', 'about', 'documents', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/60'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'programs' && 'Программы'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'testimonials' && 'Отзывы'}
                  {section === 'about' && 'О нас'}
                  {section === 'documents' && 'Документы'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4 animate-fade-in">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Образовательные поездки
            <br />
            для студентов
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Откройте мир новых знаний и впечатлений. Организуем учебные поездки с полным сопровождением
          </p>
          <Button onClick={() => scrollToSection('programs')} size="lg" className="text-lg px-8">
            Выбрать программу
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="programs" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Наши программы</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Тщательно разработанные образовательные маршруты с проверенными партнерами
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in">
                <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <Badge variant="secondary">{program.duration}</Badge>
                  </div>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{program.price}</span>
                    <Button onClick={() => scrollToSection('contact')}>
                      Узнать больше
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Галерея</h2>
          <p className="text-center text-muted-foreground mb-12">
            Моменты из наших путешествий
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg animate-fade-in hover:scale-105 transition-transform">
                <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Отзывы студентов</h2>
          <p className="text-center text-muted-foreground mb-12">
            Что говорят наши участники
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.university}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8">О нас</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <Icon name="Users" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Опытная команда</h3>
                      <p className="text-muted-foreground">
                        Более 7 лет организуем образовательные поездки для студентов
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Shield" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Безопасность</h3>
                      <p className="text-muted-foreground">
                        Полное страхование и сопровождение на всех этапах путешествия
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <Icon name="GraduationCap" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Образование</h3>
                      <p className="text-muted-foreground">
                        Партнерство с ведущими университетами Европы и мира
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Award" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Качество</h3>
                      <p className="text-muted-foreground">
                        Сертифицированные программы с официальными дипломами
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="documents" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Загрузка документов</h2>
          <p className="text-center text-muted-foreground mb-12">
            Загрузите необходимые документы для оформления поездки
          </p>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  { type: 'passport', label: 'Паспорт', icon: 'FileText' },
                  { type: 'visa', label: 'Виза (если есть)', icon: 'Stamp' },
                  { type: 'insurance', label: 'Страховка', icon: 'ShieldCheck' },
                ].map((doc) => (
                  <div key={doc.type} className="space-y-2">
                    <Label htmlFor={doc.type} className="flex items-center gap-2">
                      <Icon name={doc.icon as any} size={18} className="text-primary" />
                      {doc.label}
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id={doc.type}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(doc.type, e.target.files?.[0] || null)}
                        className="flex-1"
                      />
                      {uploadedDocs[doc.type] && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Icon name="Check" size={14} />
                          Загружено
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4" size="lg">
                  <Icon name="Upload" size={18} className="mr-2" />
                  Отправить документы
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Свяжитесь с нами</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Отправить заявку</CardTitle>
                <CardDescription>Мы ответим в течение 24 часов</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" placeholder="Расскажите о своих пожеланиях" rows={4} />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Адрес</h3>
                      <p className="text-muted-foreground">Москва, ул. Тверская, 15</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@triptogether.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Trip Together. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
