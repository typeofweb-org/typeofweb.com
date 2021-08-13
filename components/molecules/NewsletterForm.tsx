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
          Podoba się? Nie przegap kolejnych artykułów!
        </SectionTitle>
      </div>
      {/* <!-- Begin Mailchimp Signup Form --> */}
      <form
        action="https://typeofweb.us16.list-manage.com/subscribe/post?u=8073e459fa97c5444592f393a&amp;id=47bdbd08e9"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <div className="flex flex-col gap-4 px-7">
          <div className="flex flex-row gap-4">
            <Input type="text" name="FNAME" id="mce-FNAME">
              Imię
            </Input>
            <Input type="text" name="LNAME" id="mce-LNAME">
              Nazwisko
            </Input>
          </div>
          <div className="flex">
            <Input type="email" required name="EMAIL" id="mce-EMAIL">
              Email
            </Input>
          </div>
          {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name="b_8073e459fa97c5444592f393a_47bdbd08e9" tabIndex={-1} readOnly value="" />
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
          <input type="hidden" readOnly value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
          <Button type="submit">Zapisz się</Button>
        </div>
      </form>
      {/* <!--End mc_embed_signup--> */}
    </Card>
  );
});
NewsletterForm.displayName = 'NewsletterForm';
