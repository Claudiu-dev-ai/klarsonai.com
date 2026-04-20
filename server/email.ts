import { Resend } from 'resend';
import { ENV } from './_core/env';

const resend = new Resend(ENV.resendApiKey);

const FROM_EMAIL = 'noreply@klarsonai.com';
const TO_EMAIL = 'contact@klarsonai.com';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email using Resend
 */
export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('[Email] Resend error:', error);
      return false;
    }

    console.log('[Email] Email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return false;
  }
}

/**
 * Format demo booking email
 */
export function formatDemoBookingEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  industry?: string;
  callsPerMonth?: number;
  preferredDateTime?: Date;
  additionalMessage?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Demo Booking Request</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #6366F1; margin-top: 0; font-size: 20px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Name:</td>
              <td style="padding: 8px 0;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #6366F1; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${data.phone}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company:</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #6366F1; margin-top: 30px; font-size: 20px;">Business Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${data.industry ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Industry:</td>
              <td style="padding: 8px 0;">${data.industry}</td>
            </tr>
            ` : ''}
            ${data.callsPerMonth ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Calls/Month:</td>
              <td style="padding: 8px 0;">${data.callsPerMonth.toLocaleString()}</td>
            </tr>
            ` : ''}
            ${data.preferredDateTime ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Preferred Date/Time:</td>
              <td style="padding: 8px 0;">${data.preferredDateTime.toLocaleString()}</td>
            </tr>
            ` : ''}
          </table>

          ${data.additionalMessage ? `
            <h2 style="color: #6366F1; margin-top: 30px; font-size: 20px;">Additional Message</h2>
            <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #6366F1; border-radius: 4px; margin-top: 10px;">
              <p style="margin: 0; white-space: pre-wrap;">${data.additionalMessage}</p>
            </div>
          ` : ''}

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
              This email was automatically generated from the Klarson AI website demo booking form.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Format ROI calculator email
 */
export function formatRoiCalculatorEmail(data: {
  email: string;
  fullName?: string;
  company?: string;
  industry: string;
  callsPerMonth: number;
  currentResponseRate: number;
  avgClientValue: number;
  missedCallsPerMonth?: number;
  lostRevenuePerMonth?: number;
  lostRevenuePerYear?: number;
  totalSavingsPerYear?: number;
  roiPercentage?: number;
  paybackDays?: number;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">💰 New ROI Calculator Submission</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #10B981; margin-top: 0; font-size: 20px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${data.fullName ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Name:</td>
              <td style="padding: 8px 0;">${data.fullName}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #10B981; text-decoration: none;">${data.email}</a></td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company:</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Industry:</td>
              <td style="padding: 8px 0;">${data.industry}</td>
            </tr>
          </table>

          <h2 style="color: #10B981; margin-top: 30px; font-size: 20px;">Calculator Inputs</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Calls/Month:</td>
              <td style="padding: 8px 0;">${data.callsPerMonth.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Current Response Rate:</td>
              <td style="padding: 8px 0;">${data.currentResponseRate}%</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Avg Client Value:</td>
              <td style="padding: 8px 0;">$${data.avgClientValue.toLocaleString()}</td>
            </tr>
          </table>

          <h2 style="color: #10B981; margin-top: 30px; font-size: 20px;">Calculated Results</h2>
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; margin-top: 10px;">
            ${data.missedCallsPerMonth ? `<p style="margin: 8px 0;"><strong>Missed Calls/Month:</strong> ${data.missedCallsPerMonth.toLocaleString()}</p>` : ''}
            ${data.lostRevenuePerMonth ? `<p style="margin: 8px 0;"><strong>Lost Revenue/Month:</strong> $${data.lostRevenuePerMonth.toLocaleString()}</p>` : ''}
            ${data.lostRevenuePerYear ? `<p style="margin: 8px 0;"><strong>Lost Revenue/Year:</strong> $${data.lostRevenuePerYear.toLocaleString()}</p>` : ''}
            ${data.totalSavingsPerYear ? `<p style="margin: 8px 0; font-size: 18px; color: #059669;"><strong>💎 Total Savings/Year:</strong> $${data.totalSavingsPerYear.toLocaleString()}</p>` : ''}
            ${data.roiPercentage ? `<p style="margin: 8px 0; font-size: 18px; color: #059669;"><strong>📈 ROI:</strong> ${data.roiPercentage.toLocaleString()}%</p>` : ''}
            ${data.paybackDays ? `<p style="margin: 8px 0;"><strong>⏱️ Payback Period:</strong> ${data.paybackDays} days</p>` : ''}
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
              This email was automatically generated from the Klarson AI ROI Calculator.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Format partner application email
 */
export function formatPartnerApplicationEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  partnerType: string;
  aiVoipExperience?: string;
  targetMarket?: string;
  potentialClients?: number;
  estimatedMonthlyBudget?: number;
  portfolioDocument?: string;
}): string {
  const partnerTypeLabels: Record<string, string> = {
    reseller: 'Reseller',
    integrator: 'Integrator',
    consultant: 'Consultant',
    agency: 'Agency',
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🤝 New Partner Application</h1>
        </div>
        
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #F59E0B; margin-top: 0; font-size: 20px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Name:</td>
              <td style="padding: 8px 0;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #F59E0B; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company:</td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Partner Type:</td>
              <td style="padding: 8px 0;"><span style="background: #FEF3C7; padding: 4px 12px; border-radius: 12px; font-weight: 500;">${partnerTypeLabels[data.partnerType] || data.partnerType}</span></td>
            </tr>
          </table>

          <h2 style="color: #F59E0B; margin-top: 30px; font-size: 20px;">Business Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${data.targetMarket ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Target Market:</td>
              <td style="padding: 8px 0;">${data.targetMarket}</td>
            </tr>
            ` : ''}
            ${data.potentialClients ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Potential Clients:</td>
              <td style="padding: 8px 0;">${data.potentialClients.toLocaleString()}</td>
            </tr>
            ` : ''}
            ${data.estimatedMonthlyBudget ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Estimated Monthly Budget:</td>
              <td style="padding: 8px 0;">€${data.estimatedMonthlyBudget.toLocaleString()}</td>
            </tr>
            ` : ''}
          </table>

          ${data.aiVoipExperience ? `
            <h2 style="color: #F59E0B; margin-top: 30px; font-size: 20px;">AI/VoIP Experience</h2>
            <div style="background: #fffbeb; padding: 15px; border-left: 4px solid #F59E0B; border-radius: 4px; margin-top: 10px;">
              <p style="margin: 0; white-space: pre-wrap;">${data.aiVoipExperience}</p>
            </div>
          ` : ''}

          ${data.portfolioDocument ? `
            <div style="margin-top: 30px; padding: 15px; background: #f9fafb; border-radius: 8px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-weight: bold;">📄 Portfolio Document</p>
              <a href="${data.portfolioDocument}" style="display: inline-block; background: #F59E0B; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">View Portfolio</a>
            </div>
          ` : ''}

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
              This email was automatically generated from the Klarson AI Partner Application form.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
