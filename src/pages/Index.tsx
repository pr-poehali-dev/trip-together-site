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
        title: 'Document uploaded',
        description: `${file.name} successfully added`,
      });
    }
  };

  const programs = [
    {
      title: 'European Capitals',
      duration: '14 days',
      price: '$1,200',
      description: 'Visit Paris, Berlin, Prague with educational program',
      image: 'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/71d3a957-e18d-47f7-8940-6a100a57403c.jpg',
      features: ['Lectures', 'Excursions', 'Accommodation', 'Meals'],
    },
    {
      title: 'Oxford Summer School',
      duration: '21 days',
      price: '$2,000',
      description: 'Intensive learning at one of the world\'s best universities',
      image: 'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/3fa02154-f5d5-4bed-b629-3d6d0db2eeda.jpg',
      features: ['Courses', 'Certificate', 'Accommodation', 'Mentorship'],
    },
    {
      title: 'Cultural Exchange in Spain',
      duration: '10 days',
      price: '$900',
      description: 'Study Spanish language and culture in Barcelona and Madrid',
      image: 'https://cdn.poehali.dev/projects/a5b6483e-84dc-45f3-8f74-ac01941e04be/files/7ab14690-2f1c-4e79-bee2-cc9899d8d5e2.jpg',
      features: ['Language Courses', 'Excursions', 'Accommodation', 'Activities'],
    },
  ];

  const testimonials = [
    {
      name: 'Anna Sokolova',
      university: 'MSU, 3rd year',
      text: 'The Oxford trip completely changed my perspective on education. Amazing experience!',
      rating: 5,
    },
    {
      name: 'Dmitry Petrov',
      university: 'SPbSU, 2nd year',
      text: 'Perfectly organized program, everything thought through. Will definitely go again.',
      rating: 5,
    },
    {
      name: 'Maria Ivanova',
      university: 'HSE, 4th year',
      text: 'Trip Together helped with visa and all documents. Very grateful for the support!',
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
                  {section === 'home' && 'Home'}
                  {section === 'programs' && 'Programs'}
                  {section === 'gallery' && 'Gallery'}
                  {section === 'testimonials' && 'Testimonials'}
                  {section === 'about' && 'About'}
                  {section === 'documents' && 'Documents'}
                  {section === 'contact' && 'Contact'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4 animate-fade-in">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Educational Travel
            <br />
            for Students
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover a world of new knowledge and experiences. We organize educational trips with full support
          </p>
          <Button onClick={() => scrollToSection('programs')} size="lg" className="text-lg px-8">
            Choose Program
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="programs" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Our Programs</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Carefully designed educational routes with trusted partners
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
                      Learn More
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
          <h2 className="text-4xl font-bold text-center mb-4">Gallery</h2>
          <p className="text-center text-muted-foreground mb-12">
            Moments from our journeys
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
          <h2 className="text-4xl font-bold text-center mb-4">Student Testimonials</h2>
          <p className="text-center text-muted-foreground mb-12">
            What our participants say
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.university}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{testimonial.text}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">About Us</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Trip Together has been organizing educational trips for students since 2015
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <Icon name="Users" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle>500+ Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Students from all over the country trust our programs
                </p>
              </CardContent>
            </Card>
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <Icon name="Globe" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle>15 Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Educational routes across Europe and beyond
                </p>
              </CardContent>
            </Card>
            <Card className="text-center animate-fade-in">
              <CardHeader>
                <Icon name="Shield" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle>Full Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Assistance with documents, visa, and 24/7 support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="documents" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">Upload Documents</h2>
          <p className="text-center text-muted-foreground mb-12">
            Upload the necessary documents for your trip
          </p>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Upload copies of your documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: 'passport', label: 'Passport', icon: 'FileText' },
                { id: 'visa', label: 'Visa', icon: 'FileCheck' },
                { id: 'insurance', label: 'Insurance', icon: 'ShieldCheck' },
              ].map((doc) => (
                <div key={doc.id} className="space-y-2">
                  <Label htmlFor={doc.id} className="flex items-center gap-2">
                    <Icon name={doc.icon as any} size={20} className="text-primary" />
                    {doc.label}
                  </Label>
                  <Input
                    id={doc.id}
                    type="file"
                    onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {uploadedDocs[doc.id] && (
                    <p className="text-sm text-primary flex items-center gap-2">
                      <Icon name="CheckCircle" size={16} />
                      {uploadedDocs[doc.id]?.name}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center text-muted-foreground mb-12">
            Have questions? We're here to help
          </p>
          <Card className="animate-fade-in">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your question..." rows={5} />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                  <Icon name="Send" size={16} className="ml-2" />
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>info@triptogether.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>Moscow, Tverskaya St., 10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-muted/50 py-8 px-4 mt-20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Trip Together. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
