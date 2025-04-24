// App.tsx
import React from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // <-- explicitly type `state` so TS knows `error` is Error|null
  state: ErrorBoundaryState = {
    error: null,
  };

  // when an error is thrown in a child, put it into state
  static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    return { error: err };
  }

  render() {
    if (this.state.error) {
      // now TS knows `this.state.error` is Error
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong:</Text>
          <Text>{this.state.error.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
}
