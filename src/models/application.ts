import type {ApplicationSystemType} from "@/models/systemType";
import type {ApplicationRole} from "@/models/role";
import type {ApplicationVersion} from "@/models/applicationVersion";
import type {VendorSummary} from "@/models/vendorSummary";

export type Application = {
    id: string
    name: string
    vendor: VendorSummary
    versions: ApplicationVersion[]
    roles: ApplicationRole[]
    system_types: ApplicationSystemType[]
}