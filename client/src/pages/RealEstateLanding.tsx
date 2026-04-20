/*
 * Real Estate Landing Page
 * 
 * Características:
 * - Mensajería personalizada para agencias inmobiliarias
 * - Casos de estudio relevantes del sector
 * - ROI específico para bienes raíces
 * - CTA enfocado en demostración
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Zap, Target, DollarSign, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function RealEstateLanding() {
  const { t, locale } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "AI Receptionist for Real Estate Agencies",
      subtitle: "Qualify leads in seconds, not hours. Never miss a buyer again. Close more deals with intelligent call handling.",
      hero_cta: "Book Demo",
      
      benefits: [
        {
          icon: Zap,
          title: "Instant Lead Qualification",
          description: "AI pre-qualifies buyers by budget, timeline, and location in real-time. Focus only on serious prospects."
        },
        {
          icon: Target,
          title: "Capture Every Lead",
          description: "24/7 call answering ensures no opportunity is lost. Even after-hours calls are captured and qualified."
        },
        {
          icon: DollarSign,
          title: "Reduce Wasted Time",
          description: "Stop spending hours calling curious prospects. AI filters out tire-kickers and prioritizes qualified buyers."
        },
        {
          icon: Check,
          title: "Seamless CRM Integration",
          description: "Qualified leads automatically flow into your CRM with full context. Your team gets to work immediately."
        }
      ],

      caseStudies: [
        {
          name: "Michael Ross",
          company: "Ross & Partners Realty",
          quote: "In real estate, a 5-minute delay means a lost deal. Before, we wasted hours calling curious people. Now, the AI pre-qualifies by budget, timeline, and location. It filters the noise perfectly.",
          result: "+45% qualified leads per month",
          specialty: "Luxury Real Estate"
        },
        {
          name: "Sofia García",
          company: "Elite Properties Spain",
          quote: "Our agents were spending 60% of their time on the phone. Now they focus on showings and negotiations. The AI handles the qualification.",
          result: "60% more time for client meetings",
          specialty: "Residential Agency"
        },
        {
          name: "James Chen",
          company: "Urban Properties Group",
          quote: "The system understands buyer intent immediately. We know which calls are worth taking before we even pick up.",
          result: "+38% conversion rate",
          specialty: "Commercial Real Estate"
        }
      ],

      roi: {
        title: "Real Estate Industry ROI",
        metrics: [
          { value: "45%", label: "More qualified leads" },
          { value: "60%", label: "Time saved on calls" },
          { value: "€8,500", label: "Average deal value increase" },
          { value: "38%", label: "Conversion rate improvement" }
        ]
      },

      features: [
        "Intelligent buyer qualification based on budget & timeline",
        "Automatic property recommendation based on buyer preferences",
        "Multi-property portfolio management",
        "Lead scoring and prioritization",
        "CRM integration (Zillow, Realtor.com, MLS)",
        "Appointment scheduling with calendar sync",
        "Follow-up reminders and nurture sequences"
      ],

      pricing_note: "Starting at €285/month. Designed for agencies with 1000+ monthly calls.",
      final_cta: "Start Your Free Demo"
    },
    es: {
      title: "Recepcionista con IA para Agencias Inmobiliarias",
      subtitle: "Cualifica leads en segundos, no en horas. No vuelvas a perder un comprador. Cierra más operaciones con una gestión inteligente de llamadas.",
      hero_cta: "Reservar demo",
      
      benefits: [
        {
          icon: Zap,
          title: "Cualificación instantánea de leads",
          description: "La IA pre-cualifica a los compradores en tiempo real por presupuesto, plazos y ubicación. Céntrate solo en los interesados realmente cualificados."
        },
        {
          icon: Target,
          title: "Captura cada lead",
          description: "Atención telefónica 24/7 para que no se pierda ninguna oportunidad. Incluso las llamadas fuera de horario se capturan y cualifican."
        },
        {
          icon: DollarSign,
          title: "Reduce el tiempo perdido",
          description: "Deja de invertir horas llamando a simples curiosos. La IA filtra a los que no están listos para comprar y prioriza a los compradores cualificados."
        },
        {
          icon: Check,
          title: "Integración total con tu CRM",
          description: "Los leads cualificados entran automáticamente en tu CRM con todo el contexto. Tu equipo puede actuar de inmediato."
        }
      ],

      caseStudies: [
        {
          name: "Michael Ross",
          company: "Ross & Partners Realty",
          quote: "En el sector inmobiliario, un retraso de 5 minutos significa perder una operación. Antes perdíamos horas llamando a curiosos. Ahora la IA pre-cualifica por presupuesto, plazos y ubicación. Filtra el ruido a la perfección.",
          result: "+45% leads calificados por mes",
          specialty: "Bienes Raíces de Lujo"
        },
        {
          name: "Sofia García",
          company: "Elite Properties Spain",
          quote: "Nuestros agentes dedicaban el 60 % de su tiempo al teléfono. Ahora se centran en visitas y negociaciones. La IA se encarga de la cualificación.",
          result: "60% más tiempo para reuniones con clientes",
          specialty: "Agencia Residencial"
        },
        {
          name: "James Chen",
          company: "Urban Properties Group",
          quote: "El sistema entiende la intención del comprador al instante. Sabemos qué llamadas merecen la pena antes incluso de descolgar.",
          result: "+38% tasa de conversión",
          specialty: "Bienes Raíces Comerciales"
        }
      ],

      roi: {
        title: "Métricas de ROI",
        metrics: [
          { value: "45%", label: "Más leads cualificados" },
          { value: "60%", label: "Tiempo ahorrado en llamadas" },
          { value: "8.500 €", label: "Incremento medio del valor por operación" },
          { value: "38%", label: "Mejora en la tasa de conversión" }
        ]
      },

      features: [
        "Cualificación inteligente de compradores por presupuesto y plazos",
        "Recomendación automática de propiedades según preferencias del comprador",
        "Gestión de carteras con múltiples propiedades",
        "Scoring y priorización de leads",
        "Integración con CRM (Zillow, Realtor.com, MLS)",
        "Agenda de citas con sincronización de calendario",
        "Recordatorios de seguimiento y secuencias de nurturing"
      ],

      pricing_note: "Desde 285 €/mes. Diseñado para agencias con más de 1.000 llamadas mensuales.",
      final_cta: "Empieza tu demo gratuita"
    },
    ro: {
      title: "Recepționist AI pentru Agenții Imobiliare",
      subtitle: "Califică leadurile în câteva secunde, nu în ore. Nu mai pierde niciun cumpărător. Închide mai multe tranzacții cu gestionare inteligentă a apelurilor.",
      hero_cta: "Programează demo-ul",
      
      benefits: [
        {
          icon: Zap,
          title: "Calificare instantanee a leadurilor",
          description: "IA pre-califică cumpărătorii în timp real după buget, termen și locație. Concentrează-te doar pe potențialii clienți serioși."
        },
        {
          icon: Target,
          title: "Captează fiecare lead",
          description: "Răspuns la apeluri 24/7 pentru ca nicio oportunitate să nu fie pierdută. Chiar și apelurile în afara programului sunt captate și calificate."
        },
        {
          icon: DollarSign,
          title: "Reducerea timpului pierdut",
          description: "Nu mai pierde ore sunând persoane doar curioase. IA filtrează leadurile necalificate și prioritizează cumpărătorii relevanți."
        },
        {
          icon: Check,
          title: "Integrare completă cu CRM-ul tău",
          description: "Leadurile calificate ajung automat în CRM cu tot contextul necesar. Echipa ta poate acționa imediat."
        }
      ],

      caseStudies: [
        {
          name: "Michael Ross",
          company: "Ross & Partners Realty",
          quote: "În imobiliare, o întârziere de 5 minute înseamnă o tranzacție pierdută. Înainte pierdeam ore sunând persoane curioase. Acum, IA pre-califică după buget, termen și locație. Elimină perfect zgomotul.",
          result: "+45% leads calificați pe lună",
          specialty: "Imobiliare de Lux"
        },
        {
          name: "Sofia García",
          company: "Elite Properties Spain",
          quote: "Agenții noștri petreceau 60 % din timp la telefon. Acum se concentrează pe vizionări și negocieri. IA se ocupă de calificare.",
          result: "60% mai mult timp pentru întâlniri cu clienți",
          specialty: "Agenție Rezidențială"
        },
        {
          name: "James Chen",
          company: "Urban Properties Group",
          quote: "Sistemul înțelege instant intenția cumpărătorului. Știm ce apeluri merită preluate înainte chiar să răspundem.",
          result: "+38% rata de conversie",
          specialty: "Imobiliare Comercială"
        }
      ],

      roi: {
        title: "Indicatori ROI",
        metrics: [
          { value: "45%", label: "Mai multe leaduri calificate" },
          { value: "60%", label: "Timp economisit la apeluri" },
          { value: "8.500 €", label: "Creștere medie a valorii tranzacțiilor" },
          { value: "38%", label: "Îmbunătățire a ratei de conversie" }
        ]
      },

      features: [
        "Calificare inteligentă a cumpărătorilor după buget și termen",
        "Recomandare automată de proprietăți în funcție de preferințe",
        "Management portofoliu cu mai multe proprietăți",
        "Scoring și prioritizare leaduri",
        "Integrare CRM (Zillow, Realtor.com, MLS)",
        "Programări cu sincronizare de calendar",
        "Mementouri de follow-up și secvențe de nurturing"
      ],

      pricing_note: "De la 285 €/lună. Creat pentru agenții cu peste 1.000 de apeluri lunare.",
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
              src="/images/industry-realestate-hero.jpg" 
              alt="Real Estate Office"
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
                  <Building2 className="h-8 w-8 text-primary" />
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
              Why Real Estate Professionals Choose Klarson
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
              Success Stories from Real Estate Professionals
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
              Features Built for Real Estate
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
                Ready to Close More Deals?
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
