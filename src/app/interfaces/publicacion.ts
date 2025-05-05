export interface Publicacion {
    _id?: string;
    userId: string | null;
    userName: string | null;
    job: string;
    location: string;
    description: string;
    schedule: string;
    pricing: number;
    experience: number;
    phone: number;
    isActive?: boolean;
    dateAdded?: Date;
}
