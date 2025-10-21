import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    console.log('=== EMAIL TEST STARTING ===');
    
    // Check environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.BETA_NOTIFICATION_EMAIL || 'robert.lee@lseg.com';
    
    console.log('Environment Variables:');
    console.log('- RESEND_API_KEY exists:', !!apiKey);
    console.log('- RESEND_API_KEY prefix:', apiKey?.substring(0, 10));
    console.log('- BETA_NOTIFICATION_EMAIL:', recipientEmail);
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not found in environment variables',
        hint: 'Make sure .env.local exists with RESEND_API_KEY=re_...'
      });
    }

    // Initialize Resend
    const resend = new Resend(apiKey);
    console.log('Resend initialized');

    // Try to send a test email
    console.log('Attempting to send test email to:', recipientEmail);
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipientEmail,
      subject: 'Test Email from Haem.io Data Room',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #009688;">Test Email Successful! ✓</h1>
            <p>This is a test email from your Haem.io data room.</p>
            <p><strong>If you received this, your email configuration is working correctly.</strong></p>
            <hr>
            <p style="color: #666; font-size: 14px;">
              Recipient: ${recipientEmail}<br>
              Sent: ${new Date().toISOString()}
            </p>
          </body>
        </html>
      `,
    });

    console.log('Email sent successfully!');
    console.log('Result:', result);

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      emailId: result.id,
      recipient: recipientEmail,
      checkSpamFolder: true,
      result: result
    });

  } catch (error) {
    console.error('=== EMAIL TEST FAILED ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error details:', JSON.stringify(error, null, 2));

    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.toString(),
      hint: 'Check console for detailed error logs'
    }, { status: 500 });
  }
}

