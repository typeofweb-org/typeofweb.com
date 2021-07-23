import { NewsletterForm } from '../components/molecules/NewsletterForm';
import { SingleArticle } from '../components/organisms/SingleArticle';
import { TwoColumns } from '../components/templates/TwoColumns';
import { useRunningHeader } from '../hooks/runningHeader';

export default function PostPage() {
  const firstPostHasCover = true;

  const { setRunningHeader } = useRunningHeader();

  return (
    <TwoColumns firstPostHasCover={firstPostHasCover} withSidebar={true} pageKind="post">
      <SingleArticle
        ref={setRunningHeader}
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
    </TwoColumns>
  );
}
