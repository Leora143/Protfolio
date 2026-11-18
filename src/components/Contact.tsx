import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { profile } from "../data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { GithubIcon, MailIcon, PinIcon } from "./icons";

interface Values {
  name: string;
  email: string;
  message: string;
}
type Errors = Partial<Record<keyof Values, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your name";
  if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address";
  if (values.message.trim().length < 10) errors.message = "Write a short message, at least 10 characters";
  return errors;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-ink-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setSent(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const rows = [
    { icon: MailIcon, label: profile.email, href: `mailto:${profile.email}` },
    { icon: GithubIcon, label: profile.githubLabel, href: profile.github },
    { icon: PinIcon, label: profile.location, href: undefined },
  ];

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" title="Contact" />

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-lg leading-[1.7] text-ink-2">
              Tell me about the role or project and I will reply by email.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {rows.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <Icon className="shrink-0 text-ink-3" />
                    <span className="break-all">{label}</span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center gap-3 py-4 transition-colors duration-150 hover:text-accent"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 py-4 transition-colors duration-150 hover:text-accent">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={50}>
            <form onSubmit={onSubmit} noValidate className="card flex flex-col gap-5 p-6 sm:p-8">
              <Field id="contact-name" label="Your name" error={errors.name}>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={values.name}
                  onChange={update("name")}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className="field"
                />
              </Field>
              <Field id="contact-email" label="Email" error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={update("email")}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className="field"
                />
              </Field>
              <Field id="contact-message" label="Message" error={errors.message}>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell me about the role or project"
                  value={values.message}
                  onChange={update("message")}
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="field h-auto resize-y py-3"
                />
              </Field>

              <button type="submit" className="btn btn-primary w-full">
                Send message
              </button>

              <p role="status" aria-live="polite" className="min-h-6 text-sm text-ink-2">
                {sent
                  ? `Your email app should open with the message ready. If it does not, write to ${profile.email}.`
                  : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
