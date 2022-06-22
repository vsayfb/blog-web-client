const { REACT_APP_DEFAULT_AVATAR } = process.env;

export function detectImage(imageUrl: string | null) {
  if (imageUrl) return imageUrl;

  return REACT_APP_DEFAULT_AVATAR;
}
