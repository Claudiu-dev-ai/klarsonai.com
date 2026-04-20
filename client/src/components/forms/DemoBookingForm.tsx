/**
 * Demo Booking Form Component
 * 
 * Features:
 * - 8 fields (3 critical, 4 important, 1 optional)
 * - React Hook Form + Zod validation
 * - Multilinguality (EN/ES/RO)
 * - Automatic tracking (IP, UTM, session, time on page)
 * - Premium+ UI with glassmorphism
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

// Zod schema for validation
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

interface DemoBookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoBookingForm({ open, onOpenChange }: DemoBookingFormProps) {
  const { t, locale } = useLanguage();
  const [formStartTime] = useState(Date.now());
  const [isSuccess, setIsSuccess] = useState(false);

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
          ? '¡Demo reservada exitosamente!'
          : locale === 'ro'
          ? 'Demo rezervat cu succes!'
          : 'Demo booked successfully!'
      );
      setTimeout(() => {
        onOpenChange(false);
        reset();
        setIsSuccess(false);
      }, 2000);
    },
    onError: (error) => {
      toast.error(
        locale === 'es'
          ? 'Error al enviar el formulario. Por favor intenta de nuevo.'
          : locale === 'ro'
          ? 'Eroare la trimiterea formularului. Vă rugăm să încercați din nou.'
          : 'Failed to submit form. Please try again.'
      );
      console.error('Form submission error:', error);
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
      ...data,
      callsPerMonth: data.callsPerMonth ? parseInt(data.callsPerMonth) : undefined,
      preferredDateTime: data.preferredDateTime ? new Date(data.preferredDateTime) : undefined,
      ...trackingData,
    });
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

  const translations = {
    en: {
      title: 'Book Your Free Demo',
      description: 'Fill out the form below and we\'ll contact you to schedule your personalized demo.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone',
      phonePlaceholder: '+1 (555) 123-4567',
      company: 'Company',
      companyPlaceholder: 'Your Company Name',
      industry: 'Industry',
      industryPlaceholder: 'Select your industry',
      callsPerMonth: 'Calls per Month',
      callsPerMonthPlaceholder: '300',
      preferredDateTime: 'Preferred Date & Time',
      additionalMessage: 'Additional Message',
      additionalMessagePlaceholder: 'Tell us about your needs...',
      submit: 'Book My Demo',
      submitting: 'Submitting...',
      success: 'Demo Booked Successfully!',
      successMessage: 'We\'ll contact you shortly to confirm your demo.',
      industries: {
        medical: 'Medical & Dental',
        realestate: 'Real Estate',
        ecommerce: 'E-commerce & Retail',
        hotels: 'Hotels & Restaurants',
        collections: 'Collection Agencies',
        legal: 'Legal Services',
        logistics: 'Logistics',
        other: 'Other',
      },
    },
    es: {
      title: 'Reserva tu Demo Gratuita',
      description: 'Completa el formulario y te contactaremos para agendar tu demo personalizada.',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Juan Pérez',
      email: 'Email',
      emailPlaceholder: 'juan@empresa.com',
      phone: 'Teléfono',
      phonePlaceholder: '+34 612 345 678',
      company: 'Empresa',
      companyPlaceholder: 'Nombre de tu Empresa',
      industry: 'Industria',
      industryPlaceholder: 'Selecciona tu industria',
      callsPerMonth: 'Llamadas por Mes',
      callsPerMonthPlaceholder: '300',
      preferredDateTime: 'Fecha y Hora Preferida',
      additionalMessage: 'Mensaje Adicional',
      additionalMessagePlaceholder: 'Cuéntanos sobre tus necesidades...',
      submit: 'Reservar Mi Demo',
      submitting: 'Enviando...',
      success: '¡Demo Reservada Exitosamente!',
      successMessage: 'Te contactaremos pronto para confirmar tu demo.',
      industries: {
        medical: 'Médico y Dental',
        realestate: 'Inmobiliaria',
        ecommerce: 'E-commerce y Retail',
        hotels: 'Hoteles y Restaurantes',
        collections: 'Agencias de Cobranza',
        legal: 'Servicios Legales',
        logistics: 'Logística',
        other: 'Otro',
      },
    },
    ro: {
      title: 'Rezervă Demo-ul Gratuit',
      description: 'Completează formularul și te vom contacta pentru a programa demo-ul personalizat.',
      fullName: 'Nume Complet',
      fullNamePlaceholder: 'Ion Popescu',
      email: 'Email',
      emailPlaceholder: 'ion@companie.ro',
      phone: 'Telefon',
      phonePlaceholder: '+40 712 345 678',
      company: 'Companie',
      companyPlaceholder: 'Numele Companiei Tale',
      industry: 'Industrie',
      industryPlaceholder: 'Selectează industria',
      callsPerMonth: 'Apeluri pe Lună',
      callsPerMonthPlaceholder: '300',
      preferredDateTime: 'Data și Ora Preferată',
      additionalMessage: 'Mesaj Adițional',
      additionalMessagePlaceholder: 'Spune-ne despre nevoile tale...',
      submit: 'Rezervă Demo-ul',
      submitting: 'Se trimite...',
      success: 'Demo Rezervat Cu Succes!',
      successMessage: 'Te vom contacta în curând pentru a confirma demo-ul.',
      industries: {
        medical: 'Medical și Stomatologic',
        realestate: 'Imobiliare',
        ecommerce: 'E-commerce și Retail',
        hotels: 'Hoteluri și Restaurante',
        collections: 'Agenții de Colectare',
        legal: 'Servicii Juridice',
        logistics: 'Logistică',
        other: 'Altele',
      },
    },
  };

  const tr = translations[locale as keyof typeof translations] || translations.en;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              {tr.success}
            </DialogTitle>
            <p className="text-center text-muted-foreground">{tr.successMessage}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{tr.title}</DialogTitle>
              <DialogDescription>{tr.description}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Full Name - CRITICAL */}
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">
                  {tr.fullName} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  placeholder={tr.fullNamePlaceholder}
                  className="mt-1"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email - CRITICAL */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  {tr.email} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder={tr.emailPlaceholder}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone - CRITICAL */}
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  {tr.phone} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder={tr.phonePlaceholder}
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Company - IMPORTANT */}
              <div>
                <Label htmlFor="company" className="text-sm font-medium">
                  {tr.company}
                </Label>
                <Input
                  id="company"
                  {...register('company')}
                  placeholder={tr.companyPlaceholder}
                  className="mt-1"
                />
              </div>

              {/* Industry - IMPORTANT */}
              <div>
                <Label htmlFor="industry" className="text-sm font-medium">
                  {tr.industry}
                </Label>
                <Select
                  value={selectedIndustry}
                  onValueChange={(value) => setValue('industry', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={tr.industryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">{tr.industries.medical}</SelectItem>
                    <SelectItem value="realestate">{tr.industries.realestate}</SelectItem>
                    <SelectItem value="ecommerce">{tr.industries.ecommerce}</SelectItem>
                    <SelectItem value="hotels">{tr.industries.hotels}</SelectItem>
                    <SelectItem value="collections">{tr.industries.collections}</SelectItem>
                    <SelectItem value="legal">{tr.industries.legal}</SelectItem>
                    <SelectItem value="logistics">{tr.industries.logistics}</SelectItem>
                    <SelectItem value="other">{tr.industries.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Calls Per Month - IMPORTANT */}
              <div>
                <Label htmlFor="callsPerMonth" className="text-sm font-medium">
                  {tr.callsPerMonth}
                </Label>
                <Input
                  id="callsPerMonth"
                  type="number"
                  {...register('callsPerMonth')}
                  placeholder={tr.callsPerMonthPlaceholder}
                  className="mt-1"
                />
              </div>

              {/* Preferred Date/Time - CRITICAL */}
              <div>
                <Label htmlFor="preferredDateTime" className="text-sm font-medium">
                  {tr.preferredDateTime}
                </Label>
                <Input
                  id="preferredDateTime"
                  type="datetime-local"
                  {...register('preferredDateTime')}
                  className="mt-1"
                />
              </div>

              {/* Additional Message - OPTIONAL */}
              <div>
                <Label htmlFor="additionalMessage" className="text-sm font-medium">
                  {tr.additionalMessage}
                </Label>
                <Textarea
                  id="additionalMessage"
                  {...register('additionalMessage')}
                  placeholder={tr.additionalMessagePlaceholder}
                  className="mt-1"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {tr.submitting}
                  </>
                ) : (
                  tr.submit
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
