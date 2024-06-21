import type {ApplicationSystemType} from "@/models/systemType";
import type {ApplicationRole} from "@/models/role";
import type {ApplicationVersion} from "@/models/applicationVersion";

export type Application = {
    id: string
    name: string
    vendor_id: string
    vendor_kvk_number: string
    vendor_trade_name: string
    versions: ApplicationVersion[]
    roles: ApplicationRole[]
    system_types: ApplicationSystemType[]
}