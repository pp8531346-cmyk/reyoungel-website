import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactBody = {
  name: string;
  clinicName: string;
  phone: string;
  email: string;
  message: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactBody>;
  const { name, clinicName, phone, email, message } = body;

  if (!name || !clinicName || !phone || !email || !message) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!apiKey || !contactEmail) {
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Reyoungel Website <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `פנייה חדשה מהאתר — ${name}`,
    text: `שם: ${name}\nקליניקה: ${clinicName}\nטלפון: ${phone}\nאימייל: ${email}\n\nהודעה:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ status: "sent" });
}
