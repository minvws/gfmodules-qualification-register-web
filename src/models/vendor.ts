import type { Application } from './application'

export type Vendor = {
    id: string
    kvkNumber: string
    tradeName: string
    statutoryName: string
    applications: Application[]
}