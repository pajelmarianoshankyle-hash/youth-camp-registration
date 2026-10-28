const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const nodemailer = require('nodemailer');
const { initDatabase, addRegistration, getRegistrations, approveRegistration, deleteRegistration, getRegistrationById, updatePaymentStatus } = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const adminUser = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'camp2026';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'camp-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 8 }
}));

function ensureAdmin(req, res, next) {
  if (req.session && req.session.adminLoggedIn) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' });
}

async function sendEmail({ to, subject, html }) {
  const emailEnabled = process.env.EMAIL_ENABLED === 'true';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!emailEnabled || !smtpHost || !smtpUser || !smtpPass) {
    console.log('Email disabled or SMTP config missing. Email preview:');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log(html);
    return { success: true, preview: true };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: smtpUser, pass: smtpPass }
  });

  return transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Grace Haven Camp <noreply@example.com>',
    to,
    subject,
    html
  });
}

async function createStripeCheckoutSession(registration) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SUCCESS_URL || !process.env.STRIPE_CANCEL_URL) {
    return null;
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Camp Registration - ${registration.program}`,
          description: `${registration.child_name} | ${registration.session}`
        },
        unit_amount: Math.round((registration.amount || 150) * 100),
      },
      quantity: 1,
    }],
    customer_email: registration.email,
    success_url: `${process.env.STRIPE_SUCCESS_URL}?registrationId=${registration.id}`,
    cancel_url: `${process.env.STRIPE_CANCEL_URL}?registrationId=${registration.id}`,
    metadata: {
      registrationId: registration.id,
      childName: registration.child_name,
      parentEmail: registration.email
    }
  });

  return session;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Grace Haven API is running' });
});

app.post('/api/register', async (req, res) => {
  try {
    const registration = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      guardian_name: req.body.guardianName,
      email: req.body.email,
      phone: req.body.phone,
      child_name: req.body.childName,
      age: Number(req.body.age),
      program: req.body.program,
      session: req.body.session,
      notes: req.body.notes || '',
      amount: Number(req.body.amount || 150),
      status: 'Pending',
      payment_status: 'Unpaid',
      created_at: new Date().toISOString(),
      approved_at: null,
      paid_at: null
    };

    await addRegistration(registration);
    res.json({ success: true, message: 'Registration submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not submit registration.' });
  }
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === adminUser && password === adminPassword) {
    req.session.adminLoggedIn = true;
    return res.json({ success: true, message: 'Logged in successfully.' });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password.' });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: 'Logged out.' });
  });
});

app.get('/api/admin/registrations', ensureAdmin, async (req, res) => {
  try {
    const registrations = await getRegistrations();
    res.json({ success: true, registrations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not load registrations.' });
  }
});

app.post('/api/admin/registrations/:id/approve', ensureAdmin, async (req, res) => {
  try {
    const registration = await getRegistrationById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    const updated = await approveRegistration(req.params.id);

    const approvalHtml = `
      <div style="font-family: Arial; color: #1d2a2f;">
        <h2>Registration Approved</h2>
        <p>Hello ${registration.guardian_name},</p>
        <p>Your child <strong>${registration.child_name}</strong> has been approved for the <strong>${registration.program}</strong> program.</p>
        <p>Session: <strong>${registration.session}</strong></p>
        <p>Please complete your payment to secure your spot.</p>
        <p>
          <a href="${process.env.BASE_URL || 'http://localhost:3000'}" style="display:inline-block;padding:12px 18px;background:#c9a96a;color:#1d2d3c;text-decoration:none;border-radius:8px;">Pay Now</a>
        </p>
      </div>
    `;

    await sendEmail({
      to: registration.email,
      subject: 'Your Youth Camp Registration Has Been Approved',
      html: approvalHtml
    });

    res.json({ success: true, registration: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not approve registration.' });
  }
});

app.post('/api/admin/registrations/:id/delete', ensureAdmin, async (req, res) => {
  try {
    await deleteRegistration(req.params.id);
    res.json({ success: true, message: 'Registration deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not delete registration.' });
  }
});

app.post('/api/create-checkout-session', ensureAdmin, async (req, res) => {
  try {
    const { registrationId } = req.body;
    if (!registrationId) {
      return res.status(400).json({ success: false, message: 'Registration ID is required.' });
    }

    const registration = await getRegistrationById(registrationId);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    const session = await createStripeCheckoutSession(registration);

    if (!session) {
      return res.status(400).json({ success: false, message: 'Stripe is not configured. Add STRIPE_SECRET_KEY and the redirect URLs in your .env file.' });
    }

    await updatePaymentStatus(registrationId, 'Pending Payment', session.id);

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Could not create payment session.' });
  }
});

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    console.error('Webhook signature failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const registrationId = session.metadata?.registrationId;
    if (registrationId) {
      const registration = await getRegistrationById(registrationId);
      if (registration) {
        await updatePaymentStatus(registrationId, 'Paid', session.id);

        const receiptHtml = `
          <div style="font-family: Arial; color: #1d2a2f;">
            <h2>Payment Receipt</h2>
            <p>Hello ${registration.guardian_name},</p>
            <p>Thank you for registering your child <strong>${registration.child_name}</strong> for <strong>${registration.program}</strong>.</p>
            <p>Amount Paid: <strong>$${registration.amount}</strong></p>
            <p>Session: <strong>${registration.session}</strong></p>
            <p>Receipt ID: <strong>${session.id}</strong></p>
          </div>
        `;

        await sendEmail({
          to: registration.email,
          subject: 'Camp Registration Receipt',
          html: receiptHtml
        });
      }
    }
  }

  res.json({ received: true });
});

app.get('/api/admin/session', ensureAdmin, (req, res) => {
  res.json({ success: true, admin: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Grace Haven server running at http://localhost:${PORT}`);
  });
}

startServer();
