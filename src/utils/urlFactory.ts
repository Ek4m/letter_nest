export const urlFactory = (url: string, object: Record<string, any>) => {
  const path = Object.keys(object)
    .filter((key) => !!object[key])
    .map((key) => `${key}=${object[key]}`)
    .join('&');
  return url + '?' + path;
};
