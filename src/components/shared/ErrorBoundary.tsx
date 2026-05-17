/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 */

'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Store error info in state
    this.setState({ errorInfo });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
          <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">⚠️</div>
                <h2 className="card-title text-error">Something went wrong</h2>
              </div>

              <p className="text-base-content/70 mb-4">
                An unexpected error occurred. You can try refreshing the page or going back.
              </p>

              {this.state.error && (
                <div className="collapse collapse-arrow bg-base-200 mb-4">
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium">
                    Error Details
                  </div>
                  <div className="collapse-content">
                    <div className="font-mono text-xs bg-base-300 p-3 rounded overflow-auto">
                      <p className="text-error font-semibold mb-2">
                        {this.state.error.name}: {this.state.error.message}
                      </p>
                      {this.state.error.stack && (
                        <pre className="text-xs opacity-70 whitespace-pre-wrap">
                          {this.state.error.stack}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="card-actions justify-end gap-2">
                <button className="btn btn-ghost" onClick={this.handleReset}>
                  Try Again
                </button>
                <button className="btn btn-primary" onClick={this.handleReload}>
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap any component with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
