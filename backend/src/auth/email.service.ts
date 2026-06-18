import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';

type VerificationMail = {
  to: string;
  firstName: string;
  code: string;
  verifyUrl: string;
};

function getOptionalNumberEnv(name: string, fallback: number) {
  const value = process.env[name]?.trim();
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private getTransporter() {
    const host = process.env.SMTP_HOST?.trim();
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim();

    if (!host || !user || !pass) {
      if (process.env.NODE_ENV === 'production') {
        throw new BadRequestException(
          'SMTP для подтверждения email не настроен',
        );
      }
      return null;
    }

    const port = getOptionalNumberEnv('SMTP_PORT', 465);
    const secure =
      (process.env.SMTP_SECURE || String(port === 465)).toLowerCase() ===
      'true';

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  async sendVerificationEmail(mail: VerificationMail) {
    const from =
      process.env.SMTP_FROM?.trim() ||
      process.env.SMTP_USER?.trim() ||
      'CandyCraft <no-reply@localhost>';

    const transporter = this.getTransporter();
    if (!transporter) {
      this.logger.warn(
        `SMTP не настроен. Код подтверждения для ${mail.to}: ${mail.code}. Ссылка: ${mail.verifyUrl}`,
      );
      return;
    }

    await transporter.sendMail({
      from,
      to: mail.to,
      subject: 'Подтвердите email в CandyCraft',
      text: [
        `Здравствуйте, ${mail.firstName}!`,
        '',
        'Подтвердите email для аккаунта CandyCraft.',
        `Код подтверждения: ${mail.code}`,
        `Или откройте ссылку: ${mail.verifyUrl}`,
        '',
        'Если вы не регистрировались, просто проигнорируйте это письмо.',
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#222">
          <h2 style="margin:0 0 16px">Подтвердите email</h2>
          <p>Здравствуйте, ${mail.firstName}!</p>
          <p>Чтобы завершить регистрацию в CandyCraft, нажмите кнопку или введите код на сайте.</p>
          <p style="font-size:24px;font-weight:700;letter-spacing:6px">${mail.code}</p>
          <p>
            <a href="${mail.verifyUrl}" style="display:inline-block;background:#f59e0b;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px">
              Подтвердить email
            </a>
          </p>
          <p style="color:#666;font-size:13px">Если вы не регистрировались, просто проигнорируйте это письмо.</p>
        </div>
      `,
    });
  }
}
