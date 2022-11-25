import * as bcrypt from 'bcrypt';

export const hass_password = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const compare_password = async (password: string, hash_pass: string) => {
  return await bcrypt.compare(password, hash_pass);
};
