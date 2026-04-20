/*
 * Medical & Dental Landing Page
 * 
 * Características:
 * - Mensajería personalizada para clínicas médicas y dentales
 * - Casos de estudio relevantes del sector
 * - ROI específico para salud
 * - CTA enfocado en demostración
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Clock, TrendingUp, Users, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function MedicalLanding() {
  const { t, locale } = useLanguage();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: "AI Receptionist for Medical & Dental Clinics",
      subtitle: "Never miss a patient call again. Automate appointments, reduce no-shows, and scale your practice.",
      hero_cta: "Book Demo",
      
      benefits: [
        {
          icon: Clock,
          title: "24/7 Patient Availability",
          description: "Patients can book appointments any time, even outside business hours. Reduce missed opportunities."
        },
        {
          icon: TrendingUp,
          title: "Increase Patient Retention",
          description: "Automated appointment reminders reduce no-shows by up to 40%. Keep your schedule full."
        },
        {
          icon: Users,
          title: "Reduce Staff Workload",
          description: "Free your reception team from repetitive calls. They focus on patient care, not call management."
        },
        {
          icon: Check,
          title: "HIPAA Compliant",
          description: "All patient data is encrypted and compliant with healthcare regulations. Your data is secure."
        }
      ],

      caseStudies: [
        {
          name: "Javier Méndez",
          clinic: "Clínica Dental Méndez",
          quote: "We arrived Monday and had 4 new appointments booked over the weekend. The calendar fills itself.",
          result: "+35% new patient bookings",
          specialty: "Dental Clinic"
        },
        {
          name: "Dr. Carmen Soler",
          clinic: "Vital Health Center",
          quote: "The phone stopped ringing constantly. Now Klarson filters everything automatically. The difference is radical.",
          result: "50% reduction in missed calls",
          specialty: "Medical Center"
        },
        {
          name: "Dr. María López",
          clinic: "Centro de Fisioterapia Vital",
          quote: "Patients appreciate the professional service. Our therapists now focus on treatment, not scheduling.",
          result: "30% more appointments per therapist",
          specialty: "Physiotherapy Center"
        }
      ],

      roi: {
        title: "Medical Industry ROI",
        metrics: [
          { value: "40%", label: "Reduction in no-shows" },
          { value: "35%", label: "More new patient bookings" },
          { value: "25 hrs", label: "Staff time saved per week" },
          { value: "€2,400", label: "Average monthly savings" }
        ]
      },

      features: [
        "Intelligent call routing to multiple departments",
        "Patient history integration with EHR systems",
        "Insurance verification automation",
        "Follow-up appointment reminders via SMS/WhatsApp",
        "Multi-language support for diverse patient bases",
        "HIPAA & GDPR compliance built-in"
      ],

      pricing_note: "Starting at €285/month. Perfect for clinics with 500-2000 monthly calls.",
      final_cta: "Start Your Free Demo"
    },
    es: {
      title: "Recepcionista con IA para Clínicas Médicas y Dentales",
      subtitle: "No vuelvas a perder una llamada de un paciente. Automatiza las citas, reduce las ausencias y escala tu clínica.",
      hero_cta: "Reservar demo",
      
      benefits: [
        {
          icon: Clock,
          title: "Disponibilidad para pacientes 24/7",
          description: "Los pacientes pueden reservar cita en cualquier momento, incluso fuera del horario laboral. Menos oportunidades perdidas."
        },
        {
          icon: TrendingUp,
          title: "Aumenta la fidelización de pacientes",
          description: "Los recordatorios automáticos de citas reducen las ausencias hasta en un 40 %. Mantén tu agenda llena."
        },
        {
          icon: Users,
          title: "Reduce la carga de trabajo del personal",
          description: "Libera a tu equipo de recepción de llamadas repetitivas. Que se centren en la atención al paciente, no en gestionar llamadas."
        },
        {
          icon: Check,
          title: "Cumplimiento HIPAA",
          description: "Todos los datos de los pacientes están cifrados y cumplen la normativa sanitaria. Tus datos están seguros."
        }
      ],

      caseStudies: [
        {
          name: "Javier Méndez",
          clinic: "Clínica Dental Méndez",
          quote: "Llegamos el lunes y había 4 citas nuevas reservadas durante el fin de semana. La agenda se llena sola.",
          result: "+35% nuevas citas de pacientes",
          specialty: "Clínica Dental"
        },
        {
          name: "Dra. Carmen Soler",
          clinic: "Vital Health Center",
          quote: "El teléfono dejó de sonar constantemente. Ahora Klarson filtra todo automáticamente. El cambio es radical.",
          result: "50% reducción en llamadas perdidas",
          specialty: "Centro Médico"
        },
        {
          name: "Dra. María López",
          clinic: "Centro de Fisioterapia Vital",
          quote: "Los pacientes valoran el servicio profesional. Ahora nuestros terapeutas se centran en el tratamiento, no en la agenda.",
          result: "30% más citas por terapeuta",
          specialty: "Centro de Fisioterapia"
        }
      ],

      roi: {
        title: "Métricas de ROI",
        metrics: [
          { value: "40%", label: "Reducción de ausencias" },
          { value: "35%", label: "Más nuevas citas de pacientes" },
          { value: "25 h", label: "Tiempo de personal ahorrado por semana" },
          { value: "2.400 €", label: "Ahorro medio mensual" }
        ]
      },

      features: [
        "Enrutamiento inteligente de llamadas entre varios departamentos",
        "Integración del historial del paciente con sistemas EHR",
        "Automatización de verificación de seguros",
        "Recordatorios de seguimiento por SMS y WhatsApp",
        "Soporte multidioma para bases de pacientes diversas",
        "Cumplimiento HIPAA y RGPD integrado"
      ],

      pricing_note: "Desde 285 €/mes. Ideal para clínicas con entre 500 y 2.000 llamadas mensuales.",
      final_cta: "Empieza tu demo gratuita"
    },
    ro: {
      title: "Recepționist AI pentru Clinici Medicale și Stomatologice",
      subtitle: "Nu mai pierde niciodată un apel de la pacienți. Automatizează programările, redu absențele și scalează-ți clinica.",
      hero_cta: "Programează demo-ul",
      
      benefits: [
        {
          icon: Clock,
          title: "Disponibilitate pentru pacienți 24/7",
          description: "Pacienții își pot face programări oricând, inclusiv în afara programului. Mai puține oportunități ratate."
        },
        {
          icon: TrendingUp,
          title: "Crește retenția pacienților",
          description: "Mementourile automate reduc neprezențările cu până la 40 %. Agenda rămâne plină."
        },
        {
          icon: Users,
          title: "Reducerea volumului de muncă al personalului",
          description: "Eliberează recepția de apelurile repetitive. Personalul se concentrează pe îngrijirea pacienților, nu pe gestionarea apelurilor."
        },
        {
          icon: Check,
          title: "Conform HIPAA",
          description: "Toate datele pacienților sunt criptate și respectă reglementările din domeniul sănătății. Datele tale sunt sigure."
        }
      ],

      caseStudies: [
        {
          name: "Javier Méndez",
          clinic: "Clínica Dental Méndez",
          quote: "Am ajuns luni și aveam 4 programări noi făcute în weekend. Agenda se umple singură.",
          result: "+35% noi programări de pacienți",
          specialty: "Clinică Dentară"
        },
        {
          name: "Dr. Carmen Soler",
          clinic: "Vital Health Center",
          quote: "Telefonul a încetinit să sune constant. Acum Klarson filtrează totul automat. Diferența este radicală.",
          result: "50% reducere în apeluri pierdute",
          specialty: "Centru Medical"
        },
        {
          name: "Dr. María López",
          clinic: "Centro de Fisioterapia Vital",
          quote: "Pacienții apreciază serviciul profesionist. Terapeuții noștri se concentrează acum pe tratament, nu pe programări.",
          result: "30% mai multe programări pe terapeut",
          specialty: "Centru de Fiziologie"
        }
      ],

      roi: {
        title: "Indicatori ROI",
        metrics: [
          { value: "40%", label: "Reducere a neprezențărilor" },
          { value: "35%", label: "Mai multe programări noi" },
          { value: "25 h", label: "Timp de personal economisit pe săptămână" },
          { value: "2.400 €", label: "Economie medie lunară" }
        ]
      },

      features: [
        "Rutare inteligentă a apelurilor către mai multe departamente",
        "Integrare a istoricului pacientului cu sisteme EHR",
        "Automatizare verificare asigurări",
        "Mementouri de follow-up prin SMS și WhatsApp",
        "Suport multilingv pentru baze diverse de pacienți",
        "Conformitate HIPAA și GDPR integrată"
      ],

      pricing_note: "De la 285 €/lună. Ideal pentru clinici cu 500–2.000 de apeluri lunare.",
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
              src="/images/industry-medical-hero.jpg" 
              alt="Medical Clinic"
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
                  <Stethoscope className="h-8 w-8 text-primary" />
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
              Why Medical Clinics Choose Klarson
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
              Success Stories from Medical Professionals
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
                    <p className="text-sm text-muted-foreground">{study.clinic}</p>
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
              Features Built for Healthcare
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
                Ready to Transform Your Clinic?
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
