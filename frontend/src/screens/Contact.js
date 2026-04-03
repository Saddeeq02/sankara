import { renderNavbar, renderFooter } from '../components/Navigation';

export function renderContactScreen() {
  const container = document.createElement('div');

  const pageHeader = document.createElement('header');
  pageHeader.style.padding = '120px 0 40px';
  pageHeader.style.background = '#f9f9f9';
  pageHeader.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 10px;">Connect With Us</h1>
      <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
        Interested in our premium agricultural machinery? Reach out for a quote or professional advice.
      </p>
    </div>
  `;

  const contactSection = document.createElement('section');
  contactSection.style.padding = '80px 0 100px';
  contactSection.innerHTML = `
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 60px;">
      <div class="contact-info">
        <h2 style="margin-bottom: 30px;">Contact Details</h2>
        <div style="margin-bottom: 25px;">
          <h4 style="color: var(--primary-color);">Address</h4>
          <p style="color: var(--text-muted);">Sankara Nigeria Limited, Nigeria.</p>
        </div>
        <div style="margin-bottom: 25px;">
          <h4 style="color: var(--primary-color);">Phone</h4>
          <p style="color: var(--text-muted);">+234-809-993-3644</p>
        </div>
        <div style="margin-bottom: 25px;">
          <h4 style="color: var(--primary-color);">Email</h4>
          <p style="color: var(--text-muted);">sankaranigerialimited@gmail.com</p>
        </div>
      </div>
      
      <div class="contact-form" style="background: white; padding: 40px; border-radius: var(--border-radius); box-shadow: var(--card-shadow);">
        <h2 style="margin-bottom: 30px;">Send a Message</h2>
        <form id="inquiry-form" style="display: grid; gap: 20px;">
          <div style="display: grid; gap: 8px;">
            <label style="font-weight: 600;">Full Name</label>
            <input type="text" name="name" placeholder="Enter your full name" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="display: grid; gap: 8px;">
            <label style="font-weight: 600;">Email Address</label>
            <input type="email" name="email" placeholder="email@example.com" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="display: grid; gap: 8px;">
            <label style="font-weight: 600;">Phone Number</label>
            <input type="tel" name="phone" placeholder="e.g., +234 800 0000" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="display: grid; gap: 8px;">
            <label style="font-weight: 600;">Message Subject</label>
            <input type="text" name="subject" placeholder="e.g., Request for Quote" required style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit;">
          </div>
          <div style="display: grid; gap: 8px;">
            <label style="font-weight: 600;">Message Content</label>
            <textarea name="message" rows="4" placeholder="How can we help you?" required style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
          </div>
          <button type="submit" id="submit-btn" class="btn-primary" style="width: 100%; font-size: 1.1rem; padding: 15px;">Send Inquiry</button>
        </form>
      </div>
    </div>
  `;

  const form = contactSection.querySelector('#inquiry-form');
  const submitBtn = contactSection.querySelector('#submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Thank you for your interest! Your message has been sent successfully.');
        form.reset();
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (err) {
      alert('Sorry, there was an error sending your message. Please try again later.');
      console.error(err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
    }
  });

  container.appendChild(renderNavbar());
  container.appendChild(pageHeader);
  container.appendChild(contactSection);
  container.appendChild(renderFooter());

  return container;
}
