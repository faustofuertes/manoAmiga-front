export interface MyToken {
    sub: string;
    name?: string;
    email?: string;
    [key: string]: any; // Esto permite cualquier propiedad adicional

}
