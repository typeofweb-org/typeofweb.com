import { LinkUnderlineEffect } from '../atoms/LinkUnderlineEffect';
import { Widget } from '../atoms/Widget';

const posts = [
  'O obrotach ciał niebieskich',
  'Srali muchy będzie wiosna będzie lepiej trawa rosła',
  'O obrotach ciał niebieskich',
  'Srali muchy będzie wiosna będzie lepiej trawa rosła',
  'O obrotach ciał niebieskich',
];

export const LatestPostsWidget = () => {
  return (
    <Widget title="Najpopularniejsze wpisy:">
      <ol className="counter-reset pl-6">
        {posts.map((post) => {
          return (
            <li
              key={post}
              className="counter-increment before:counter-result before:text-stroke before:absolute relative before:top-0 before:-ml-6 mb-6 before:mr-2 before:text-gray-500 before:font-sans before:text-4xl before:proportional-nums before:font-semibold before:leading-none"
            >
              <LinkUnderlineEffect>
                <a className="align-top hover:text-blue-500 text-gray-700 text-lg leading-snug transition-all" href="#">
                  {post}
                </a>
              </LinkUnderlineEffect>
            </li>
          );
        })}
      </ol>
    </Widget>
  );
};
