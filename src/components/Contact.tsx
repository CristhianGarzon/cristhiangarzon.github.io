import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { profile } from '../data';
import { useLang } from '../i18n';
import { color, font, media, radius } from '../styles/theme';
import { Button, Card, Muted, Section, SerifEm, TextLink, glow } from '../styles/ui';
import { ArrowIcon, CheckIcon } from './Icons';
import { SectionIndex } from './Sections';

/**
 * Messages are delivered by FormSubmit (https://formsubmit.co) — free, no backend needed.
 * The very first submission sends an activation email to the address below; click the
 * link in it once and every later message lands in your inbox.
 * After activating, you can swap the email for the random alias FormSubmit gives you
 * so your address isn't visible in the page source.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const { t } = useLang();
  const c = t.ui.contact;
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) return; // bot

    setStatus('sending');
    setError('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company') || '—',
          message: data.get('message'),
          _subject: `${c.subject} ${data.get('name')}`,
          _replyto: data.get('email'),
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === 'false' || json.success === false) {
        throw new Error(json.message || c.errorGeneric);
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error && err.message ? err.message : c.errorGeneric);
    }
  }

  return (
    <Section id="contact">
      <ContactCard className="reveal">
        <Intro>
          <SectionIndex>05</SectionIndex>
          <Title>
            {c.title[0]}
            <SerifEm $accent>{c.title[1]}</SerifEm>
            {c.title[2]}
          </Title>
          <Muted as="p">{c.intro}</Muted>
          <EmailLink href={`mailto:${profile.email}`}>{profile.email}</EmailLink>
        </Intro>

        {status === 'sent' ? (
          <Done role="status">
            <DoneIcon>
              <CheckIcon width={28} height={28} />
            </DoneIcon>
            <h3>{c.sentTitle}</h3>
            <Muted as="p">{c.sentBody}</Muted>
            <Button type="button" $variant="ghost" onClick={() => setStatus('idle')}>
              {c.sendAnother}
            </Button>
          </Done>
        ) : (
          <Form onSubmit={onSubmit}>
            <Honeypot type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <FormRow>
              <Field>
                <span>{c.name}</span>
                <input name="name" required autoComplete="name" placeholder={c.namePlaceholder} />
              </Field>
              <Field>
                <span>{c.email}</span>
                <input name="email" type="email" required autoComplete="email" placeholder={c.emailPlaceholder} />
              </Field>
            </FormRow>
            <Field>
              <span>
                {c.company} <em>{c.optional}</em>
              </span>
              <input name="company" autoComplete="organization" placeholder={c.companyPlaceholder} />
            </Field>
            <Field>
              <span>{c.message}</span>
              <textarea name="message" required rows={5} placeholder={c.messagePlaceholder} />
            </Field>
            {status === 'error' && (
              <ErrorText role="alert">
                {error} {c.errorFallback}{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </ErrorText>
            )}
            <Button type="submit" $block disabled={status === 'sending'}>
              {status === 'sending' ? c.sending : c.send} <ArrowIcon />
            </Button>
          </Form>
        )}
      </ContactCard>
    </Section>
  );
}

/* ---------- styles ---------- */

const ContactCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 48px;
  padding: 44px;
  overflow: hidden;

  &::before {
    ${glow(520, 'left: -220px; top: -260px;')}
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 26px 22px;
    gap: 32px;
  }
`;

const Intro = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3.1rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.05;

  ${SerifEm} {
    font-size: 1.1em;
  }
`;

const EmailLink = styled(TextLink)`
  font-family: ${font.mono};
  font-size: 0.85rem;
  letter-spacing: 0.02em;
`;

const Form = styled.form`
  position: relative;
  display: grid;
  gap: 14px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;

  em {
    font-style: normal;
    font-weight: 400;
    color: ${color.muted};
  }

  input,
  textarea {
    width: 100%;
    font: 400 0.95rem / 1.5 ${font.sans};
    color: ${color.text};
    background: ${color.bg};
    border: 1px solid ${color.border};
    border-radius: ${radius.sm};
    padding: 12px 14px;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.4s;
    resize: vertical;
  }

  input::placeholder,
  textarea::placeholder {
    color: color-mix(in srgb, ${color.muted} 70%, transparent);
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: ${color.accent};
    box-shadow: 0 0 0 4px ${color.accentSoft};
  }
`;

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const ErrorText = styled.p`
  font-size: 0.88rem;
  color: ${color.danger};

  a {
    text-decoration: underline;
  }
`;

const Done = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const DoneIcon = styled.span`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${color.accent};
  color: ${color.accentInk};
  margin-bottom: 6px;
`;
