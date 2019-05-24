export const isServer = () => {
  return typeof window === 'undefined';
};

export const sleep = (t: number) => new Promise(r => setTimeout(r, t));
