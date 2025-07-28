// src/modules/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/enums'; // Import Role enum

export const ROLES_KEY = 'roles'; // Key to store roles metadata

/**
 * Custom decorator to specify which roles are allowed to access a route.
 * @param roles An array of allowed roles.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
