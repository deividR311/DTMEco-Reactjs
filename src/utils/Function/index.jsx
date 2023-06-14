export const forceLoadUrl = (url) => {
  window.location.href = url;
};

export const validateAbsolute = (value) => {
  if (value === "") return false;
  if (value === null) return false;
  if (value === undefined) return false;
  return true;
};
