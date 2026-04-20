/**
 * Email confirmation templates sent to users after form submission
 * These are auto-responder emails with Klarson branding
 */

const LOGO_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663294812775/HzEtzCSWdKHJHMnD.png';

/**
 * Base email template with Klarson logo and branding
 */
function createBaseTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Logo Header -->
          <div style="background: linear-gradient(135deg, #1a1f3a 0%, #2d3561 100%); padding: 40px 30px; text-align: center;">
            <img src="${LOGO_URL}" alt="Klarson AI" style="max-width: 280px; height: auto; margin: 0 auto; display: block;" />
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            ${content}
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              <strong>Klarson AI</strong> - Your Phone Rings, Your Calendar Fills Up. Automatically.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Questions? Reply to this email or contact us at <a href="mailto:contact@klarsonai.com" style="color: #4169ff; text-decoration: none;">contact@klarsonai.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Demo booking confirmation email to user
 */
export function formatDemoBookingConfirmation(data: {
  fullName: string;
  email: string;
  preferredDateTime?: Date;
}): { subject: string; html: string } {
  const content = `
    <h1 style="color: #1a1f3a; font-size: 28px; margin: 0 0 20px 0; font-weight: 600;">
      ¡Gracias por tu interés, ${data.fullName.split(' ')[0]}! 🎉
    </h1>
    
    <p style="font-size: 16px; color: #4b5563; margin: 0 0 20px 0;">
      Hemos recibido tu solicitud de demo y estamos emocionados de mostrarte cómo <strong>Klarson AI</strong> puede transformar tu negocio.
    </p>
    
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #4169ff; margin: 30px 0;">
      <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 15px 0;">📅 ¿Qué sigue?</h2>
      <p style="margin: 0 0 10px 0; color: #1e3a8a;">
        Nuestro equipo revisará tu solicitud y te contactará <strong>dentro de las próximas 24 horas</strong> para:
      </p>
      <ul style="color: #1e3a8a; margin: 10px 0; padding-left: 20px;">
        <li style="margin: 8px 0;">Confirmar la fecha y hora de tu demo personalizada</li>
        <li style="margin: 8px 0;">Entender mejor tus necesidades específicas</li>
        <li style="margin: 8px 0;">Preparar una demostración adaptada a tu industria</li>
      </ul>
    </div>
    
    ${data.preferredDateTime ? `
      <p style="font-size: 14px; color: #6b7280; margin: 20px 0;">
        <strong>Fecha preferida que indicaste:</strong> ${data.preferredDateTime.toLocaleString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    ` : ''}
    
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="color: #059669; font-size: 16px; margin: 0 0 10px 0;">💡 Mientras tanto...</h3>
      <p style="margin: 0; color: #065f46; font-size: 14px;">
        Echa un vistazo a nuestros <a href="https://klarsonai.com" style="color: #059669; text-decoration: underline;">casos de éxito</a> y descubre cómo empresas como la tuya están automatizando sus llamadas y llenando sus agendas 24/7.
      </p>
    </div>
    
    <p style="font-size: 16px; color: #4b5563; margin: 30px 0 0 0;">
      ¡Nos vemos pronto! 🚀
    </p>
    <p style="font-size: 14px; color: #6b7280; margin: 10px 0 0 0;">
      El equipo de Klarson AI
    </p>
  `;

  return {
    subject: '✅ Demo Confirmada - Klarson AI te contactará en 24h',
    html: createBaseTemplate(content),
  };
}

/**
 * ROI calculator confirmation email to user
 */
export function formatRoiCalculatorConfirmation(data: {
  fullName?: string;
  email: string;
  totalSavingsPerYear?: number;
  roiPercentage?: number;
}): { subject: string; html: string } {
  const firstName = data.fullName ? data.fullName.split(' ')[0] : 'allí';
  
  const content = `
    <h1 style="color: #1a1f3a; font-size: 28px; margin: 0 0 20px 0; font-weight: 600;">
      ¡Hola${data.fullName ? ` ${firstName}` : ''}! 💰
    </h1>
    
    <p style="font-size: 16px; color: #4b5563; margin: 0 0 20px 0;">
      Gracias por calcular tu ROI con <strong>Klarson AI</strong>. Hemos guardado tus resultados y nuestro equipo los revisará para ofrecerte una solución personalizada.
    </p>
    
    ${data.totalSavingsPerYear && data.roiPercentage ? `
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #10B981; margin: 30px 0;">
        <h2 style="color: #059669; font-size: 20px; margin: 0 0 15px 0;">📊 Tu Potencial de Ahorro</h2>
        <p style="font-size: 32px; font-weight: bold; color: #047857; margin: 10px 0;">
          $${data.totalSavingsPerYear.toLocaleString()} / año
        </p>
        <p style="font-size: 18px; color: #065f46; margin: 10px 0;">
          ROI: <strong>${data.roiPercentage.toLocaleString()}%</strong>
        </p>
      </div>
    ` : ''}
    
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #4169ff; margin: 30px 0;">
      <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 15px 0;">🎯 Próximos Pasos</h2>
      <p style="margin: 0; color: #1e3a8a;">
        Nuestro equipo te contactará <strong>dentro de las próximas 24-48 horas</strong> para:
      </p>
      <ul style="color: #1e3a8a; margin: 10px 0; padding-left: 20px;">
        <li style="margin: 8px 0;">Validar estos números con tu caso específico</li>
        <li style="margin: 8px 0;">Mostrarte cómo alcanzar estos ahorros</li>
        <li style="margin: 8px 0;">Diseñar un plan de implementación a tu medida</li>
      </ul>
    </div>
    
    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>💡 ¿Sabías que?</strong> El 87% de nuestros clientes recuperan su inversión en menos de 60 días. Tu negocio podría ser el próximo.
      </p>
    </div>
    
    <p style="font-size: 16px; color: #4b5563; margin: 30px 0 0 0;">
      ¡Hablamos pronto! 📈
    </p>
    <p style="font-size: 14px; color: #6b7280; margin: 10px 0 0 0;">
      El equipo de Klarson AI
    </p>
  `;

  return {
    subject: '💰 Tu Análisis de ROI - Klarson AI',
    html: createBaseTemplate(content),
  };
}

/**
 * Partner application confirmation email to user
 */
export function formatPartnerApplicationConfirmation(data: {
  fullName: string;
  email: string;
  partnerType: string;
  company: string;
}): { subject: string; html: string } {
  const partnerTypeLabels: Record<string, string> = {
    reseller: 'Revendedor',
    integrator: 'Integrador',
    consultant: 'Consultor',
    agency: 'Agencia',
  };

  const content = `
    <h1 style="color: #1a1f3a; font-size: 28px; margin: 0 0 20px 0; font-weight: 600;">
      ¡Bienvenido al Programa de Partners, ${data.fullName.split(' ')[0]}! 🤝
    </h1>
    
    <p style="font-size: 16px; color: #4b5563; margin: 0 0 20px 0;">
      Gracias por tu interés en convertirte en <strong>${partnerTypeLabels[data.partnerType] || data.partnerType}</strong> de <strong>Klarson AI</strong>. Hemos recibido tu aplicación y estamos emocionados de explorar esta oportunidad contigo.
    </p>
    
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #F59E0B; margin: 30px 0;">
      <h2 style="color: #92400e; font-size: 18px; margin: 0 0 15px 0;">📋 Tu Aplicación</h2>
      <table style="width: 100%; color: #78350f;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Empresa:</td>
          <td style="padding: 8px 0;">${data.company}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Tipo de Partner:</td>
          <td style="padding: 8px 0;">${partnerTypeLabels[data.partnerType] || data.partnerType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Estado:</td>
          <td style="padding: 8px 0;"><span style="background: #fbbf24; padding: 4px 12px; border-radius: 12px; font-weight: 500; color: #78350f;">En Revisión</span></td>
        </tr>
      </table>
    </div>
    
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #4169ff; margin: 30px 0;">
      <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 15px 0;">🚀 Proceso de Selección</h2>
      <ol style="color: #1e3a8a; margin: 10px 0; padding-left: 20px;">
        <li style="margin: 12px 0;"><strong>Revisión inicial</strong> - Evaluamos tu perfil y experiencia (2-3 días hábiles)</li>
        <li style="margin: 12px 0;"><strong>Entrevista</strong> - Llamada con nuestro equipo de partnerships para conocernos mejor</li>
        <li style="margin: 12px 0;"><strong>Onboarding</strong> - Si eres seleccionado, te daremos acceso a materiales, training y soporte</li>
      </ol>
    </div>
    
    <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="color: #059669; font-size: 16px; margin: 0 0 10px 0;">💎 Beneficios del Programa</h3>
      <ul style="color: #065f46; margin: 10px 0; padding-left: 20px; font-size: 14px;">
        <li style="margin: 8px 0;">Comisiones competitivas y recurrentes</li>
        <li style="margin: 8px 0;">Soporte técnico y comercial dedicado</li>
        <li style="margin: 8px 0;">Materiales de marketing y demos personalizadas</li>
        <li style="margin: 8px 0;">Acceso prioritario a nuevas funcionalidades</li>
      </ul>
    </div>
    
    <p style="font-size: 16px; color: #4b5563; margin: 30px 0 0 0;">
      Te contactaremos pronto con los siguientes pasos. 🎯
    </p>
    <p style="font-size: 14px; color: #6b7280; margin: 10px 0 0 0;">
      El equipo de Partnerships de Klarson AI
    </p>
  `;

  return {
    subject: '🤝 Aplicación Recibida - Programa de Partners Klarson AI',
    html: createBaseTemplate(content),
  };
}
