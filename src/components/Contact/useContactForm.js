import { useState, useCallback, useEffect } from "react";

export function useContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const open = useCallback(() => {
    setStatus("");
    setIsOpen(true);
  }, []);

  const cancel = useCallback(() => {
    setIsOpen(false);
    setStatus("Thanks for taking the time! Feel free to reach out anytime.");
  }, []);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsSending(true);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("API error:", response.status, text);
          throw new Error(text || "Failed to send");
        }

        setStatus(
          "Thank you for your message! We have received it and appreciate you reaching out."
        );
        setIsOpen(false);
        setName("");
        setEmail("");
        setMessage("");
      } catch (error) {
        setStatus("Something went wrong. Please try again later.");
      } finally {
        setIsSending(false);
      }
    },
    [name, email, message]
  );

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  return {
    isOpen,
    open,
    cancel,
    submit,
    isSending,
    status,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
  };
}
