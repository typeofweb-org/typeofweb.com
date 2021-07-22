import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { ArticleSneakPeek } from '../components/organisms/ArticleSneakPeek';
import { TwoColumns } from '../components/templates/TwoColumns';

export default function IndexPage() {
  const firstPostHasCover = false;

  return (
    <TwoColumns firstPostHasCover={firstPostHasCover} withSidebar={true}>
      <ArticleSneakPeek
        title="Względne postrzeganie czasu: model matematyczny"
        mainCategory="Opinie"
        href="/post"
        authors={[
          {
            avatarUrl: 'https://secure.gravatar.com/avatar/67ddb8f651e11cbc28c53c0fe4f7542e?s=160&d=identicon&r=g',
            displayName: 'Michał Miszczyszyn',
          },
        ]}
        coverUrl={
          firstPostHasCover
            ? 'https://typeofweb.com/wp-content/uploads/2021/07/relatywny_wzgledny_subiektywny_czas_postrzeganie.png'
            : undefined
        }
        id={341}
      />
      <NewsletterForm />
      <ArticleSneakPeek
        title="Względne postrzeganie czasu: model matematyczny"
        mainCategory="Opinie"
        href="/post"
        authors={[
          {
            avatarUrl:
              'https://typeofweb.com/wp-content/uploads/2020/06/92280665_10223145319368360_5560124641172783104_o1-150x150.jpg',
            displayName: 'Paulina Piątek',
          },
          {
            avatarUrl: 'https://secure.gravatar.com/avatar/67ddb8f651e11cbc28c53c0fe4f7542e?s=160&d=identicon&r=g',
            displayName: 'Michał Miszczyszyn',
          },
        ]}
        coverUrl="https://typeofweb.com/wp-content/uploads/2021/07/relatywny_wzgledny_subiektywny_czas_postrzeganie.png"
        id={340}
      />
      <ArticleSneakPeek
        title="Względne postrzeganie czasu: model matematyczny"
        mainCategory="Opinie"
        href="/post"
        authors={[
          {
            avatarUrl: 'https://secure.gravatar.com/avatar/67ddb8f651e11cbc28c53c0fe4f7542e?s=160&d=identicon&r=g',
            displayName: 'Michał Miszczyszyn',
          },
        ]}
        id={339}
      />
    </TwoColumns>
  );
}
