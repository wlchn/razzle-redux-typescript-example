import { isServer } from './utils';

export const _env = isServer() ? process.env : window.env;
