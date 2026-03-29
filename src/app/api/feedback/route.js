import { NextResponse } from "next/server";

export async function POST(request) {
  const { message, email } = await request.json();

  if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 500) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const replyTo = email && email.includes("@") ? email.trim() : undefined;

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 500px;">
      <h3 style="color: #FF5733;">New Feedback — Pick One</h3>
      <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message.trim())}</p>
      ${replyTo ? `<p style="color: #666; font-size: 13px;">Reply-to: ${escapeHtml(replyTo)}</p>` : '<p style="color: #999; font-size: 13px;">No email provided</p>'}
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Pick One <onboarding@resend.dev>",
      to: process.env.FEEDBACK_EMAIL,
      subject: "[PickOne Feedback] New message",
      html: htmlBody,
      ...(replyTo && { reply_to: replyTo }),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
