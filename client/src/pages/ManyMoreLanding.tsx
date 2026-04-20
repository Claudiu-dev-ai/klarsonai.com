/*
 * Many More Industries Landing Page
 * 
 * Características:
 * - Múltiples industrias en una sola página
 * - Casos de estudio variados
 * - ROI comparativo entre sectores
 * - CTA enfocado en demostración
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Shield, Truck, MessageSquare, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ManyMoreLanding() {
  const { t, locale } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "AI Receptionist for Every Industry",
      subtitle: "From legal services to education, logistics to insurance—Klarson adapts to any business model. Transform your customer communications today.",
      hero_cta: "Book Demo",
      
      industries: [
        {
          icon: Briefcase,
          title: "Legal Services",
          description: "Manage client appointments, consultation scheduling, and case follow-ups with professional AI. Never miss a deadline or client call.",
          benefits: ["Appointment scheduling", "Client intake forms", "Case status updates", "Document reminders"]
        },
        {
          icon: Truck,
          title: "Logistics & Shipping",
          description: "Real-time delivery tracking, customer inquiries, and shipment notifications. Keep customers informed automatically.",
          benefits: ["Delivery tracking", "Shipment notifications", "Route inquiries", "Proof of delivery"]
        },
        {
          icon: GraduationCap,
          title: "Education",
          description: "Enrollment inquiries, class scheduling, parent communications, and student support. Streamline administrative workflows.",
          benefits: ["Enrollment management", "Class scheduling", "Parent notifications", "Student support"]
        },
        {
          icon: Shield,
          title: "Insurance",
          description: "Claims processing, policy inquiries, renewal reminders, and customer support. Reduce claim processing time by 50%.",
          benefits: ["Claims processing", "Policy inquiries", "Renewal reminders", "Customer support"]
        },
        {
          icon: MessageSquare,
          title: "Telecommunications",
          description: "Billing inquiries, service requests, technical support, and account management. Handle high call volumes effortlessly.",
          benefits: ["Billing support", "Service requests", "Technical support", "Account management"]
        },
        {
          icon: TrendingUp,
          title: "Real Estate Services",
          description: "Property inquiries, showing scheduling, mortgage pre-qualification, and follow-up automation.",
          benefits: ["Property inquiries", "Showing scheduling", "Pre-qualification", "Follow-up automation"]
        }
      ],

      caseStudies: [
        {
          industry: "Legal Services",
          name: "Attorney Sarah Johnson",
          company: "Johnson & Associates Law Firm",
          quote: "Managing client calls was chaos. Now Klarson handles scheduling, reminders, and initial intake. My team focuses on actual legal work. Productivity up 35%.",
          result: "+35% team productivity",
        },
        {
          industry: "Logistics",
          name: "Operations Manager David Chen",
          company: "FastShip Logistics",
          quote: "Customers call constantly for tracking updates. Klarson provides real-time tracking info automatically. Customer satisfaction improved 28%.",
          result: "+28% customer satisfaction",
        },
        {
          industry: "Education",
          name: "Admissions Director Maria López",
          company: "Universidad Global",
          quote: "Enrollment season was overwhelming. Klarson now handles 80% of inquiries. Applications increased 45% without hiring more staff.",
          result: "+45% applications",
        },
        {
          industry: "Insurance",
          name: "Claims Manager Robert Wilson",
          company: "SafeGuard Insurance",
          quote: "Claims processing took weeks. Now initial assessment happens in minutes via AI. Claims resolved 40% faster. Customers love the speed.",
          result: "-40% processing time",
        },
        {
          industry: "Telecommunications",
          name: "Customer Service Director Lisa Wong",
          company: "ConnectTel Communications",
          quote: "High call volume was killing us. Klarson handles 70% of billing and technical support calls. We reduced wait times from 15 min to 2 min.",
          result: "-87% wait time",
        },
        {
          industry: "Real Estate",
          name: "Broker Manager James Thompson",
          company: "Elite Properties Group",
          quote: "Property inquiries never stopped. Klarson qualifies buyers and schedules showings. Our closing rate increased 19% with better-qualified leads.",
          result: "+19% closing rate",
        }
      ],

      roi: {
        title: "Cross-Industry ROI Metrics",
        metrics: [
          { value: "65%", label: "Average call automation" },
          { value: "32%", label: "Average productivity gain" },
          { value: "€25k", label: "Average monthly savings" },
          { value: "4.8/5", label: "Customer satisfaction" }
        ]
      },

      features: [
        "Industry-specific AI training and customization",
        "Multi-language support (20+ languages)",
        "Integration with 100+ business software platforms",
        "HIPAA, GDPR, and SOC2 compliance",
        "Real-time analytics and reporting",
        "Custom workflows for unique business processes",
        "Dedicated account management",
        "24/7 technical support"
      ],

      pricing_note: "Custom pricing based on your industry and call volume. Get a personalized quote during your demo.",
      final_cta: "Discover Your Industry Solution"
    },
    es: {
      title: "Recepcionista con IA para cualquier sector",
      subtitle: "Desde servicios legales hasta logística, educación o seguros. Klarson se adapta a las necesidades de tu negocio.",
      hero_cta: "Reservar demo",
      
      industries: [
        {
          icon: Briefcase,
          title: "Servicios legales",
          description: "Automatiza la captación de clientes, la agenda de citas y las consultas de casos.",
          benefits: ["Captación de clientes", "Agenda de citas", "Consultas de casos", "Seguimiento automático"]
        },
        {
          icon: Truck,
          title: "Logística y transporte",
          description: "Gestiona consultas sobre envíos, planificación de entregas y atención al cliente.",
          benefits: ["Consultas de envíos", "Planificación de entregas", "Atención al cliente", "Seguimiento en tiempo real"]
        },
        {
          icon: GraduationCap,
          title: "Educación",
          description: "Administra consultas de estudiantes, matrículas y programación de citas.",
          benefits: ["Consultas de estudiantes", "Gestión de matrículas", "Programación de citas", "Soporte administrativo"]
        },
        {
          icon: Shield,
          title: "Seguros",
          description: "Automatiza consultas de pólizas, soporte de siniestros y atención al cliente.",
          benefits: ["Consultas de pólizas", "Soporte de siniestros", "Atención al cliente", "Renovaciones automáticas"]
        },
        {
          icon: MessageSquare,
          title: "Telecomunicaciones",
          description: "Gestiona consultas de servicios, facturación y soporte técnico.",
          benefits: ["Consultas de servicios", "Facturación", "Soporte técnico", "Gestión de cuentas"]
        },
        {
          icon: TrendingUp,
          title: "Servicios inmobiliarios",
          description: "Atiende consultas sobre propiedades y gestiona visitas.",
          benefits: ["Consultas de propiedades", "Gestión de visitas", "Cualificación de compradores", "Seguimiento automático"]
        }
      ],

      caseStudies: [
        {
          industry: "Servicios Legales",
          name: "Thomas Anderson",
          company: "Anderson Legal Group",
          quote: "«La IA gestiona a la perfección la captación inicial de clientes. Nuestros paralegales se centran en el trabajo legal real».",
          result: "+50 % en capacidad de admisión de clientes",
        },
        {
          industry: "Logística",
          name: "Patricia Chen",
          company: "LogisticsPro Solutions",
          quote: "«Los clientes reciben actualizaciones de envíos y programación de entregas al instante. La satisfacción aumentó de forma notable».",
          result: "+45 % en satisfacción del cliente",
        },
        {
          industry: "Educación",
          name: "Profesor David Wilson",
          company: "Tech Institute",
          quote: "«Las consultas de los estudiantes se gestionan al momento. Nuestro equipo de admisiones se centra en interacciones de alto valor».",
          result: "+30 % en tasa de matriculación",
        },
        {
          industry: "Seguros",
          name: "Gerente de Reclamaciones Robert Wilson",
          company: "Seguros SafeGuard",
          quote: "El procesamiento de reclamaciones tomaba semanas. Ahora la evaluación inicial ocurre en minutos vía IA. Reclamaciones resueltas 40% más rápido.",
          result: "-40% tiempo de procesamiento",
        },
        {
          industry: "Telecomunicaciones",
          name: "Directora de Atención al Cliente Lisa Wong",
          company: "Comunicaciones ConnectTel",
          quote: "El alto volumen de llamadas nos estaba matando. Klarson maneja 70% de facturación y soporte técnico. Tiempos de espera reducidos de 15 min a 2 min.",
          result: "-87% tiempo de espera",
        },
        {
          industry: "Inmobiliario",
          name: "Gerente de Broker James Thompson",
          company: "Grupo Elite Properties",
          quote: "Las consultas de propiedades nunca paraban. Klarson califica compradores y programa visitas. Nuestra tasa de cierre aumentó 19%.",
          result: "+19% tasa de cierre",
        }
      ],

      roi: {
        title: "Métricas de ROI",
        metrics: [
          { value: "50 %", label: "Incremento en la gestión de consultas" },
          { value: "45 %", label: "Mejora en la satisfacción del cliente" },
          { value: "5.000 €", label: "Ahorro operativo medio mensual" },
          { value: "4x", label: "Aumento de capacidad en distintos sectores" }
        ]
      },

      features: [
        "Entrenamiento de IA específico por sector",
        "Automatización de flujos de trabajo personalizados",
        "Enrutamiento de llamadas entre múltiples departamentos",
        "Analítica avanzada e informes detallados",
        "Integración vía API con herramientas del sector",
        "Cumplimiento de normativas específicas de cada industria",
        "Soporte especializado por sector"
      ],

        pricing_note: "Tarifas personalizadas según el sector y el volumen de llamadas. Contacta con ventas para más información.",
      final_cta: "Empieza tu demo gratuita"
    },
    ro: {
      title: "Recepționist AI pentru orice industrie",
      subtitle: "De la servicii juridice la logistică, educație sau asigurări. Klarson se adaptează nevoilor afacerii tale.",
      hero_cta: "Programează demo-ul",
      
      industries: [
        {
          icon: Briefcase,
          title: "Servicii juridice",
          description: "Automatizarea preluării clienților, programărilor și solicitărilor de caz.",
          benefits: ["Preluare clienți", "Programări", "Solicitări de caz", "Urmărire automată"]
        },
        {
          icon: Truck,
          title: "Logistică și transport",
          description: "Gestionarea solicitărilor de livrare, programarea transporturilor și suport clienți.",
          benefits: ["Solicitări de livrare", "Programare transporturi", "Suport clienți", "Urmărire în timp real"]
        },
        {
          icon: GraduationCap,
          title: "Educație",
          description: "Administrarea solicitărilor studenților, înscrierilor și programărilor.",
          benefits: ["Solicitări studenți", "Gestionare înscrieri", "Programări", "Suport administrativ"]
        },
        {
          icon: Shield,
          title: "Asigurări",
          description: "Automatizarea întrebărilor despre polițe, suportului pentru daune și relații cu clienții.",
          benefits: ["Întrebări despre polițe", "Suport pentru daune", "Relații cu clienții", "Reînnoiri automate"]
        },
        {
          icon: MessageSquare,
          title: "Telecomunicații",
          description: "Gestionarea solicitărilor de servicii, facturare și suport tehnic.",
          benefits: ["Solicitări de servicii", "Facturare", "Suport tehnic", "Gestionare conturi"]
        },
        {
          icon: TrendingUp,
          title: "Servicii imobiliare",
          description: "Gestionarea solicitărilor despre proprietăți și programarea vizionărilor.",
          benefits: ["Solicitări despre proprietăți", "Programare vizionări", "Calificare cumpărători", "Urmărire automată"]
        }
      ],

      caseStudies: [
        {
          industry: "Servicii Juridice",
          name: "Thomas Anderson",
          company: "Anderson Legal Group",
          quote: "«IA gestionează perfect preluarea inițială a clienților. Paralegalii noștri se concentrează pe munca juridică propriu-zisă».",
          result: "+50 % capacitate de intake clienți",
        },
        {
          industry: "Logistică",
          name: "Patricia Chen",
          company: "LogisticsPro Solutions",
          quote: "«Clienții primesc instant actualizări despre livrări și programări. Satisfacția a crescut semnificativ».",
          result: "+45 % satisfacție clienți",
        },
        {
          industry: "Educație",
          name: "Profesor David Wilson",
          company: "Tech Institute",
          quote: "«Solicitările studenților sunt gestionate imediat. Echipa de admitere se concentrează pe interacțiuni cu valoare ridicată».",
          result: "+30 % rată de înscriere",
        },
        {
          industry: "Asigurări",
          name: "Manager Reclamații Robert Wilson",
          company: "Asigurări SafeGuard",
          quote: "Procesarea reclamații dura săptămâni. Acum evaluarea inițială se întâmplă în minute via IA. Reclamații rezolvate 40% mai rapid.",
          result: "-40% timp procesare",
        },
        {
          industry: "Telecomunicații",
          name: "Director Suport Client Lisa Wong",
          company: "Comunicații ConnectTel",
          quote: "Volumul mare de apeluri ne ucidea. Klarson gestionează 70% din facturare și suport tehnic. Timp așteptare redus de la 15 min la 2 min.",
          result: "-87% timp așteptare",
        },
        {
          industry: "Imobiliare",
          name: "Manager Broker James Thompson",
          company: "Grup Elite Properties",
          quote: "Întrebări proprietăți nu se opreau niciodată. Klarson califică cumpărători și planifică vizite. Rata închidere crescută 19%.",
          result: "+19% rata închidere",
        }
      ],

      roi: {
        title: "Indicatori ROI",
        metrics: [
          { value: "50 %", label: "Creștere în gestionarea solicitărilor" },
          { value: "45 %", label: "Îmbunătățire a satisfacției clienților" },
          { value: "5.000 €", label: "Economie operațională medie lunară" },
          { value: "4x", label: "Creștere a capacității în diverse industrii" }
        ]
      },

      features: [
        "Training AI specific industriei",
        "Automatizare fluxuri de lucru personalizate",
        "Rutare apeluri către mai multe departamente",
        "Analitică avansată și rapoarte detaliate",
        "Integrare API cu instrumente din industrie",
        "Conformitate cu reglementarile specifice fiecărui sector",
        "Suport dedicat pe industrie"
      ],

      pricing_note: "Prețuri personalizate în funcție de industrie și volumul de apeluri. Contactează echipa de vânzări pentru detalii.",
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
              src="/images/industry-many-more-hero.jpg" 
              alt="Multiple Industries"
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

        {/* Industries Grid */}
        <section className="py-20 lg:py-32">
          <div className="container">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
              Industries We Serve
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentContent.industries.map((industry, index) => {
                const Icon = industry.icon;
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
                    <h3 className="text-lg font-semibold mb-2">{industry.title}</h3>
                    <p className="text-muted-foreground mb-4">{industry.description}</p>
                    
                    <div className="space-y-2">
                      {industry.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
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
              Success Stories Across Industries
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentContent.caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl border border-border/40 bg-background"
                >
                  <p className="text-sm text-primary font-semibold mb-2">{study.industry}</p>
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
              Enterprise Features
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
                Ready to Transform Your Industry?
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
