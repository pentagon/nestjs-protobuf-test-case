import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
