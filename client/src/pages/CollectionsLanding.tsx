/*
 * Collection Agencies Landing Page
 * 
 * Características:
 * - Mensajería personalizada para agencias de cobranza
 * - Casos de estudio relevantes del sector
 * - ROI específico para cobranza
 * - CTA enfocado en demostración
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Clock, CheckCircle, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function CollectionsLanding() {
  const { t, locale } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "AI Receptionist for Collection Agencies",
      subtitle: "Automate payment reminders, negotiate payment plans, and increase recovery rates with intelligent voice conversations.",
      hero_cta: "Book Demo",
      
      benefits: [
        {
          icon: TrendingUp,
          title: "Increase Recovery Rates",
          description: "AI-powered conversations increase payment commitment rates by up to 40%. Professional, compliant interactions that encourage payment."
        },
        {
          icon: Clock,
          title: "24/7 Automated Outreach",
          description: "Reach debtors at optimal times without hiring night shift staff. Automated reminders and payment plan negotiations work around the clock."
        },
        {
          icon: Zap,
          title: "Reduce Operational Costs",
          description: "Handle 10x more accounts with the same team. AI manages routine calls while agents focus on complex negotiations and high-value cases."
        },
        {
          icon: CheckCircle,
          title: "Ensure Compliance",
          description: "Built-in FDCPA compliance rules prevent violations. Automatic documentation of all interactions for audit trails and legal protection."
        }
      ],

      caseStudies: [
        {
          name: "Roberto García",
          company: "RecoverPlus Solutions",
          quote: "We increased our recovery rate from 25% to 40% in just 3 months. The AI prioritizes high-value accounts.",
          result: "+40% recovery rate",
          specialty: "Collection Agency"
        },
        {
          name: "Jennifer Lee",
          company: "Debt Recovery Solutions",
          quote: "The AI negotiates payment plans professionally. Debtors prefer talking to the system first—it's less confrontational. Our compliance violations dropped to zero.",
          result: "Zero compliance violations",
          specialty: "Debt Recovery"
        },
        {
          name: "Miguel Santos",
          company: "Santos Financial Recovery",
          quote: "Compliance is automatic. We spend less time on documentation and more on recovering debt.",
          result: "€40k/month savings",
          specialty: "Credit Management"
        }
      ],

      roi: {
        title: "Collection Industry ROI",
        metrics: [
          { value: "40%", label: "Increase recovery rates" },
          { value: "70%", label: "Call automation rate" },
          { value: "€40k", label: "Monthly cost savings" },
          { value: "100%", label: "Compliance rate" }
        ]
      },

      features: [
        "FDCPA-compliant automated payment reminders",
        "Intelligent payment plan negotiation",
        "Debtor verification and authentication",
        "Automated call recording and documentation",
        "Integration with collection software and CRM",
        "Multi-language support for diverse debtor base",
        "Escalation to human agents for complex cases",
        "Real-time compliance monitoring and alerts"
      ],

      pricing_note: "Starting at €285/month. Perfect for collection agencies with 1000+ monthly calls.",
      final_cta: "Start Your Free Demo"
    },
    es: {
      title: "Recepcionista con IA para Agencias de Cobro",
      subtitle: "Recupera más deuda con una gestión inteligente de llamadas. Automatiza el contacto, mejora las tasas de recobro y escala tus operaciones.",
      hero_cta: "Reservar demo",
      
      benefits: [
        {
          icon: TrendingUp,
          title: "Aumenta las tasas de recobro",
          description: "La IA identifica a los deudores con mayor intención de pago y prioriza las llamadas. Recupera más con menos intentos."
        },
        {
          icon: Clock,
          title: "Automatiza el contacto",
          description: "Llamadas y mensajes automatizados 24/7. Contacta con los deudores cuando es más probable que respondan."
        },
        {
          icon: Zap,
          title: "Reduce los costes operativos",
          description: "Gestiona hasta 5 veces más expedientes con el mismo equipo. La IA se encarga de las llamadas rutinarias y los agentes se centran en la negociación."
        },
        {
          icon: CheckCircle,
          title: "Cumplimiento normativo y documentación",
          description: "Todas las llamadas se graban y documentan automáticamente. Cumplimiento total con la FDCPA y la normativa local."
        }
      ],

      caseStudies: [
        {
          name: "Roberto García",
          company: "RecoverPlus Solutions",
          quote: "«Aumentamos nuestra tasa de recobro del 25 % al 40 % en solo 3 meses. La IA prioriza las cuentas de mayor valor».",
          result: "+40 % en tasa de recobro",
          specialty: "Agencia de Cobranza"
        },
        {
          name: "Jennifer Lee",
          company: "Debt Recovery Solutions",
          quote: "«El sistema gestiona el primer contacto y la cualificación. Nuestros agentes se centran en la negociación y el cierre».",
          result: "70 % de automatización de llamadas rutinarias",
          specialty: "Recuperación de Deuda"
        },
        {
          name: "Miguel Santos",
          company: "Santos Financial Recovery",
          quote: "«El cumplimiento es automático. Dedicamos menos tiempo a la documentación y más a recuperar deuda».",
          result: "€40k/mes en ahorros",
          specialty: "Gestión de Crédito"
        }
      ],

      roi: {
        title: "Métricas de ROI",
        metrics: [
          { value: "40 %", label: "Incremento en la tasa de recobro" },
          { value: "5x", label: "Más expedientes gestionados" },
          { value: "70 %", label: "Automatización de llamadas rutinarias" },
          { value: "100 %", label: "Cumplimiento normativo" }
        ]
      },

      features: [
        "Priorización inteligente de expedientes",
        "Automatización de llamadas y mensajes de recordatorio",
        "Grabación y documentación automática de todas las interacciones",
        "Cumplimiento con FDCPA y normativas locales",
        "Integración con software de gestión de cobros",
        "Soporte multidioma para deudores internacionales",
        "Escalado automático a agentes humanos en casos complejos"
      ],

      pricing_note: "Desde 285 €/mes. Ideal para agencias de cobro con más de 1.000 llamadas mensuales.",
      final_cta: "Empieza tu demo gratuita"
    },
    ro: {
      title: "Recepționist AI pentru Agenții de Recuperare Creanțe",
      subtitle: "Recuperează mai multe creanțe cu management inteligent al apelurilor. Automatizează contactul, îmbunătățește ratele de recuperare și scalează operațiunile.",
      hero_cta: "Programează demo-ul",
      
      benefits: [
        {
          icon: TrendingUp,
          title: "Creșterea ratelor de recuperare",
          description: "IA identifică debitorii cu cea mai mare intenție de plată și prioritizează apelurile. Recuperează mai mult cu mai puține încercări."
        },
        {
          icon: Clock,
          title: "Automatizarea contactului",
          description: "Apeluri și mesaje automate 24/7. Contactează debitorii atunci când este cel mai probabil să răspundă."
        },
        {
          icon: Zap,
          title: "Reducerea costurilor operaționale",
          description: "Gestionează de până la 5 ori mai multe dosare cu aceeași echipă. IA se ocupă de apelurile de rutină, iar agenții se concentrează pe negociere."
        },
        {
          icon: CheckCircle,
          title: "Conformitate normativă și documentare",
          description: "Toate apelurile sunt înregistrate și documentate automat. Conformitate totală cu FDCPA și reglementările locale."
        }
      ],

      caseStudies: [
        {
          name: "Roberto García",
          company: "RecoverPlus Solutions",
          quote: "«Am crescut rata de recuperare de la 25 % la 40 % în doar 3 luni. IA prioritizează conturile de valoare mare».",
          result: "+40 % rată de recuperare",
          specialty: "Agenție Colectare"
        },
        {
          name: "Jennifer Lee",
          company: "Debt Recovery Solutions",
          quote: "«Sistemul gestionează primul contact și calificarea. Agenții noștri se concentrează pe negociere și închidere».",
          result: "70 % automatizare apeluri de rutină",
          specialty: "Recuperare Datorii"
        },
        {
          name: "Miguel Santos",
          company: "Santos Financial Recovery",
          quote: "«Conformitatea este automată. Dedicăm mai puțin timp documentării și mai mult recuperării creanțelor».",
          result: "Economii de 40.000 €/lună",
          specialty: "Gestionare Credit"
        }
      ],

      roi: {
        title: "Indicatori ROI",
        metrics: [
          { value: "40 %", label: "Creștere a ratei de recuperare" },
          { value: "5x", label: "Mai multe dosare gestionate" },
          { value: "70 %", label: "Automatizare apeluri de rutină" },
          { value: "100 %", label: "Conformitate normativă" }
        ]
      },

      features: [
        "Prioritizare inteligentă a dosarelor",
        "Automatizare apeluri și mesaje de memento",
        "Înregistrare și documentare automată a tuturor interacțiunilor",
        "Conformitate cu FDCPA și reglementări locale",
        "Integrare cu software de management recuperare creanțe",
        "Suport multilingv pentru debitori internaționali",
        "Escaladare automată către agenți umani în cazuri complexe"
      ],

      pricing_note: "De la 285 €/lună. Ideal pentru agenții de recuperare cu peste 1.000 de apeluri lunare.",
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
              src="/images/industry-collections-hero.jpg" 
              alt="Collection Agency"
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
                  <Zap className="h-8 w-8 text-primary" />
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
              Why Collection Agencies Choose Klarson
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
              Success Stories from Collection Leaders
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
              Features Built for Collections
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
                Ready to Increase Your Recovery Rates?
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
