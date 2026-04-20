import { describe, it, expect } from 'vitest';
import { sendEmail } from './email';

describe('Resend Email Service', () => {
  it('should send a test email successfully', async () => {
    const result = await sendEmail({
      to: 'contact@klarsonai.com',
      subject: 'Test Email - Resend Configuration',
      html: '<h1>Test Email</h1><p>This is a test email to verify Resend configuration.</p>',
    });

    expect(result).toBe(true);
  }, 30000); // 30 second timeout for email API call
});
