import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstxyz', 10);

export const getId = (size?: number) => nanoid(size);
