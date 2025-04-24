export function isDeveloperMode(): boolean {
  return process.env.NODE_ENV === 'development';
}
