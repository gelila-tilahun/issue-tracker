declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Ensure the global JSX namespace exists for libraries that reference it directly.
    }
  }
}

export {};
