export interface Usuario {
    _id?: string;
    auth0Id: string;
    name?: string;
    email?: string;
    phone?: Number;
    isActive?: boolean;
    dateAdded?: Date;
}

