export const bufferString = async (base64: string) => {
  // const base64 = process.env.FIREBASE_PRIVATE_KEY;
  const key = Buffer.from(base64, 'base64').toString();
  return key ?? '';
};
