import nodemailer, { type Transporter } from 'nodemailer';

export const QUERY_NOTIFICATION_EMAIL = (
  process.env.QUERY_NOTIFICATION_EMAIL || '25sp2180007@student.hindustanuniv.ac.in'
).trim();

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface EmailSendResult {
  sent: boolean;
  transport: 'smtp' | 'resend' | 'none';
  targetEmail: string;
  reason?: string;
}

let cachedTransporter: Transporter | null = null;

function getSmtpTransporter(): Transporter | null {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  if (!user || !pass) return null;

  if (!cachedTransporter) {
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
    cachedTransporter = nodemailer.createTransport({
      host: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
      port,
      secure,
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

async function sendEmail(params: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<EmailSendResult> {
  const smtpTransporter = getSmtpTransporter();
  if (smtpTransporter) {
    const smtpUser = (process.env.SMTP_USER || '').trim();
    const from = (process.env.EMAIL_FROM || `"Hindustan University Portal" <${smtpUser}>`).trim();
    try {
      await smtpTransporter.sendMail({
        from,
        to: QUERY_NOTIFICATION_EMAIL,
        replyTo: params.replyTo,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
      console.log(`[EmailService] Sent via SMTP to ${QUERY_NOTIFICATION_EMAIL}: ${params.subject}`);
      return { sent: true, transport: 'smtp', targetEmail: QUERY_NOTIFICATION_EMAIL };
    } catch (err: any) {
      console.error('[EmailService] SMTP delivery error:', err?.message || err);
      return {
        sent: false,
        transport: 'smtp',
        targetEmail: QUERY_NOTIFICATION_EMAIL,
        reason: err?.message || 'SMTP send failed',
      };
    }
  }

  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  if (resendApiKey) {
    const from = (process.env.EMAIL_FROM || 'Hindustan University Portal <onboarding@resend.dev>').trim();
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [QUERY_NOTIFICATION_EMAIL],
          reply_to: params.replyTo,
          subject: params.subject,
          text: params.text,
          html: params.html,
        }),
      });
      if (!response.ok) {
        const errText = await response.text();
        console.error('[EmailService] Resend API error:', errText);
        return {
          sent: false,
          transport: 'resend',
          targetEmail: QUERY_NOTIFICATION_EMAIL,
          reason: errText,
        };
      }
      console.log(`[EmailService] Sent via Resend to ${QUERY_NOTIFICATION_EMAIL}: ${params.subject}`);
      return { sent: true, transport: 'resend', targetEmail: QUERY_NOTIFICATION_EMAIL };
    } catch (err: any) {
      console.error('[EmailService] Resend fetch error:', err?.message || err);
      return {
        sent: false,
        transport: 'resend',
        targetEmail: QUERY_NOTIFICATION_EMAIL,
        reason: err?.message || 'Resend send failed',
      };
    }
  }

  console.warn(
    `[EmailService] Target email is ${QUERY_NOTIFICATION_EMAIL}, but SMTP_USER/SMTP_PASS or RESEND_API_KEY is not configured.`
  );
  return {
    sent: false,
    transport: 'none',
    targetEmail: QUERY_NOTIFICATION_EMAIL,
    reason: 'Email transport credentials (SMTP_USER/SMTP_PASS or RESEND_API_KEY) not configured.',
  };
}

export async function sendQueryNotificationEmail(params: {
  query: string;
  answer: string;
  categoryFilter?: string;
  sourcesCount: number;
  latencyMs: number;
}): Promise<EmailSendResult> {
  const timestamp = new Date().toISOString();
  const preview = params.query.replace(/\s+/g, ' ').trim().slice(0, 70);
  const subject = `[HITS Portal Query] ${preview}${params.query.length > 70 ? '...' : ''}`;
  const truncatedAnswer = params.answer.length > 2500 ? `${params.answer.slice(0, 2500)}...` : params.answer;

  const text = [
    'New Campus Advisory Portal Query',
    `Timestamp: ${timestamp}`,
    `Category Filter: ${params.categoryFilter || 'All'}`,
    `Retrieved Sources: ${params.sourcesCount}`,
    `Response Latency: ${params.latencyMs}ms`,
    '',
    'Student Query:',
    params.query,
    '',
    'Assistant Response:',
    truncatedAnswer,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #0f172a;">
      <h2 style="color: #b45309; margin-bottom: 8px;">New Hindustan University Portal Query</h2>
      <p style="font-size: 13px; color: #475569; margin-top: 0;">
        <strong>Timestamp:</strong> ${escapeHtml(timestamp)}<br />
        <strong>Category:</strong> ${escapeHtml(params.categoryFilter || 'All')}<br />
        <strong>Matched Sources:</strong> ${params.sourcesCount} (${params.latencyMs}ms)
      </p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin: 14px 0;">
        <div style="font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Student Query</div>
        <div style="font-size: 15px; white-space: pre-wrap;">${escapeHtml(params.query)}</div>
      </div>
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px;">
        <div style="font-size: 12px; font-weight: bold; color: #92400e; text-transform: uppercase; margin-bottom: 6px;">Generated Response</div>
        <div style="font-size: 14px; white-space: pre-wrap;">${escapeHtml(truncatedAnswer)}</div>
      </div>
    </div>
  `;

  return sendEmail({ subject, text, html });
}

export async function sendAdmissionInquiryEmail(params: {
  applicationId: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  state?: string;
  marks?: string;
}): Promise<EmailSendResult> {
  const timestamp = new Date().toISOString();
  const subject = `[HITS Admission Inquiry ${params.applicationId}] ${params.name} - ${params.course}`;

  const text = [
    'New Admission Inquiry Submitted',
    `Application ID: ${params.applicationId}`,
    `Timestamp: ${timestamp}`,
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    `Phone / WhatsApp: ${params.phone}`,
    `Intended Course: ${params.course}`,
    `State / Region: ${params.state || 'Not provided'}`,
    `12th PCM / Marks (%): ${params.marks || 'Not provided'}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
      <h2 style="color: #b45309;">New Admission Inquiry (${escapeHtml(params.applicationId)})</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Candidate Name</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.name)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.email)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone / WhatsApp</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.phone)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Intended Program</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.course)}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">State / Region</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.state || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">12th PCM / Marks (%)</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(params.marks || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Submitted At</td><td style="padding: 8px;">${escapeHtml(timestamp)}</td></tr>
      </table>
    </div>
  `;

  return sendEmail({
    subject,
    text,
    html,
    replyTo: params.email,
  });
}
