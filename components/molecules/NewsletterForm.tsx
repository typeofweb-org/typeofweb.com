import Link from 'next/link';

import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { Checkbox } from '../atoms/Checkbox';
import { Input } from '../atoms/Input';
import { SectionTitle } from '../atoms/SectionTitle';

export const NewsletterForm = () => {
  return (
    <Card as="form" roundAllCorners={true} moreSpace={true} className="mx-auto max-w-xl">
      <div className="pb-4 px-5">
        <SectionTitle size="small">Podoba się? Nie przegap kolejnych artykułów!</SectionTitle>
      </div>
      <div className="flex flex-col gap-4 px-7">
        <div className="flex flex-row gap-4">
          <Input type="text">Imię</Input>
          <Input type="text">Nazwisko</Input>
        </div>
        <div className="flex">
          <Input type="email" required>
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
            . Wyrażam zgodę na otrzymywanie na podany adres e-mail informacji handlowych w rozumieniu ustawy z dnia 18
            lipca 2002 r. o świadczeniu usług drogą elektroniczną.
          </Checkbox>
        </div>
        <Button type="submit">Zapisz się</Button>
      </div>
    </Card>
  );
};
