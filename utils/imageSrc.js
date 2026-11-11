// Listing images are either a file in public/img (older listings) or a full
// https URL (paid submissions stored in object storage).
export const imageSrc = (image) => {
  if (!image) return "";
  return /^https?:\/\//.test(image) ? image : `/img/${image}`;
};
