/// <reference types="vite/client" />

// Reference: https://vitejs.dev/guide/env-and-mode
interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
