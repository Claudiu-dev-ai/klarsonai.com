import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, DollarSign, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface ROIResult {
  missedCallsPerMonth: number;
  lostRevenuePerMonth: number;
  lostRevenuePerYear: number;
  receptionistCostPerYear: number;
  klarsonCostPerYear: number;
  totalSavingsPerYear: number;
  roiPercentage: number;
  paybackMonths: number;
}

export default function ROICalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { locale } = useLanguage();
  const [industry, setIndustry] = useState('dental');
  const [callsPerMonth, setCallsPerMonth] = useState(300);
  const [responseRate, setResponseRate] = useState(60);
  const [clientValue, setClientValue] = useState(1000);
  const [result, setResult] = useState<ROIResult | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStartTime] = useState(Date.now());

  // Lead capture form schema
  const leadCaptureSchema = z.object({
    email: z.string().email('Invalid email address'),
    fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
    company: z.string().optional(),
  });

  type LeadCaptureData = z.infer<typeof leadCaptureSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<LeadCaptureData>({
    resolver: zodResolver(leadCaptureSchema),
  });

  const submitMutation = trpc.forms.submitRoiCalculation.useMutation({
    onSuccess: () => {      setIsSuccess(true);
      toast.success(
        locale === 'es'
          ? '¡Datos guardados! Te contactaremos pronto.'
          : locale === 'ro'
          ? 'Date salvate! Te vom contacta în curând.'
          : 'Data saved! We\'ll contact you soon.'
      );
      setTimeout(() => {
        onClose();
        resetForm();
        setResult(null);
        setShowLeadCapture(false);
        setIsSuccess(false);
      }, 2000);
    },
    onError: (error) => {
      toast.error(
        locale === 'es'
          ? 'Error al enviar. Por favor intenta de nuevo.'
          : locale === 'ro'
          ? 'Eroare la trimitere. Vă rugăm să încercați din nou.'
          : 'Failed to submit. Please try again.'
      );
      console.error('ROI submission error:', error);
    },
  });

  const onLeadCaptureSubmit = async (data: LeadCaptureData) => {
    if (!result) return;

    const formCompletionTime = Math.floor((Date.now() - formStartTime) / 1000);
    const trackingData = {
      ipAddress: undefined,
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
      email: data.email,
      fullName: data.fullName,
      company: data.company,
      industry,
      callsPerMonth,
      currentResponseRate: responseRate,
      avgClientValue: clientValue,
      confirmationRate: undefined,
      // Results
      missedCallsPerMonth: result.missedCallsPerMonth,
      lostRevenuePerMonth: Math.round(result.lostRevenuePerMonth),
      lostRevenuePerYear: Math.round(result.lostRevenuePerYear),
      currentReceptionistCost: result.receptionistCostPerYear,
      klarsonCostPerYear: result.klarsonCostPerYear,
      totalSavingsPerYear: Math.round(result.totalSavingsPerYear),
      roiPercentage: result.roiPercentage,
      paybackDays: Math.round(result.paybackMonths * 30),
      ...trackingData,
    });
  };

  // Industry-specific data based on verified sources
  const industryData = {
    dental: {
      name: locale === 'es' ? 'Clínica Dental' : locale === 'ro' ? 'Clinică Dentară' : 'Dental Clinic',
      conversionRate: 0.30,
      receptionistCost: 52000,
      klarsonPlan: 'Professional',
      klarsonCost: 3420, // €285/month × 12
    },
    realestate: {
      name: locale === 'es' ? 'Inmobiliaria' : locale === 'ro' ? 'Agenție Imobiliară' : 'Real Estate',
      conversionRate: 0.20,
      receptionistCost: 48000,
      klarsonPlan: 'Professional',
      klarsonCost: 3420,
    },
    hotel: {
      name: locale === 'es' ? 'Hotel/Restaurante' : locale === 'ro' ? 'Hotel/Restaurant' : 'Hotel/Restaurant',
      conversionRate: 0.15,
      receptionistCost: 45000,
      klarsonPlan: 'Professional',
      klarsonCost: 3420,
    },
    ecommerce: {
      name: locale === 'es' ? 'E-commerce/Retail' : locale === 'ro' ? 'E-commerce/Retail' : 'E-commerce/Retail',
      conversionRate: 0.25,
      receptionistCost: 40000,
      klarsonPlan: 'Professional',
      klarsonCost: 3420,
    },
    collections: {
      name: locale === 'es' ? 'Agencia de Cobranza' : locale === 'ro' ? 'Agenție de Colectare' : 'Collections',
      conversionRate: 0.40,
      receptionistCost: 50000,
      klarsonPlan: 'Professional',
      klarsonCost: 3420,
    },
  };

  const calculateROI = () => {
    const data = industryData[industry as keyof typeof industryData];

    // Step 1: Missed calls per month
    const missedCallsPerMonth = Math.round(callsPerMonth * (1 - responseRate / 100));

    // Step 2: Potential lost customers
    const lostCustomers = Math.round(missedCallsPerMonth * data.conversionRate);

    // Step 3: Lost revenue per month
    const lostRevenuePerMonth = lostCustomers * clientValue;

    // Step 4: Lost revenue per year
    const lostRevenuePerYear = lostRevenuePerMonth * 12;

    // Step 5: Total savings (lost revenue + receptionist cost - Klarson cost)
    const totalSavingsPerYear = lostRevenuePerYear + (data.receptionistCost - data.klarsonCost);

    // Step 6: ROI percentage
    const roiPercentage = Math.round((totalSavingsPerYear / data.klarsonCost) * 100);

    // Step 7: Payback period in months
    const paybackMonths = Number((data.klarsonCost / (totalSavingsPerYear / 12)).toFixed(2));

    setResult({
      missedCallsPerMonth,
      lostRevenuePerMonth,
      lostRevenuePerYear,
      receptionistCostPerYear: data.receptionistCost,
      klarsonCostPerYear: data.klarsonCost,
      totalSavingsPerYear,
      roiPercentage,
      paybackMonths,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const content = {
    en: {
      title: 'Calculate Your ROI',
      subtitle: 'See how much you could save with Klarson AI',
      industry: 'Industry',
      callsPerMonth: 'Calls per month',
      responseRate: 'Current response rate',
      clientValue: 'Average client value',
      calculate: 'Calculate ROI',
      results: 'Your ROI Results',
      missedCalls: 'Missed calls per month',
      lostRevenue: 'Lost revenue per month',
      lostRevenueYear: 'Lost revenue per year',
      receptionistCost: 'Current receptionist cost/year',
      klarsonCost: 'Klarson cost/year',
      totalSavings: 'Total savings per year',
      roi: 'ROI in 12 months',
      payback: 'Payback period',
      disclaimer: 'Based on conservative conversion rates (20-40%). Results vary by business.',
      close: 'Close',
    },
    es: {
      title: 'Calcula tu ROI',
      subtitle: 'Ve cuánto podrías ahorrar con Klarson AI',
      industry: 'Industria',
      callsPerMonth: 'Llamadas por mes',
      responseRate: 'Tasa de respuesta actual',
      clientValue: 'Valor promedio por cliente',
      calculate: 'Calcular ROI',
      results: 'Tus Resultados de ROI',
      missedCalls: 'Llamadas perdidas por mes',
      lostRevenue: 'Ingresos perdidos por mes',
      lostRevenueYear: 'Ingresos perdidos por año',
      receptionistCost: 'Costo recepcionista actual/año',
      klarsonCost: 'Costo Klarson/año',
      totalSavings: 'Ahorro total por año',
      roi: 'ROI en 12 meses',
      payback: 'Período de amortización',
      disclaimer: 'Basado en tasas de conversión conservadoras (20-40%). Los resultados varían según tu negocio.',
      close: 'Cerrar',
    },
    ro: {
      title: 'Calculează-ți ROI-ul',
      subtitle: 'Vezi cât ai putea economisi cu Klarson AI',
      industry: 'Industrie',
      callsPerMonth: 'Apeluri pe lună',
      responseRate: 'Rata de răspuns actuală',
      clientValue: 'Valoare medie per client',
      calculate: 'Calculează ROI',
      results: 'Rezultatele tale de ROI',
      missedCalls: 'Apeluri pierdute pe lună',
      lostRevenue: 'Venituri pierdute pe lună',
      lostRevenueYear: 'Venituri pierdute pe an',
      receptionistCost: 'Cost recepționist actual/an',
      klarsonCost: 'Cost Klarson/an',
      totalSavings: 'Economii totale pe an',
      roi: 'ROI în 12 luni',
      payback: 'Perioada de rambursare',
      disclaimer: 'Bazat pe rate de conversie conservatoare (20-40%). Rezultatele variază în funcție de afacerea ta.',
      close: 'Închide',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-background/95 backdrop-blur border border-border rounded-2xl shadow-2xl p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">{t.title}</h2>
                  <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!result ? (
                // Input Form
                <div className="space-y-6">
                  {/* Industry Selector */}
                  <div>
                    <label className="block text-sm font-medium mb-3">{t.industry}</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600 text-foreground"
                    >
                      <option value="dental">Dental Clinic / Clínica Dental</option>
                      <option value="realestate">Real Estate / Inmobiliaria</option>
                      <option value="hotel">Hotel & Restaurant / Hotel & Restaurante</option>
                      <option value="ecommerce">E-commerce & Retail / E-commerce & Retail</option>
                      <option value="collections">Collections Agency / Agencia de Cobranza</option>
                    </select>
                  </div>

                  {/* Calls Per Month */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {t.callsPerMonth}
                      <span className="float-right text-indigo-600 font-semibold">{callsPerMonth}</span>
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      step="50"
                      value={callsPerMonth}
                      onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>50</span>
                      <span>5,000</span>
                    </div>
                  </div>

                  {/* Response Rate */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {t.responseRate}
                      <span className="float-right text-indigo-600 font-semibold">{responseRate}%</span>
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      step="5"
                      value={responseRate}
                      onChange={(e) => setResponseRate(Number(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>40%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Client Value */}
                  <div>
                    <label className="block text-sm font-medium mb-3">{t.clientValue}</label>
                    <input
                      type="number"
                      value={clientValue}
                      onChange={(e) => setClientValue(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600 text-foreground"
                      placeholder="1000"
                    />
                  </div>

                  {/* Calculate Button */}
                  <Button
                    onClick={calculateROI}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
                  >
                    {t.calculate}
                  </Button>

                  {/* Disclaimer */}
                  <p className="text-xs text-muted-foreground text-center italic">{t.disclaimer}</p>
                </div>
              ) : (
                // Results
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Missed Calls */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-200/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <X className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">{t.missedCalls}</p>
                      </div>
                      <p className="text-3xl font-bold text-foreground">{result.missedCallsPerMonth}</p>
                    </motion.div>

                    {/* Lost Revenue Month */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-200/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-orange-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">{t.lostRevenue}</p>
                      </div>
                      <p className="text-3xl font-bold text-foreground">{formatCurrency(result.lostRevenuePerMonth)}</p>
                    </motion.div>

                    {/* Lost Revenue Year */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-200/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-yellow-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">{t.lostRevenueYear}</p>
                      </div>
                      <p className="text-3xl font-bold text-foreground">{formatCurrency(result.lostRevenuePerYear)}</p>
                    </motion.div>

                    {/* Receptionist Cost */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20"
                    >
                      <p className="text-sm text-muted-foreground mb-2">{t.receptionistCost}</p>
                      <p className="text-3xl font-bold text-foreground">{formatCurrency(result.receptionistCostPerYear)}</p>
                    </motion.div>

                    {/* Klarson Cost */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200/20"
                    >
                      <p className="text-sm text-muted-foreground mb-2">{t.klarsonCost}</p>
                      <p className="text-3xl font-bold text-foreground">{formatCurrency(result.klarsonCostPerYear)}</p>
                    </motion.div>

                    {/* Total Savings */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-200/20 md:col-span-2"
                    >
                      <p className="text-sm text-muted-foreground mb-2 font-semibold">{t.totalSavings}</p>
                      <p className="text-4xl font-bold text-emerald-600">{formatCurrency(result.totalSavingsPerYear)}</p>
                    </motion.div>

                    {/* ROI */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/20"
                    >
                      <p className="text-sm text-muted-foreground mb-2">{t.roi}</p>
                      <p className="text-3xl font-bold text-purple-600">{result.roiPercentage.toLocaleString()}%</p>
                    </motion.div>

                    {/* Payback */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-200/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-sm text-muted-foreground">{t.payback}</p>
                      </div>
                      <p className="text-3xl font-bold text-foreground">
                        {result.paybackMonths < 0.1 ? '< 1 day' : `${result.paybackMonths} months`}
                      </p>
                    </motion.div>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-muted-foreground text-center italic">{t.disclaimer}</p>

                  {/* Lead Capture or Buttons */}
                  {!showLeadCapture ? (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setResult(null)}
                        variant="outline"
                        className="flex-1"
                      >
                        {locale === 'es' ? 'Recalcular' : locale === 'ro' ? 'Recalculează' : 'Recalculate'}
                      </Button>
                      <Button
                        onClick={() => setShowLeadCapture(true)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      >
                        {locale === 'es' ? 'Reservar Demo' : locale === 'ro' ? 'Rezervă Demo' : 'Book Demo'}
                      </Button>
                    </div>
                  ) : isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
                      <p className="text-lg font-semibold text-center">
                        {locale === 'es'
                          ? '¡Gracias! Te contactaremos pronto.'
                          : locale === 'ro'
                          ? 'Mulțumim! Te vom contacta în curând.'
                          : 'Thank you! We\'ll contact you soon.'}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onLeadCaptureSubmit)} className="space-y-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium text-center">
                        {locale === 'es'
                          ? 'Déjanos tus datos para contactarte:'
                          : locale === 'ro'
                          ? 'Lasă-ne datele tale pentru a te contacta:'
                          : 'Leave your details to get in touch:'}
                      </p>

                      {/* Email - CRITICAL */}
                      <div>
                        <Label htmlFor="roi-email" className="text-sm font-medium">
                          {locale === 'es' ? 'Email' : locale === 'ro' ? 'Email' : 'Email'}{' '}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="roi-email"
                          type="email"
                          {...register('email')}
                          placeholder={locale === 'es' ? 'tu@empresa.com' : locale === 'ro' ? 'tu@companie.ro' : 'you@company.com'}
                          className="mt-1"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Full Name - IMPORTANT */}
                      <div>
                        <Label htmlFor="roi-fullName" className="text-sm font-medium">
                          {locale === 'es' ? 'Nombre' : locale === 'ro' ? 'Nume' : 'Name'}
                        </Label>
                        <Input
                          id="roi-fullName"
                          {...register('fullName')}
                          placeholder={locale === 'es' ? 'Juan Pérez' : locale === 'ro' ? 'Ion Popescu' : 'John Doe'}
                          className="mt-1"
                        />
                      </div>

                      {/* Company - OPTIONAL */}
                      <div>
                        <Label htmlFor="roi-company" className="text-sm font-medium">
                          {locale === 'es' ? 'Empresa' : locale === 'ro' ? 'Companie' : 'Company'}
                        </Label>
                        <Input
                          id="roi-company"
                          {...register('company')}
                          placeholder={locale === 'es' ? 'Tu Empresa' : locale === 'ro' ? 'Compania Ta' : 'Your Company'}
                          className="mt-1"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          onClick={() => setShowLeadCapture(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          {locale === 'es' ? 'Volver' : locale === 'ro' ? 'Înapoi' : 'Back'}
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                          disabled={submitMutation.isPending}
                        >
                          {submitMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {locale === 'es' ? 'Enviando...' : locale === 'ro' ? 'Se trimite...' : 'Submitting...'}
                            </>
                          ) : (
                            locale === 'es' ? 'Enviar' : locale === 'ro' ? 'Trimite' : 'Submit'
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
