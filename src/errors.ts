export class OAuthError extends Error {
  constructor(message: string) {
    super(`${message}`);
    this.name = 'OAuthError';
  }
}
