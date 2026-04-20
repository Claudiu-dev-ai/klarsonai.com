import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { 
  insertDemoBooking, 
  insertRoiCalculation, 
  insertPartnerApplication 
} from '../db';
import { 
  sendEmail, 
  formatDemoBookingEmail, 
  formatRoiCalculatorEmail, 
  formatPartnerApplicationEmail 
} from '../email';
import {
  formatDemoBookingConfirmation,
  formatRoiCalculatorConfirmation,
  formatPartnerApplicationConfirmation
} from '../emailConfirmations';

const CONTACT_EMAIL = 'contact@klarsonai.com';

/**
 * Forms router - handles all form submissions
 */
export const formsRouter = router({
  /**
   * Submit demo booking form
   */
  submitDemoBooking: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(5, 'Phone number is required'),
        company: z.string().optional(),
        industry: z.string().optional(),
        callsPerMonth: z.number().int().positive().optional(),
        preferredDateTime: z.date().optional(),
        additionalMessage: z.string().optional(),
        // Tracking data
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        sessionId: z.string().optional(),
        timeOnPage: z.number().int().optional(),
        formCompletionTime: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Insert into database
        await insertDemoBooking(input);

        // Send admin notification email
        const adminEmailHtml = formatDemoBookingEmail(input);
        const adminEmailSent = await sendEmail({
          to: CONTACT_EMAIL,
          subject: `🎯 New Demo Booking: ${input.fullName} (${input.company || 'No company'})`,
          html: adminEmailHtml,
        });

        if (!adminEmailSent) {
          console.warn('[Forms] Admin email notification failed for demo booking');
        }

        // Send confirmation email to user
        const userConfirmation = formatDemoBookingConfirmation({
          fullName: input.fullName,
          email: input.email,
          preferredDateTime: input.preferredDateTime,
        });
        const userEmailSent = await sendEmail({
          to: input.email,
          subject: userConfirmation.subject,
          html: userConfirmation.html,
        });

        if (!userEmailSent) {
          console.warn('[Forms] User confirmation email failed for demo booking');
        }

        return {
          success: true,
          message: 'Demo booking submitted successfully',
        };
      } catch (error) {
        console.error('[Forms] Failed to submit demo booking:', error);
        throw new Error('Failed to submit demo booking');
      }
    }),

  /**
   * Submit ROI calculator results
   */
  submitRoiCalculation: publicProcedure
    .input(
      z.object({
        email: z.string().email('Invalid email address'),
        fullName: z.string().optional(),
        company: z.string().optional(),
        industry: z.string().min(1, 'Industry is required'),
        // Calculator inputs
        callsPerMonth: z.number().int().positive('Calls per month must be positive'),
        currentResponseRate: z.number().int().min(0).max(100, 'Response rate must be between 0-100'),
        avgClientValue: z.number().int().positive('Average client value must be positive'),
        confirmationRate: z.number().int().min(0).max(100).optional(),
        // Calculator results
        missedCallsPerMonth: z.number().int().optional(),
        lostRevenuePerMonth: z.number().int().optional(),
        lostRevenuePerYear: z.number().int().optional(),
        currentReceptionistCost: z.number().int().optional(),
        klarsonCostPerYear: z.number().int().optional(),
        totalSavingsPerYear: z.number().int().optional(),
        roiPercentage: z.number().int().optional(),
        paybackDays: z.number().int().optional(),
        // Tracking data
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        sessionId: z.string().optional(),
        timeOnPage: z.number().int().optional(),
        formCompletionTime: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Insert into database
        await insertRoiCalculation(input);

        // Send admin notification email
        const adminEmailHtml = formatRoiCalculatorEmail(input);
        const adminEmailSent = await sendEmail({
          to: CONTACT_EMAIL,
          subject: `💰 New ROI Calculator: ${input.email} - ${input.industry} (${input.totalSavingsPerYear ? `$${input.totalSavingsPerYear.toLocaleString()}/year` : 'N/A'})`,
          html: adminEmailHtml,
        });

        if (!adminEmailSent) {
          console.warn('[Forms] Admin email notification failed for ROI calculation');
        }

        // Send confirmation email to user
        const userConfirmation = formatRoiCalculatorConfirmation({
          fullName: input.fullName,
          email: input.email,
          totalSavingsPerYear: input.totalSavingsPerYear,
          roiPercentage: input.roiPercentage,
        });
        const userEmailSent = await sendEmail({
          to: input.email,
          subject: userConfirmation.subject,
          html: userConfirmation.html,
        });

        if (!userEmailSent) {
          console.warn('[Forms] User confirmation email failed for ROI calculation');
        }

        return {
          success: true,
          message: 'ROI calculation submitted successfully',
        };
      } catch (error) {
        console.error('[Forms] Failed to submit ROI calculation:', error);
        throw new Error('Failed to submit ROI calculation');
      }
    }),

  /**
   * Submit partner application
   */
  submitPartnerApplication: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(5, 'Phone number is required'),
        company: z.string().min(2, 'Company name is required'),
        partnerType: z.enum(['reseller', 'integrator', 'consultant', 'agency']),
        aiVoipExperience: z.string().optional(),
        targetMarket: z.string().optional(),
        potentialClients: z.number().int().positive().optional(),
        estimatedMonthlyBudget: z.number().int().positive().optional(),
        portfolioDocument: z.string().url().optional(),
        // Tracking data
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
        referrer: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        sessionId: z.string().optional(),
        timeOnPage: z.number().int().optional(),
        formCompletionTime: z.number().int().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Insert into database
        await insertPartnerApplication(input);

        // Send admin notification email
        const adminEmailHtml = formatPartnerApplicationEmail(input);
        const adminEmailSent = await sendEmail({
          to: CONTACT_EMAIL,
          subject: `🤝 New Partner Application: ${input.fullName} - ${input.company} (${input.partnerType})`,
          html: adminEmailHtml,
        });

        if (!adminEmailSent) {
          console.warn('[Forms] Admin email notification failed for partner application');
        }

        // Send confirmation email to user
        const userConfirmation = formatPartnerApplicationConfirmation({
          fullName: input.fullName,
          email: input.email,
          partnerType: input.partnerType,
          company: input.company,
        });
        const userEmailSent = await sendEmail({
          to: input.email,
          subject: userConfirmation.subject,
          html: userConfirmation.html,
        });

        if (!userEmailSent) {
          console.warn('[Forms] User confirmation email failed for partner application');
        }

        return {
          success: true,
          message: 'Partner application submitted successfully',
        };
      } catch (error) {
        console.error('[Forms] Failed to submit partner application:', error);
        throw new Error('Failed to submit partner application');
      }
    }),
});
