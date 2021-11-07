import React from 'react';
import { render } from '@testing-library/react';

const wait = (seconds: number = 1): Promise<void> => new Promise(resolve => setTimeout(resolve, seconds * 1000));

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

const ERROR_BOUNDARY_MESSAGE = 'Something went wrong.';

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <h2>{ERROR_BOUNDARY_MESSAGE}</h2>;
    }

    return children;
  }
}

export { render, wait, ErrorBoundary, ERROR_BOUNDARY_MESSAGE };
export * from '@testing-library/react';
