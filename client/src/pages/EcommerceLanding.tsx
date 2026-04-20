/*
 * E-commerce Landing Page
 * 
 * Características:
 * - Mensajería personalizada para tiendas online y retail
 * - Casos de estudio relevantes del sector
 * - ROI específico para e-commerce
 * - CTA enfocado en demostración
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Users, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function EcommerceLanding() {
  const { t, locale } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "AI Receptionist for E-commerce & Retail",
      subtitle: "Convert customer inquiries into sales. Handle order questions, returns, and support 24/7 without hiring more staff.",
      hero_cta: "Book Demo",
      
      benefits: [
        {
          icon: ShoppingCart,
          title: "Instant Customer Support",
          description: "Answer product questions, process returns, and handle complaints instantly. 24/7 customer service without overtime costs."
        },
        {
          icon: Package,
          title: "Reduce Cart Abandonment",
          description: "Customers with questions about shipping, returns, or products get immediate answers. Convert hesitant buyers into paying customers."
        },
        {
          icon: Users,
          title: "Scale Without Hiring",
          description: "Handle 10x more customer inquiries with the same team. AI manages routine questions while your team handles complex issues."
        },
        {
          icon: TrendingUp,
          title: "Increase Average Order Value",
          description: "Intelligent product recommendations and upselling during calls. Customers get personalized suggestions based on their needs."
        }
      ],

      caseStudies: [
        {
          name: "Elena Rodríguez",
          company: "TechStore Spain",
          quote: "During Black Friday, we received 500+ calls. Without Klarson, we would have lost half of them. The AI handled inquiries instantly.",
          result: "+€45,000 in recovered sales",
          specialty: "Electronics Retail"
        },
        {
          name: "Marco Colombo",
          company: "Fashion Forward Italia",
          quote: "Customers always ask about sizing, returns, and shipping. Now the AI answers everything instantly. Our conversion rate jumped 28%.",
          result: "+28% conversion rate",
          specialty: "Fashion E-commerce"
        },
        {
          name: "Lisa Thompson",
          company: "Global Beauty Supply",
          quote: "We went from 40% of calls unanswered to 100% answered. The AI even upsells complementary products. It's like hiring 3 new team members.",
          result: "€8,500/month additional revenue",
          specialty: "Beauty & Cosmetics"
        }
      ],

      roi: {
        title: "E-commerce Industry ROI",
        metrics: [
          { value: "100%", label: "Calls answered 24/7" },
          { value: "28%", label: "Conversion rate increase" },
          { value: "€45K", label: "Recovered sales per month" },
          { value: "3x", label: "Customer support capacity" }
        ]
      },

      features: [
        "Instant order status and tracking information",
        "Automated return and refund processing",
        "Product recommendation engine during calls",
        "Multi-language support for international customers",
        "Integration with Shopify, WooCommerce, Magento",
        "Inventory checking and real-time availability",
        "Payment processing and order confirmation"
      ],

      pricing_note: "Starting at €285/month. Perfect for online stores with 1000+ monthly customer calls.",
      final_cta: "Start Your Free Demo"
    },
    es: {
      title: "Recepcionista con IA para E-commerce y Retail",
      subtitle: "Convierte consultas de clientes en ventas. Gestiona pedidos, devoluciones y soporte 24/7 sin contratar más personal.",
      hero_cta: "Reservar demo",
      
      benefits: [
        {
          icon: ShoppingCart,
          title: "Atención al cliente instantánea",
          description: "Responde al momento a preguntas sobre productos, gestiona devoluciones y atiende reclamaciones. Servicio al cliente 24/7 sin costes extra de horas."
        },
        {
          icon: Package,
          title: "Reduce el abandono del carrito",
          description: "Los clientes obtienen respuestas inmediatas sobre envíos, devoluciones o productos. Convierte compradores indecisos en ventas cerradas."
        },
        {
          icon: Users,
          title: "Escala sin contratar",
          description: "Gestiona hasta 10 veces más consultas con el mismo equipo. La IA se encarga de las preguntas rutinarias mientras tu equipo atiende los casos complejos."
        },
        {
          icon: TrendingUp,
          title: "Aumenta el valor medio del pedido",
          description: "Recomendaciones inteligentes de productos y upselling durante las llamadas. Los clientes reciben sugerencias personalizadas según sus necesidades."
        }
      ],

      caseStudies: [
        {
          name: "Elena Rodríguez",
          company: "TechStore Spain",
          quote: "«Durante el Black Friday recibimos más de 500 llamadas. Sin Klarson, habríamos perdido la mitad. La IA atendió todas las consultas al instante».",
          result: "+45.000 € en ventas recuperadas",
          specialty: "Retail Electrónico"
        },
        {
          name: "Marco Colombo",
          company: "Fashion Forward Italia",
          quote: "«Los clientes siempre preguntan por tallas, devoluciones y envíos. Ahora la IA lo responde todo al momento. Nuestra tasa de conversión subió un 28 %».",
          result: "+28 % en tasa de conversión",
          specialty: "E-commerce de Moda"
        },
        {
          name: "Lisa Thompson",
          company: "Global Beauty Supply",
          quote: "«Pasamos de dejar sin atender el 40 % de las llamadas a contestarlas todas. La IA incluso hace upselling de productos complementarios. Es como contratar a 3 personas más».",
          result: "+8.500 €/mes en ingresos adicionales",
          specialty: "Belleza y Cosméticos"
        }
      ],

      roi: {
        title: "Métricas de ROI",
        metrics: [
          { value: "100 %", label: "Llamadas atendidas 24/7" },
          { value: "28 %", label: "Incremento en la tasa de conversión" },
          { value: "45.000 €", label: "Ventas recuperadas al mes" },
          { value: "3x", label: "Capacidad del equipo de atención al cliente" }
        ]
      },

      features: [
        "Información instantánea sobre estado y seguimiento de pedidos",
        "Procesamiento automatizado de devoluciones y reembolsos",
        "Motor de recomendación de productos durante las llamadas",
        "Soporte multidioma para clientes internacionales",
        "Integración con Shopify, WooCommerce y Magento",
        "Comprobación de stock y disponibilidad en tiempo real",
        "Procesamiento de pagos y confirmación de pedidos"
      ],

      pricing_note: "Desde 285 €/mes. Ideal para tiendas online con más de 1.000 llamadas mensuales de clientes.",
      final_cta: "Empieza tu demo gratuita"
    },
    ro: {
      title: "Recepționist AI pentru E-commerce și Retail",
      subtitle: "Transformă solicitările clienților în vânzări. Gestionează comenzi, retururi și suport 24/7 fără a angaja personal suplimentar.",
      hero_cta: "Programează demo-ul",
      
      benefits: [
        {
          icon: ShoppingCart,
          title: "Suport clienți instant",
          description: "Răspunde imediat la întrebări despre produse, procesează retururi și gestionează reclamații. Suport 24/7 fără costuri suplimentare de personal."
        },
        {
          icon: Package,
          title: "Reducerea abandonării coșului",
          description: "Clienții primesc răspunsuri instant despre livrare, retururi sau produse. Transformă cumpărătorii indeciși în clienți plătitori."
        },
        {
          icon: Users,
          title: "Scalare fără angajări",
          description: "Gestionează de 10 ori mai multe solicitări cu aceeași echipă. IA se ocupă de întrebările de rutină, iar echipa ta de cazurile complexe."
        },
        {
          icon: TrendingUp,
          title: "Creșterea valorii medii a comenzii",
          description: "Recomandări inteligente de produse și upselling în timpul apelurilor. Clienții primesc sugestii personalizate în funcție de nevoile lor."
        }
      ],

      caseStudies: [
        {
          name: "Elena Rodríguez",
          company: "TechStore Spain",
          quote: "«De Black Friday am primit peste 500 de apeluri. Fără Klarson, am fi pierdut jumătate dintre ele. IA a gestionat instant toate solicitările».",
          result: "+45.000 € vânzări recuperate",
          specialty: "Retail Electronic"
        },
        {
          name: "Marco Colombo",
          company: "Fashion Forward Italia",
          quote: "«Clienții întreabă mereu despre mărimi, retururi și livrare. Acum IA răspunde instant. Rata noastră de conversie a crescut cu 28 %».",
          result: "+28 % rată de conversie",
          specialty: "E-commerce de Modă"
        },
        {
          name: "Lisa Thompson",
          company: "Global Beauty Supply",
          quote: "«Am trecut de la 40 % apeluri pierdute la 100 % apeluri preluate. IA face chiar și upsell la produse complementare. Este ca și cum am angajat 3 oameni noi».",
          result: "+8.500 €/lună venituri suplimentare",
          specialty: "Frumusețe și Cosmetice"
        }
      ],

      roi: {
        title: "Indicatori ROI",
        metrics: [
          { value: "100 %", label: "Apeluri preluate 24/7" },
          { value: "28 %", label: "Creștere a ratei de conversie" },
          { value: "45.000 €", label: "Vânzări recuperate lunar" },
          { value: "3x", label: "Capacitate extinsă a suportului clienți" }
        ]
      },

      features: [
        "Informații instant despre statusul și urmărirea comenzilor",
        "Procesare automată a retururilor și rambursărilor",
        "Motor de recomandare produse în timpul apelurilor",
        "Suport multilingv pentru clienți internaționali",
        "Integrare cu Shopify, WooCommerce și Magento",
        "Verificare stoc și disponibilitate în timp real",
        "Procesare plăți și confirmare comenzi"
      ],

      pricing_note: "De la 285 €/lună. Ideal pentru magazine online cu peste 1.000 de apeluri lunare de la clienți.",
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
              src="/images/industry-ecommerce-hero.jpg" 
              alt="E-commerce Center"
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
                  <ShoppingCart className="h-8 w-8 text-primary" />
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
              Why E-commerce Businesses Choose Klarson
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
              Success Stories from E-commerce Leaders
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
              Features Built for E-commerce
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
                Ready to Boost Your Sales?
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
