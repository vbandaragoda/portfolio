"use client";

import { useState } from "react";

const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/xgavgqpn";

const initialForm = {
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));

    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const honeypot = new FormData(event.currentTarget).get("_gotcha");
    const submission = {
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!submission.email || !submission.subject || !submission.message) {
      setStatus({
        type: "error",
        message: "Please complete all fields before sending your message.",
      });
      return;
    }

    if (!formspreeEndpoint) {
      setStatus({
        type: "error",
        message: "The contact form is not configured yet. Please try again later.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending your message…" });

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...submission,
          _gotcha: honeypot,
          _subject: `Portfolio contact: ${submission.subject}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        message: "Thanks! Your message has been sent successfully.",
      });
    } catch (error) {
      console.error("Unable to send contact message:", error);
      setStatus({
        type: "error",
        message: "Your message could not be sent. Please try again in a moment.",
      });
    }
  };

  const isSubmitting = status.type === "loading";

  return (
    <section id="contact" className="bg-white px-5 dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
          Contact me
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got an idea? Want to discuss a new project? Need help planning your
          event? Let me know.
        </p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              maxLength={254}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              maxLength={150}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let me know how I can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              maxLength={5000}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a message..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="block py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-teal-600 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 mx-auto"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>

          {status.message && (
            <p
              role="status"
              aria-live="polite"
              className={`text-center text-sm ${
                status.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : status.type === "error"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
