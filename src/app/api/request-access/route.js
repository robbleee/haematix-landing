import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

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

    // In a production environment, you would send an actual email here
    // Using a service like Resend, SendGrid, or AWS SES
    // For now, we'll just log the request and return success
    
    console.log('Data Room Access Request:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message || 'No message provided');
    console.log('Timestamp:', new Date().toISOString());
    console.log('---');

    // Here's where you would integrate with an email service
    // Example with Resend (commented out):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'dataroom@haem.io',
      to: 'robert.lee@haem.io',
      subject: 'New Data Room Access Request',
      html: `
        <h2>New Data Room Access Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });
    */

    // For now, we'll use a simple fetch to send email via a mailto link simulation
    // Or you can set up Resend/SendGrid later
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Request received. We will contact you shortly.',
        // In development, include the submitted data for verification
        debug: process.env.NODE_ENV === 'development' ? { name, email, message } : undefined
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

