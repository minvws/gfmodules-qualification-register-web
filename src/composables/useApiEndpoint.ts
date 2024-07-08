function getApiEndpoint() {
    if (window?.config?.apiEndpoint) {
        return window.config.apiEndpoint
    }
    return import.meta.env.VITE_API_ENDPOINT
}

const apiEndpoint = getApiEndpoint()

export const useApiQualificationsUrl = () => {
    return `${apiEndpoint}/qualifications`
}

export const useApiApplicationsUrl = () => {
    return `${apiEndpoint}/applications`
}

export const useApiApplicationUrl = (id?: string) => {
    const applicationsUrl = useApiApplicationsUrl()
    return `${applicationsUrl}/${id}`
}

export const useApiRolesUrl = () => {
    return `${apiEndpoint}/roles`
}

export const useApiRoleUrl = (id?: string) => {
    const rolesUrl = useApiRolesUrl()
    return `${rolesUrl}/${id}`
}

export const useApiSystemTypesUrl = () => {
    return `${apiEndpoint}/system_types`
}

export const useApiSystemTypeUrl = (id?: string) => {
    const systemTypesUrl = useApiSystemTypesUrl()
    return `${systemTypesUrl}/${id}`
}

export const useApiVendorsUrl = () => {
    return `${apiEndpoint}/vendors`
}


export const useApiVendorUrl = (id?: string) => {
    const vendorUrl = useApiVendorsUrl()
    return `${vendorUrl}/${id}`
}