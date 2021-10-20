import Link from 'next/link';
import { memo } from 'react';

import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Checkbox } from '../atoms/Checkbox';
import { Input } from '../atoms/Input';
import { SectionTitle } from '../atoms/SectionTitle';

export const NewsletterForm = memo(() => {
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
        action="https://news.typeofweb.com/add_subscriber"
        method="post"
        id="revue-form"
        name="revue-form"
        target="_blank"
      >
        <div className="flex flex-col gap-4 px-7">
          <div className="flex flex-row gap-4">
            <Input type="text" name="member[first_name]" id="member_first_name">
              Imię
            </Input>
            <Input type="text" name="member[last_name]" id="member_last_name">
              Nazwisko
            </Input>
          </div>
          <div className="flex">
            <Input type="email" required name="member[email]" id="member_email">
              Email
            </Input>
          </div>
          <input type="hidden" value="Subscribe" name="member[subscribe]" id="member_submit" />
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
          <Button type="submit">Zapisz się</Button>
        </div>
      </form>
    </Card>
  );
});
NewsletterForm.displayName = 'NewsletterForm';
