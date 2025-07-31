import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_UPigjgyE_DnAmvVFaRq3iFrV9KTF4gkB9');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, institution, role, experience, message } = body;

    // Basic validation
    if (!name || !email || !institution || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email to you with the beta request details
    const { data, error } = await resend.emails.send({
      from: 'Haem.io Beta <onboarding@resend.dev>', // Using Resend's default domain for now
      to: ['haemio76@gmail.com'],
      subject: `New Beta Access Request - ${name} from ${institution}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">New Haem.io Beta Access Request</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Applicant Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Experience:</strong> ${experience || 'Not specified'}</p>
          </div>

          ${message ? `
            <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Additional Message</h3>
              <p>${message}</p>
            </div>
          ` : ''}

          <div style="background: #0d9488; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Reply to this applicant:</strong> ${email}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Email sending error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message || error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Beta request submitted successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}