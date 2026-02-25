import React from 'react'

interface State {
  error: Error | null
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: 600, margin: '4rem auto' }}>
          <h2 style={{ color: '#dc2626', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            Something went wrong
          </h2>
          <pre
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.8rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#991b1b',
              overflow: 'auto',
              maxHeight: '300px',
            }}
          >
            {this.state.error.message}
            {this.state.error.stack && `\n\n${this.state.error.stack}`}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
