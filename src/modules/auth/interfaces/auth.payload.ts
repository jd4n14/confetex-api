import * as jwt from 'jsonwebtoken';

/**
 * Holds information about current users.
 */
export interface AuthPayload extends jwt.JwtPayload {
  /// Audience
  /// Target audience for this JWT
  aud: string;
  /// Expiration
  exp?: number;
  /// IssuedAt
  // Specifies the date at which the token has been issued
  lat?: number;
  /// Issuer
  // The entity to generate and issue the JSON Web Token
  iss: string;
  /// Subject
  /// The entity identified by this token (e.g id)
  sub: string;
  /// email of current user
  email: string;

  /// Roles of current user
  roles: string[];
}
