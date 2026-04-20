/**
 * ContactModal Component
 * Design: Signal Grid - Swiss Precision with Digital Soul
 * Modal de contacto para captura de leads con diferentes tipos de formulario
 * 
 * CONECTADO A BACKEND REAL - tRPC + Database + Email
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormType = 'demo' | 'sales' | 'partner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: FormType;
}

const formConfig = {
  demo: {
    titleKey: 'Request a Live Demo',
    titleEs: 'Solicita una Demo en Vivo',
    titleRo: 'Solicită o Demo Live',
  },
  sales: {
    titleKey: 'Contact Sales',
    titleEs: 'Contactar Ventas',
    titleRo: 'Contactează Vânzări',
  },
  partner: {
    titleKey: 'Apply to be a Partner',
    titleEs: 'Aplicar para ser Partner',
    titleRo: 'Aplică pentru a deveni Partener',
  },
};

// Zod schema for demo booking form
const demoBookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  company: z.string().optional(),
  industry: z.string().optional(),
  callsPerMonth: z.string().optional(),
  preferredDateTime: z.string().optional(),
  additionalMessage: z.string().optional(),
});

type DemoBookingFormData = z.infer<typeof demoBookingSchema>;

export function ContactModal({ isOpen, onClose, formType }: ContactModalProps) {
  const { locale } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStartTime] = useState(Date.now());

  const config = formConfig[formType];
  const title = locale === 'es' ? config.titleEs : locale === 'ro' ? config.titleRo : config.titleKey;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<DemoBookingFormData>({
    resolver: zodResolver(demoBookingSchema),
  });

  const submitMutation = trpc.forms.submitDemoBooking.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      toast.success(
        locale === 'es'
          ? '¡Demo reservada! Te contactaremos en 24 horas.'
          : locale === 'ro'
          ? 'Demo rezervat! Te vom contacta în 24 de ore.'
          : 'Demo booked! We\'ll contact you within 24 hours.'
      );
      setTimeout(() => {
        handleClose();
      }, 3000);
    },
    onError: (error) => {
      toast.error(
        locale === 'es'
          ? 'Error al enviar. Por favor intenta de nuevo.'
          : locale === 'ro'
          ? 'Eroare la trimitere. Vă rugăm să încercați din nou.'
          : 'Failed to submit. Please try again.'
      );
      console.error('Demo booking error:', error);
    },
  });

  const selectedIndustry = watch('industry');

  const onSubmit = async (data: DemoBookingFormData) => {
    const formCompletionTime = Math.floor((Date.now() - formStartTime) / 1000);

    // Get tracking data
    const trackingData = {
      ipAddress: undefined, // Will be captured by backend
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
      utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
      utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
      utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
      sessionId: sessionStorage.getItem('session_id') || undefined,
      timeOnPage: Math.floor((Date.now() - (window as any).pageLoadTime) / 1000),
      formCompletionTime,
    };

    await submitMutation.mutateAsync({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      industry: data.industry,
      callsPerMonth: data.callsPerMonth ? parseInt(data.callsPerMonth) : undefined,
      preferredDateTime: data.preferredDateTime ? new Date(data.preferredDateTime) : undefined,
      additionalMessage: data.additionalMessage,
      ...trackingData,
    });
  };

  const handleClose = () => {
    reset();
    setIsSuccess(false);
    onClose();
  };

  // Generate session ID on mount
  useEffect(() => {
    if (!sessionStorage.getItem('session_id')) {
      sessionStorage.setItem('session_id', `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    if (!(window as any).pageLoadTime) {
      (window as any).pageLoadTime = Date.now();
    }
  }, []);

  const labels = {
    en: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      email: 'Business Email',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone Number',
      phonePlaceholder: '+1 (555) 123-4567',
      company: 'Company Name',
      companyPlaceholder: 'Your Company',
      industry: 'Industry',
      industryPlaceholder: 'Select your industry',
      callsPerMonth: 'Calls per Month',
      callsPerMonthPlaceholder: '100',
      preferredDateTime: 'Preferred Date & Time',
      additionalMessage: 'Additional Message',
      additionalMessagePlaceholder: 'Tell us more about your needs...',
      submit: 'Book My Demo',
      submitting: 'Booking...',
      success: 'Demo Booked!',
      successMessage: 'We\'ll contact you within 24 hours to confirm your demo.',
      close: 'Close',
      industries: {
        medical: 'Medical/Dental',
        realestate: 'Real Estate',
        ecommerce: 'E-commerce',
        hotels: 'Hotels/Restaurants',
        collections: 'Collection Agencies',
        other: 'Other',
      },
    },
    es: {
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Juan Pérez',
      email: 'Email Empresarial',
      emailPlaceholder: 'juan@empresa.com',
      phone: 'Número de Teléfono',
      phonePlaceholder: '+34 612 345 678',
      company: 'Nombre de Empresa',
      companyPlaceholder: 'Tu Empresa',
      industry: 'Industria',
      industryPlaceholder: 'Selecciona tu industria',
      callsPerMonth: 'Llamadas por Mes',
      callsPerMonthPlaceholder: '100',
      preferredDateTime: 'Fecha y Hora Preferida',
      additionalMessage: 'Mensaje Adicional',
      additionalMessagePlaceholder: 'Cuéntanos más sobre tus necesidades...',
      submit: 'Reservar Demo',
      submitting: 'Reservando...',
      success: '¡Demo Reservada!',
      successMessage: 'Te contactaremos en 24 horas para confirmar tu demo.',
      close: 'Cerrar',
      industries: {
        medical: 'Médico/Dental',
        realestate: 'Inmobiliaria',
        ecommerce: 'E-commerce',
        hotels: 'Hoteles/Restaurantes',
        collections: 'Agencias de Cobro',
        other: 'Otro',
      },
    },
    ro: {
      fullName: 'Nume Complet',
      fullNamePlaceholder: 'Ion Popescu',
      email: 'Email Business',
      emailPlaceholder: 'ion@companie.ro',
      phone: 'Număr de Telefon',
      phonePlaceholder: '+40 712 345 678',
      company: 'Numele Companiei',
      companyPlaceholder: 'Compania Ta',
      industry: 'Industrie',
      industryPlaceholder: 'Selectează industria ta',
      callsPerMonth: 'Apeluri pe Lună',
      callsPerMonthPlaceholder: '100',
      preferredDateTime: 'Data și Ora Preferată',
      additionalMessage: 'Mesaj Adițional',
      additionalMessagePlaceholder: 'Spune-ne mai multe despre nevoile tale...',
      submit: 'Rezervă Demo',
      submitting: 'Se rezervă...',
      success: 'Demo Rezervat!',
      successMessage: 'Te vom contacta în 24 de ore pentru a confirma demo-ul.',
      close: 'Închide',
      industries: {
        medical: 'Medical/Dentar',
        realestate: 'Imobiliare',
        ecommerce: 'E-commerce',
        hotels: 'Hoteluri/Restaurante',
        collections: 'Agenții de Colectare',
        other: 'Altele',
      },
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden mx-4">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50 sticky top-0 bg-slate-900 z-10">
                <h2 className="text-xl font-semibold text-white font-display">
                  {title}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">{t.success}</h3>
                    <p className="text-slate-300 mb-6">{t.successMessage}</p>
                    <Button onClick={handleClose} variant="outline">
                      {t.close}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name - CRITICAL */}
                    <div>
                      <Label htmlFor="fullName" className="text-slate-300">
                        {t.fullName} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        {...register('fullName')}
                        placeholder={t.fullNamePlaceholder}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Email - CRITICAL */}
                    <div>
                      <Label htmlFor="email" className="text-slate-300">
                        {t.email} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder={t.emailPlaceholder}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone - CRITICAL */}
                    <div>
                      <Label htmlFor="phone" className="text-slate-300">
                        {t.phone} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder={t.phonePlaceholder}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Company - IMPORTANT */}
                    <div>
                      <Label htmlFor="company" className="text-slate-300">
                        {t.company}
                      </Label>
                      <Input
                        id="company"
                        {...register('company')}
                        placeholder={t.companyPlaceholder}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    {/* Industry - IMPORTANT */}
                    <div>
                      <Label htmlFor="industry" className="text-slate-300">
                        {t.industry}
                      </Label>
                      <Select
                        value={selectedIndustry}
                        onValueChange={(value) => setValue('industry', value)}
                      >
                        <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                          <SelectValue placeholder={t.industryPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medical">{t.industries.medical}</SelectItem>
                          <SelectItem value="realestate">{t.industries.realestate}</SelectItem>
                          <SelectItem value="ecommerce">{t.industries.ecommerce}</SelectItem>
                          <SelectItem value="hotels">{t.industries.hotels}</SelectItem>
                          <SelectItem value="collections">{t.industries.collections}</SelectItem>
                          <SelectItem value="other">{t.industries.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Calls per Month - IMPORTANT */}
                    <div>
                      <Label htmlFor="callsPerMonth" className="text-slate-300">
                        {t.callsPerMonth}
                      </Label>
                      <Input
                        id="callsPerMonth"
                        type="number"
                        {...register('callsPerMonth')}
                        placeholder={t.callsPerMonthPlaceholder}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    {/* Preferred Date/Time - IMPORTANT */}
                    <div>
                      <Label htmlFor="preferredDateTime" className="text-slate-300">
                        {t.preferredDateTime}
                      </Label>
                      <Input
                        id="preferredDateTime"
                        type="datetime-local"
                        {...register('preferredDateTime')}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    {/* Additional Message - OPTIONAL */}
                    <div>
                      <Label htmlFor="additionalMessage" className="text-slate-300">
                        {t.additionalMessage}
                      </Label>
                      <Textarea
                        id="additionalMessage"
                        {...register('additionalMessage')}
                        placeholder={t.additionalMessagePlaceholder}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                        rows={3}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 mt-2"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t.submit}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;
