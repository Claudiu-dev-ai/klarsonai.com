/**
 * FAQ Section Component
 * 
 * Displays frequently asked questions in an accordion format
 * - First question expanded by default
 * - Smooth animations for expand/collapse
 * - Fully translated in EN/ES/RO
 * - Responsive design
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { getLoginUrl } from '@/const';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0); // First question open by default

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.faq.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.questions.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-muted/50"
              >
                <span className="text-lg font-semibold pr-8">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2 text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            {t.faq.cta}
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {t.faq.ctaButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
