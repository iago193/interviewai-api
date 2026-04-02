import * as bcrypt from 'bcrypt';

export const hashBcrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const compareBcryptHash = async (
  password: string,
  password_hash: string,
): Promise<boolean> => {
  const compare = await bcrypt.compare(password, password_hash);
  return compare;
};
