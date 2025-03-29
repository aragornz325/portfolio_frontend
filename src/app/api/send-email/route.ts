import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getRandomHaloPhrase, getRandomStoicQuote } from '@/core/hailing/phrases'

export async function POST(req: Request) {
  const { email, phone, location, message } = await req.json()

  if (!email || !message) {
    return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 📥 Email para Rodrigo
    const adminHtml = `
      <div style="background-color: #0d0d0d; color: #00ffcc; font-family: monospace; padding: 20px; border-radius: 8px;">
        <h2>📡 NUEVA SEÑAL ENTRANTE</h2>
        <p><strong>Correo:</strong> ${email}</p>
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
        ${location ? `<p><strong>Ubicación:</strong> ${location}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <pre style="background: #111; padding: 10px; border-left: 2px solid #00ffcc;">${message}</pre>
        <hr style="margin-top: 20px; border-color: #00ffcc;" />
        <p style="font-size: 12px; opacity: 0.6;">Transmisión recibida a través del HUD Web Spartan.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Cortana" <${process.env.EMAIL_USER}>`,
      to: "rodrigo.m.quintero@gmail.com",
      subject: "📡 Nueva transmisión entrante desde HUD Web",
      html: adminHtml,
    });

    // 📤 Email de confirmación al remitente
    const halo = getRandomHaloPhrase();
    const stoic = getRandomStoicQuote();

    const confirmHtml = `
      <div style="background-color: #0f0f0f; color: #c3f3ff; font-family: monospace; padding: 20px; border-radius: 8px;">
        <h2>✔️ Transmisión Recibida</h2>
        <p>Tu señal ha sido interceptada correctamente por la IA Cortana.</p>
        <p>Un Spartan será enviado si la situación lo requiere.</p>
        <br />
        <strong>⚔️ Mensaje del campo de batalla:</strong><br/>
        <blockquote style="color: #00ffff; font-style: italic; margin: 12px 0;">"${halo}"</blockquote>

        <strong>🧠 Frase para tu espíritu:</strong><br/>
        <blockquote style="color: #ffd700; font-style: italic; margin: 12px 0;">"${stoic}"</blockquote>

        <hr style="margin-top: 20px; border-color: #333;" />
        <p style="font-size: 12px; opacity: 0.6;">HUD Web Spartan • Cortana AI v1.0</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Cortana" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✔️ Confirmación: Tu mensaje fue recibido",
      html: confirmHtml,
    });

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al enviar los correos:', error)
    return NextResponse.json({ error: 'Error interno al enviar los correos' }, { status: 500 })
  }
}
