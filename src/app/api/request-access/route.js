import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, accessLevel } = body;

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Initialize Resend with API key from environment
    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipientEmail = process.env.BETA_NOTIFICATION_EMAIL || 'robert.lee@lseg.com';

    console.log('Environment check:', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 7),
      recipientEmail: recipientEmail
    });

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');
      // Fall back to console logging
      console.log('Data Room Access Request (No API Key):');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message || 'No message provided');
      console.log('Timestamp:', new Date().toISOString());
      console.log('---');
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Request received. We will contact you shortly.',
        },
        { status: 200 }
      );
    }

    // Send email notification via Resend
    try {
      console.log('Attempting to send email to:', recipientEmail);
      
      const isFullAccess = accessLevel === 'full';
      const accessType = isFullAccess ? 'Full Data Room Access' : 'Basic Data Room Access';
      const accessBadgeColor = isFullAccess ? '#9333ea' : '#3b82f6';
      
      const result = await resend.emails.send({
        from: 'onboarding@resend.dev', // Use this for testing, change to your verified domain later
        to: recipientEmail,
        replyTo: email, // Allows you to reply directly to the requester
        subject: `${accessType} Request from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #009688 0%, #00796B 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 30px 20px; border-radius: 0 0 8px 8px; }
                .info-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #009688; }
                .info-row { margin: 10px 0; }
                .label { font-weight: 600; color: #009688; }
                .value { color: #333; }
                .message-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
                .footer { text-align: center; color: #666; font-size: 0.875rem; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;">🔐 ${accessType} Request</h1>
                </div>
                <div class="content">
                  <div style="background: ${accessBadgeColor}; color: white; display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; text-transform: uppercase; margin-bottom: 20px;">
                    ${accessType}
                  </div>
                  <p>${isFullAccess ? 'Someone with basic access has requested full access to the Haem.io investor data room.' : 'Someone has requested basic access to the Haem.io investor data room.'}</p>
                  
                  <div class="info-box">
                    <div class="info-row">
                      <span class="label">Name:</span>
                      <span class="value">${name}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Email:</span>
                      <span class="value"><a href="mailto:${email}">${email}</a></span>
                    </div>
                    <div class="info-row">
                      <span class="label">Request Time:</span>
                      <span class="value">${new Date().toLocaleString('en-GB', { 
                        dateStyle: 'full', 
                        timeStyle: 'long',
                        timeZone: 'Europe/London'
                      })}</span>
                    </div>
                  </div>

                  ${message ? `
                  <div class="message-box">
                    <p class="label">Message from requester:</p>
                    <p class="value">${message}</p>
                  </div>
                  ` : ''}

                  <div class="footer">
                    <p><strong>What to do next:</strong></p>
                    ${isFullAccess ? `
                    <p>This user already has basic access (they've logged in and accepted the NDA). They're now requesting full access to additional materials like financial projections and clinical validation data.</p>
                    <p>If you'd like to grant full access, reply to this email with the additional materials or instructions.</p>
                    ` : `
                    <p>If you'd like to grant them basic access, reply to this email with the data room password:<br>
                    <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 4px; font-family: monospace;">Haemio!2025$DataRoom</code></p>
                    `}
                    <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                      <small>This is an automated notification from the Haem.io data room system.</small>
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log('Data room access request email sent successfully:', result);
      
    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError);
      // Still log to console as fallback
      console.log('Data Room Access Request (Email failed, logged to console):');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message || 'No message provided');
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Request received. We will contact you shortly.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing access request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

