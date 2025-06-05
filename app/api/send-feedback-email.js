// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/api/send-feedback-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { to, subject, text } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Feedback <onboarding@resend.dev>", // Replace with your domain once verified
      to,
      subject,
      text,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Email sent successfully", data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}