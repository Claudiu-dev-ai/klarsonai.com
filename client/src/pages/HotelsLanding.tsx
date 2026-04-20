/*
 * Hotels & Restaurants Landing Page
 * 
 * Características:
 * - Mensajería personalizada para hoteles y restaurantes
 * - Casos de estudio relevantes del sector
 * - ROI específico para hospitalidad
 * - CTA enfocado en demostración
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hotel, Users, TrendingUp, Clock, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function HotelsLanding() {
  const { t, locale } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "AI Receptionist for Hotels & Restaurants",
      subtitle: "Never miss a reservation. Automate bookings, handle inquiries, and delight guests 24/7 with intelligent call management.",
      hero_cta: "Book Demo",
      
      benefits: [
        {
          icon: Clock,
          title: "24/7 Reservation Management",
          description: "Accept reservations anytime, even during peak hours or after closing. Never turn away a customer due to phone lines being busy."
        },
        {
          icon: Users,
          title: "Reduce No-Shows",
          description: "Automated confirmation calls reduce no-shows by up to 35%. Keep your tables and rooms full with confirmed reservations."
        },
        {
          icon: TrendingUp,
          title: "Increase Revenue Per Guest",
          description: "AI suggests room upgrades, packages, and dining options during calls. Upsell naturally without aggressive tactics."
        },
        {
          icon: Check,
          title: "Multilingual Guest Support",
          description: "Serve international guests in their preferred language. Handle special requests, dietary restrictions, and preferences automatically."
        }
      ],

      caseStudies: [
        {
          name: "Carlos Martínez",
          company: "Hotel Boutique Barcelona",
          quote: "During summer, we were losing 20+ reservations daily because our team couldn't answer all calls. Now Klarson handles everything. Our occupancy rate jumped from 78% to 92%.",
          result: "+14% occupancy rate",
          specialty: "Boutique Hotel"
        },
        {
          name: "Maria Rossi",
          company: "Ristorante Italia",
          quote: "Dinner service is chaotic—we can't answer phones. Klarson now books our tables, confirms reservations, and handles special requests. Our revenue increased 22%.",
          result: "+22% revenue increase",
          specialty: "Fine Dining Restaurant"
        },
        {
          name: "David Wong",
          company: "Asian Fusion Bistro",
          quote: "We serve 200+ guests daily. Managing reservations manually was impossible. The AI now handles 95% of calls perfectly. Staff focuses on guest experience.",
          result: "95% call handling automation",
          specialty: "Casual Dining"
        }
      ],

      roi: {
        title: "Hospitality Industry ROI",
        metrics: [
          { value: "35%", label: "Reduction in no-shows" },
          { value: "14%", label: "Occupancy rate increase" },
          { value: "22%", label: "Revenue increase" },
          { value: "95%", label: "Call automation rate" }
        ]
      },

      features: [
        "Intelligent reservation booking with calendar integration",
        "Automated confirmation calls to reduce no-shows",
        "Special requests and dietary restriction management",
        "Room upgrade and package upselling",
        "Multi-language support for international guests",
        "Integration with PMS (Property Management Systems)",
        "Event and group booking automation",
        "Guest feedback collection and surveys"
      ],

      pricing_note: "Starting at €285/month. Perfect for hotels and restaurants with 500+ monthly calls.",
      final_cta: "Start Your Free Demo"
    },
    es: {
      title: "Recepcionista con IA para Hoteles y Restaurantes",
      subtitle: "No vuelvas a perder una reserva. Automatiza las reservas, reduce las ausencias y sorprende a tus clientes 24/7.",
      hero_cta: "Reservar demo",
      
      benefits: [
        {
          icon: Clock,
          title: "Reservas disponibles 24/7",
          description: "Los clientes pueden reservar habitaciones y mesas en cualquier momento, incluso a las 3 de la mañana. Aprovecha cada oportunidad de reserva."
        },
        {
          icon: Users,
          title: "Reduce las ausencias",
          description: "Los recordatorios automáticos reducen las ausencias hasta en un 35 %. Mantén una alta ocupación."
        },
        {
          icon: TrendingUp,
          title: "Mejora la experiencia del cliente",
          description: "Respuestas profesionales e inmediatas a cualquier consulta. Los clientes se sienten bien atendidos desde el primer contacto."
        },
        {
          icon: Check,
          title: "Reduce la carga del personal",
          description: "Libera a tu equipo de las llamadas repetitivas de reservas. Pueden centrarse en el servicio y la hospitalidad."
        }
      ],

      caseStudies: [
        {
          name: "Carlos Martínez",
          company: "Hotel Luxe Barcelona",
          quote: "«Perdíamos reservas porque no podíamos atender las llamadas en horas punta. Ahora cada llamada se atiende de forma profesional».",
          result: "+40 % en reservas",
          specialty: "Hotel Boutique"
        },
        {
          name: "Maria Rossi",
          company: "Ristorante Italia",
          quote: "«La hora punta de las cenas es caótica. Ahora la IA gestiona todas las llamadas de reservas mientras nosotros nos centramos en los clientes».",
          result: "Reducción del 50 % en llamadas perdidas",
          specialty: "Restaurante de Lujo"
        },
        {
          name: "David Wong",
          company: "Boutique Inn London",
          quote: "«Los huéspedes valoran la confirmación inmediata. Nuestra tasa de ocupación mejoró de forma notable».",
          result: "+25 % de ocupación media",
          specialty: "Restaurante Casual"
        }
      ],

      roi: {
        title: "Métricas de ROI",
        metrics: [
          { value: "40 %", label: "Más reservas" },
          { value: "35 %", label: "Reducción de ausencias" },
          { value: "20 h", label: "Tiempo de personal ahorrado por semana" },
          { value: "3.200 €", label: "Incremento medio mensual de ingresos" }
        ]
      },

      features: [
        "Gestión inteligente de reservas",
        "Atención multidioma para clientes internacionales",
        "Confirmaciones y recordatorios automáticos por SMS",
        "Gestión de peticiones especiales",
        "Integración con PMS (Property Management Systems)",
        "Gestión de eventos y reservas de grupos",
        "Registro de preferencias de los clientes"
      ],

      pricing_note: "Desde 285 €/mes. Ideal para hoteles y restaurantes con más de 500 llamadas mensuales.",
      final_cta: "Empieza tu demo gratuita"
    },
    ro: {
      title: "Recepționist AI pentru Hoteluri și Restaurante",
      subtitle: "Nu mai pierde nicio rezervare. Automatizează rezervările, redu neprezențările și încântă-ți oaspeții 24/7.",
      hero_cta: "Programează demo-ul",
      
      benefits: [
        {
          icon: Clock,
          title: "Rezervări disponibile 24/7",
          description: "Oaspeții pot rezerva camere și mese oricând, chiar și la ora 3 dimineața. Captează fiecare oportunitate de rezervare."
        },
        {
          icon: Users,
          title: "Reducerea neprezențărilor",
          description: "Mementourile automate reduc neprezențările cu până la 35 %. Menține un grad ridicat de ocupare."
        },
        {
          icon: TrendingUp,
          title: "Îmbunătățirea experienței oaspeților",
          description: "Răspunsuri profesionale și instant la orice solicitare. Oaspeții se simt apreciați încă de la primul contact."
        },
        {
          icon: Check,
          title: "Reducerea presiunii asupra personalului",
          description: "Eliberează echipa de apelurile repetitive pentru rezervări. Aceștia se pot concentra pe servicii și ospitalitate."
        }
      ],

      caseStudies: [
        {
          name: "Carlos Martínez",
          company: "Hotel Luxe Barcelona",
          quote: "«Pierdeam rezervări pentru că nu puteam răspunde apelurilor în orele de vârf. Acum fiecare apel este preluat profesionist».",
          result: "+40 % rezervări",
          specialty: "Hotel Boutique"
        },
        {
          name: "Maria Rossi",
          company: "Ristorante Italia",
          quote: "«Orele de vârf la cină sunt haotice. Acum IA gestionează toate apelurile de rezervări, iar noi ne concentrăm pe servirea oaspeților».",
          result: "Reducere de 50 % a apelurilor pierdute",
          specialty: "Restaurant Fin"
        },
        {
          name: "David Wong",
          company: "Boutique Inn London",
          quote: "«Oaspeții apreciază confirmarea instantă. Gradul nostru de ocupare a crescut semnificativ».",
          result: "+25 % rată medie de ocupare",
          specialty: "Restaurant Casual"
        }
      ],

      roi: {
        title: "Indicatori ROI",
        metrics: [
          { value: "40 %", label: "Mai multe rezervări" },
          { value: "35 %", label: "Reducere a neprezențărilor" },
          { value: "20 h", label: "Timp de personal economisit pe săptămână" },
          { value: "3.200 €", label: "Creștere medie lunară a veniturilor" }
        ]
      },

      features: [
        "Management inteligent al rezervărilor",
        "Suport multilingv pentru oaspeți internaționali",
        "Confirmări și mementouri automate prin SMS",
        "Gestionarea cererilor speciale",
        "Integrare cu PMS (Property Management Systems)",
        "Management rezervări pentru evenimente și grupuri",
        "Monitorizarea preferințelor oaspeților"
      ],

      pricing_note: "De la 285 €/lună. Perfect pentru hoteluri și restaurante cu peste 500 de apeluri lunare.",
      final_cta: "Începe demo-ul gratuit"
    }
  };

  const currentContent = content[locale as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/industry-hotels-hero.jpg" 
              alt="Hotel Restaurant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Hotel className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {currentContent.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                {currentContent.subtitle}
              </p>
              
              <Button size="lg" className="gap-2">
                {currentContent.hero_cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Why Hotels & Restaurants Choose Klarson
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {currentContent.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur"
                  >
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 lg:py-32 bg-card/30">
          <div className="container">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Success Stories from Hospitality Leaders
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {currentContent.caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl border border-border/40 bg-background"
                >
                  <p className="text-sm text-primary font-semibold mb-2">{study.specialty}</p>
                  <p className="text-muted-foreground mb-4 italic">"{study.quote}"</p>
                  
                  <div className="pt-4 border-t border-border/40">
                    <p className="font-semibold">{study.name}</p>
                    <p className="text-sm text-muted-foreground">{study.company}</p>
                    <p className="text-sm font-semibold text-primary mt-2">{study.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              {currentContent.roi.title}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {currentContent.roi.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl border border-border/40 bg-gradient-to-br from-primary/10 to-transparent text-center"
                >
                  <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32 bg-card/30">
          <div className="container">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Features Built for Hospitality
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {currentContent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3"
                  >
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Hospitality Business?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                {currentContent.pricing_note}
              </p>
              
              <Button size="lg" className="gap-2">
                {currentContent.final_cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
