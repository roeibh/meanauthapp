export interface authenticator {

}

export function generateKey(): string;
export function generateTotpUri(formattedKey: string, email: string, issuer: string): string;
export function generateToken(formattedKey: string): string;
export function verifyToken(formattedKey: string, formattedToken: string): object | null;