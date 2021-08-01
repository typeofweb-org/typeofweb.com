import { memo } from 'react';

import { Card } from './Card';

import type { ReactNode, PropsWithChildren } from 'react';

interface WidgetProps {
  readonly title: ReactNode;
}

export const Widget = memo<PropsWithChildren<WidgetProps>>(({ children, title }) => {
  return (
    <Card as="section" roundAllCorners={true} moreSpace={true}>
      <div className="-my-2 px-8">
        <h3 className="mb-3 text-gray-800 text-lg font-semibold">{title}</h3>
        {children}
      </div>
    </Card>
  );
});
Widget.displayName = 'Widget';
