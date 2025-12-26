import React from "react";
const ContactModal = ({
  isOpen,
  onCancel,
  onSubmit,
  isSending,
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="contact-modal" role="dialog" aria-modal="true">
      <div className="contact-modal-card">
        <h2>Send a message</h2>
        <p>Share a quick note and I will reply as soon as possible.</p>

        <form onSubmit={onSubmit}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            rows="4"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="contact-modal-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
