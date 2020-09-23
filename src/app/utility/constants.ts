export const HOST = 'desktop-a3m47jl'
export const PORT = '8093';

export const getEndpoint = (isHttps) => {
  return `${isHttps ? 'https' : 'http'}://${HOST}:${PORT}`;
};
