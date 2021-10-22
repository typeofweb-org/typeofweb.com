import Link from 'next/link';
import { memo, useCallback, useState, useEffect } from 'react';

import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Checkbox } from '../atoms/Checkbox';
import { Input } from '../atoms/Input';
import { SectionTitle } from '../atoms/SectionTitle';

type State = 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR';

export const NewsletterForm = memo(() => {
  const [state, setState] = useState<State>('IDLE');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      setState('SENDING');

      try {
        const payload = {
          name,
          email,
          emailType: 'subscribe',
          labels: ['typeofweb.com'],
          requestSrc: 'typeofweb.com',
        };

        await fetch('https://news.typeofweb.com/members/api/send-magic-link/', {
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(payload),
          method: 'POST',
        });
        setState('SUCCESS');
      } catch (err) {
        setState('ERROR');
      }
    },
    [email, name],
  );

  useEffect(() => {
    if (state === 'ERROR' || state === 'SUCCESS') {
      const timerId = setTimeout(() => setState('IDLE'), 5000);
      return () => clearTimeout(timerId);
    }
  }, [state]);

  const handleNameInput = useCallback<React.FormEventHandler<HTMLInputElement>>((e) => {
    setName(e.currentTarget.value);
  }, []);
  const handleEmailInput = useCallback<React.FormEventHandler<HTMLInputElement>>((e) => {
    setEmail(e.currentTarget.value);
  }, []);

  return (
    <Card as="section" roundAllCorners={true} moreSpace={true} className="newsletter-form mx-auto max-w-xl">
      <div className="pb-4 px-5">
        <SectionTitle level="none" size="small">
          Zapisz się na newsletter <br />
          „Polski frontend i backend”
        </SectionTitle>
        <SectionTitle level="none" size="xs">
          aby otrzymywać najciekawsze linki do materiałów i&nbsp;wydarzeń wybrane przeze mnie!
        </SectionTitle>
      </div>

      <form
        onSubmit={handleSubmit}
        action="https://news.typeofweb.com/members/api/send-magic-link/"
        method="post"
        target="_blank"
      >
        <div className="flex flex-col gap-4 px-7">
          <div className="flex flex-row gap-4">
            <Input type="text" name="name" value={name} onInput={handleNameInput}>
              Imię i nazwisko
            </Input>
          </div>
          <div className="flex">
            <Input type="email" required name="email" value={email} onInput={handleEmailInput}>
              Email
            </Input>
          </div>
          <div className="flex">
            <Checkbox label="tiny" required>
              Rozumiem i akceptuję{' '}
              <Link href="/regulamin">
                <a target="_blank" className="text-blue-500 hover:underline font-normal">
                  Regulamin Newslettera
                </a>
              </Link>{' '}
              oraz{' '}
              <Link href="/polityka-prywatnosci">
                <a target="_blank" className="text-blue-500 hover:underline font-normal">
                  Politykę Prywatności
                </a>
              </Link>
              , a także{' '}
              <a
                target="_blank"
                href="https://www.getrevue.co/terms"
                rel="noreferrer"
                className="text-blue-500 hover:underline font-normal"
              >
                Regulamin
              </a>{' '}
              i{' '}
              <a
                target="_blank"
                href="https://www.getrevue.co/privacy"
                rel="noreferrer"
                className="text-blue-500 hover:underline font-normal"
              >
                Politykę Prywatności Revue
              </a>{' '}
              Wyrażam zgodę na otrzymywanie na podany adres e-mail informacji handlowych w rozumieniu ustawy z dnia 18
              lipca 2002 r. o świadczeniu usług drogą elektroniczną.
            </Checkbox>
          </div>
          <Button type="submit" disabled={state !== 'IDLE'}>
            <div className="h-8">
              {(state === 'SENDING' || state === 'SUCCESS' || state === 'ERROR') && (
                <svg
                  className={`w-5 h-5 text-white transition-all inline-block ${
                    state === 'SENDING' ? 'animate-spin mx-auto' : 'mr-2 -ml-1'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {state === 'SENDING' && (
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  )}
                  <path
                    className={state === 'SENDING' ? `opacity-75` : `opacity-100`}
                    fill="currentColor"
                    {...(state === 'SENDING' && {
                      d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
                    })}
                    {...(state === 'SUCCESS' && {
                      d: 'M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z',
                    })}
                    {...(state === 'ERROR' && {
                      d: 'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z',
                    })}
                  />
                </svg>
              )}
              {state === 'IDLE' && 'Zapisz się'}
              {state === 'SUCCESS' && 'Udało się! Sprawdź maila :)'}
              {state === 'ERROR' && 'Coś poszło nie tak :('}
            </div>
          </Button>
        </div>
      </form>
    </Card>
  );
});
NewsletterForm.displayName = 'NewsletterForm';
