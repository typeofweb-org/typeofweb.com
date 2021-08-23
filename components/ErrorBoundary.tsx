/* eslint-disable functional/no-this-expression, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access -- ErrorBoundary */
import { Component } from 'react';

import type { ErrorInfo } from 'react';

interface State {
  readonly hasError: boolean;
  readonly isRedirecting: boolean;
}

export class ErrorBoundary extends Component<{}, State> {
  readonly state: State = { hasError: false, isRedirecting: false };

  static getDerivedStateFromError() {
    return { hasError: true, isRedirecting: false };
  }

  componentDidMount() {
    window.addEventListener('error', (event) => {
      if (this.state.isRedirecting) {
        return;
      }
      this.setState({ isRedirecting: true });
      const url = errorToGitHubIssue(event.error, event.filename);
      window.location.href = url;
    });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.state.isRedirecting) {
      return;
    }
    const url = errorToGitHubIssue(error, errorInfo.componentStack);
    window.location.href = url;
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function errorToGitHubIssue(error: any, filename?: string) {
  const url = `https://github.com/typeofweb/typeofweb.com/issues/new?`;
  const params = new URLSearchParams({
    labels: 'bug',
    title: error?.message,
    body: `
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
`.trim(),
  });

  return url + params.toString();
}
