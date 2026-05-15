import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return "Please fill name, email and message.";
    }
    // basic email check
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }
    // No backend here — example shows mailto fallback
    const mailtoLink = `mailto:hello@keshvika.com?subject=${encodeURIComponent(
      form.subject || "Customer message from website"
    )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    // Open user's email client
    window.location.href = mailtoLink;
    setStatus({ type: "success", message: "Opening your email client... (or copy+paste the message)" });
  }

  return (
    <main className="contact-page">
      <header className="contact-hero">
        <div className="contact-hero-inner">
          <h1>Contact Keshvika</h1>
          <p>We're here to help — reach out for orders, customizations, or partnership queries.</p>
        </div>
      </header>

      <section className="contact-grid">
        <div className="contact-card contact-info">
          <h2>Get in touch</h2>
          <p className="muted">Prefer a direct call? We’re available during business hours.</p>

          <ul className="info-list">
            <li><strong>Email:</strong> hello@keshvika.com</li>
            <li><strong>Phone:</strong> +91 98765 43210</li>
            <li><strong>Address:</strong> Shop No. 12, Fashion Street, YourCity</li>
          </ul>

          <div className="hours">
            <h4>Hours</h4>
            <p className="muted">Mon - Sat: 10:00 AM - 7:00 PM</p>
          </div>
        </div>

        <div className="contact-card contact-form">
          <h2>Send us a message</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            </label>

            <label>
              Email
              <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>

            <label>
              Subject
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject (optional)" />
            </label>

            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" placeholder="Tell us about your request" />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-primary"> Message</button>
              <button type="button" className="btn-outline" onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}>Clear</button>
            </div>

            {status && (
              <p className={`status ${status.type === "error" ? "err" : "ok"}`}>{status.message}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
