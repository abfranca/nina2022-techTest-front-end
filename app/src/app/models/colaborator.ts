export interface Colaborator {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deliveriesMade: number;
    deliveriesInProgress: number;
    deleted: boolean;
}