/**
 * Partner Application Form Component
 * 
 * Features:
 * - 10 fields (7 critical/important, 3 optional)
 * - React Hook Form + Zod validation
 * - Multilinguality (EN/ES/RO)
 * - File upload for portfolio/presentation
 * - Automatic tracking (IP, UTM, session, time on page)
 * - Status system (Pending, Approved, Rejected, Negotiation)
 * - Premium+ UI with glassmorphism
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { trpc } from '@/lib/trpc';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Upload } from 'lucide-react';
import { toast } from 'sonner';

// Zod schema for validation
const partnerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  company: z.string().min(2, 'Company name is required'),
  partnerType: z.string().min(1, 'Partner type is required'),
  aiVoipExperience: z.string().optional(),
  targetMarket: z.string().optional(),
  potentialClients: z.string().optional(),
  estimatedBudget: z.string().optional(),
  portfolioDocument: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type PartnerApplicationFormData = z.infer<typeof partnerApplicationSchema>;

export default function PartnerApplicationForm() {
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
  } = useForm<PartnerApplicationFormData>({
    resolver: zodResolver(partnerApplicationSchema),
  });

  const submitMutation = trpc.forms.submitPartnerApplication.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      toast.success(
        locale === 'es'
          ? '¡Aplicación enviada exitosamente! Te contactaremos pronto.'
          : locale === 'ro'
          ? 'Aplicație trimisă cu succes! Te vom contacta în curând.'
          : 'Application submitted successfully! We\'ll contact you soon.'
      );
      setTimeout(() => {
        reset();
        setIsSuccess(false);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
    },
    onError: (error) => {
      toast.error(
        locale === 'es'
          ? 'Error al enviar la aplicación. Por favor intenta de nuevo.'
          : locale === 'ro'
          ? 'Eroare la trimiterea aplicației. Vă rugăm să încercați din nou.'
          : 'Failed to submit application. Please try again.'
      );
      console.error('Partner application error:', error);
    },
  });

  const selectedPartnerType = watch('partnerType');

  const onSubmit = async (data: PartnerApplicationFormData) => {
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
      partnerType: data.partnerType as 'reseller' | 'integrator' | 'consultant' | 'agency',
      aiVoipExperience: data.aiVoipExperience,
      targetMarket: data.targetMarket,
      potentialClients: data.potentialClients ? parseInt(data.potentialClients) : undefined,
      estimatedMonthlyBudget: data.estimatedBudget ? parseInt(data.estimatedBudget) : undefined,
      portfolioDocument: data.portfolioDocument || undefined,
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
      title: 'Become a Klarson Partner',
      description: 'Join our partner network and grow your business with AI voice automation.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone',
      phonePlaceholder: '+1 (555) 123-4567',
      company: 'Company',
      companyPlaceholder: 'Your Company Name',
      partnerType: 'Partner Type',
      partnerTypePlaceholder: 'Select partner type',
      aiVoipExperience: 'AI/VoIP Experience',
      aiVoipExperiencePlaceholder: 'Describe your experience with AI and VoIP solutions...',
      targetMarket: 'Target Market',
      targetMarketPlaceholder: 'Which industries or regions do you target?',
      potentialClients: 'Potential Clients',
      potentialClientsPlaceholder: '50',
      estimatedBudget: 'Estimated Monthly Budget (€)',
      estimatedBudgetPlaceholder: '5000',
      portfolioDocument: 'Portfolio/Presentation URL',
      portfolioDocumentPlaceholder: 'https://yourcompany.com/portfolio',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      success: 'Application Submitted!',
      successMessage: 'We\'ll review your application and contact you within 48 hours.',
      partnerTypes: {
        reseller: 'Reseller',
        integrator: 'Integrator',
        consultant: 'Consultant',
        agency: 'Agency',
      },
    },
    es: {
      title: 'Conviértete en Partner de Klarson',
      description: 'Únete a nuestra red de partners y haz crecer tu negocio con automatización de voz IA.',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Juan Pérez',
      email: 'Email',
      emailPlaceholder: 'juan@empresa.com',
      phone: 'Teléfono',
      phonePlaceholder: '+34 612 345 678',
      company: 'Empresa',
      companyPlaceholder: 'Nombre de tu Empresa',
      partnerType: 'Tipo de Partner',
      partnerTypePlaceholder: 'Selecciona tipo de partner',
      aiVoipExperience: 'Experiencia con IA/VoIP',
      aiVoipExperiencePlaceholder: 'Describe tu experiencia con soluciones de IA y VoIP...',
      targetMarket: 'Mercado Objetivo',
      targetMarketPlaceholder: '¿Qué industrias o regiones son tu objetivo?',
      potentialClients: 'Clientes Potenciales',
      potentialClientsPlaceholder: '50',
      estimatedBudget: 'Presupuesto Mensual Estimado (€)',
      estimatedBudgetPlaceholder: '5000',
      portfolioDocument: 'URL de Portfolio/Presentación',
      portfolioDocumentPlaceholder: 'https://tuempresa.com/portfolio',
      submit: 'Enviar Aplicación',
      submitting: 'Enviando...',
      success: '¡Aplicación Enviada!',
      successMessage: 'Revisaremos tu aplicación y te contactaremos en 48 horas.',
      partnerTypes: {
        reseller: 'Revendedor',
        integrator: 'Integrador',
        consultant: 'Consultor',
        agency: 'Agencia',
      },
    },
    ro: {
      title: 'Devino Partener Klarson',
      description: 'Alătură-te rețelei noastre de parteneri și dezvoltă-ți afacerea cu automatizare vocală AI.',
      fullName: 'Nume Complet',
      fullNamePlaceholder: 'Ion Popescu',
      email: 'Email',
      emailPlaceholder: 'ion@companie.ro',
      phone: 'Telefon',
      phonePlaceholder: '+40 712 345 678',
      company: 'Companie',
      companyPlaceholder: 'Numele Companiei Tale',
      partnerType: 'Tip Partener',
      partnerTypePlaceholder: 'Selectează tipul de partener',
      aiVoipExperience: 'Experiență AI/VoIP',
      aiVoipExperiencePlaceholder: 'Descrie experiența ta cu soluții AI și VoIP...',
      targetMarket: 'Piață Țintă',
      targetMarketPlaceholder: 'Ce industrii sau regiuni vizezi?',
      potentialClients: 'Clienți Potențiali',
      potentialClientsPlaceholder: '50',
      estimatedBudget: 'Buget Lunar Estimat (€)',
      estimatedBudgetPlaceholder: '5000',
      portfolioDocument: 'URL Portfolio/Prezentare',
      portfolioDocumentPlaceholder: 'https://companiatale.ro/portfolio',
      submit: 'Trimite Aplicația',
      submitting: 'Se trimite...',
      success: 'Aplicație Trimisă!',
      successMessage: 'Vom revizui aplicația ta și te vom contacta în 48 de ore.',
      partnerTypes: {
        reseller: 'Revânzător',
        integrator: 'Integrator',
        consultant: 'Consultant',
        agency: 'Agenție',
      },
    },
  };

  const tr = translations[locale as keyof typeof translations] || translations.en;

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="flex flex-col items-center justify-center py-12 bg-card rounded-lg border border-border">
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-center mb-3">{tr.success}</h2>
          <p className="text-center text-muted-foreground text-lg">{tr.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">{tr.title}</h1>
        <p className="text-lg text-muted-foreground">{tr.description}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-lg border border-border">
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

        {/* Company - CRITICAL */}
        <div>
          <Label htmlFor="company" className="text-sm font-medium">
            {tr.company} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="company"
            {...register('company')}
            placeholder={tr.companyPlaceholder}
            className="mt-1"
          />
          {errors.company && (
            <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
          )}
        </div>

        {/* Partner Type - CRITICAL */}
        <div>
          <Label htmlFor="partnerType" className="text-sm font-medium">
            {tr.partnerType} <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedPartnerType}
            onValueChange={(value) => setValue('partnerType', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={tr.partnerTypePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reseller">{tr.partnerTypes.reseller}</SelectItem>
              <SelectItem value="integrator">{tr.partnerTypes.integrator}</SelectItem>
              <SelectItem value="consultant">{tr.partnerTypes.consultant}</SelectItem>
              <SelectItem value="agency">{tr.partnerTypes.agency}</SelectItem>
            </SelectContent>
          </Select>
          {errors.partnerType && (
            <p className="text-sm text-red-500 mt-1">{errors.partnerType.message}</p>
          )}
        </div>

        {/* AI/VoIP Experience - IMPORTANT */}
        <div>
          <Label htmlFor="aiVoipExperience" className="text-sm font-medium">
            {tr.aiVoipExperience}
          </Label>
          <Textarea
            id="aiVoipExperience"
            {...register('aiVoipExperience')}
            placeholder={tr.aiVoipExperiencePlaceholder}
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Target Market - IMPORTANT */}
        <div>
          <Label htmlFor="targetMarket" className="text-sm font-medium">
            {tr.targetMarket}
          </Label>
          <Input
            id="targetMarket"
            {...register('targetMarket')}
            placeholder={tr.targetMarketPlaceholder}
            className="mt-1"
          />
        </div>

        {/* Potential Clients - IMPORTANT */}
        <div>
          <Label htmlFor="potentialClients" className="text-sm font-medium">
            {tr.potentialClients}
          </Label>
          <Input
            id="potentialClients"
            type="number"
            {...register('potentialClients')}
            placeholder={tr.potentialClientsPlaceholder}
            className="mt-1"
          />
        </div>

        {/* Estimated Budget - IMPORTANT */}
        <div>
          <Label htmlFor="estimatedBudget" className="text-sm font-medium">
            {tr.estimatedBudget}
          </Label>
          <Input
            id="estimatedBudget"
            type="number"
            {...register('estimatedBudget')}
            placeholder={tr.estimatedBudgetPlaceholder}
            className="mt-1"
          />
        </div>

        {/* Portfolio Document - OPTIONAL */}
        <div>
          <Label htmlFor="portfolioDocument" className="text-sm font-medium">
            {tr.portfolioDocument}
          </Label>
          <Input
            id="portfolioDocument"
            type="url"
            {...register('portfolioDocument')}
            placeholder={tr.portfolioDocumentPlaceholder}
            className="mt-1"
          />
          {errors.portfolioDocument && (
            <p className="text-sm text-red-500 mt-1">{errors.portfolioDocument.message}</p>
          )}
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
    </div>
  );
}
