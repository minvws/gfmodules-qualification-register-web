import type { Application } from './application'

export type Vendor = {
    id: string
    kvk_number: string
    trade_name: string
    statutory_name: string
    applications: Application[]
}