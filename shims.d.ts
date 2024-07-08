export {}

declare global {
  interface Window {
    config?: {
      apiEndpoint?: string
    }
  }
}
