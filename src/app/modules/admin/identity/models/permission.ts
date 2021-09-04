export interface Permission {
    roleId: string
    // roleName: string
    // description: string
    roleClaims: RoleClaim[]
}

export interface RoleClaim {
    id: number
    roleId: string
    type: string
    value: string
    description: string
    group: string
    selected: boolean
}
