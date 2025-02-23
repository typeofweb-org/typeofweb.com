/* eslint-disable functional/no-this-expression, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access -- ErrorBoundary */
import { Component } from 'react';

import type { ErrorInfo } from 'react';

interface State {
  readonly error?: Error;
  readonly data?: string;
}

export class ErrorBoundary extends Component<{}, State> {
  readonly state: State = {};

  componentDidMount() {
    window.addEventListener('error', (event) => {
      this.setState({ error: event.error, data: event.filename });
    });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error: error, data: errorInfo.componentStack });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Coś nie pykło</h1>
          <p>
            Zgłoś ten błąd na GitHubie: <a href={errorToGitHubIssue(this.state.error, this.state.data)}>Stwórz issue</a>
          </p>
          <pre>{errorToText(this.state.error, this.state.data)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function errorToGitHubIssue(error: any, filename?: string) {
  const url = `https://github.com/typeofweb-org/typeofweb.com/issues/new?`;
  const params = new URLSearchParams({
    labels: 'bug',
    title: error?.message,
    body: errorToText(error, filename),
  });

  return url + params.toString();
}

const errorToText = (error: any, filename?: string) => {
  return `
## Environment
- **URL**: ${window.location.href}
- **Browser**: ${window.navigator.userAgent}
- **OS**: ${window.navigator.vendor} / ${window.navigator.vendorSub} / ${window.navigator.platform}

## Error details
\`\`\`
${filename}:${error?.line ?? 0}:${error?.column ?? 0}
${error?.message}


${error?.stack}
\`\`\`
`.trim();
};
