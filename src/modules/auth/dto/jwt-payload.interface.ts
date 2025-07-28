import { Role } from '../../user/enums'; // Import Role enum

export interface JwtPayload {
  email: string;
  role: Role;
  sub: string; // User ID (conventionally 'sub' for subject)
}
