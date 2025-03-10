function generateString(length?: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < +(length ?? 6); i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export default generateString;
