export type GoogleTagManagerId = `GTM-${string}`;

const isGoogleTagManagerId = (value: unknown): value is GoogleTagManagerId => {
  if (typeof value !== 'string') {
    return false;
  }

  const startPosition = 0;

  const endPosition = 4;

  return value.slice(startPosition, endPosition) === 'GTM-';
};

export const getNullableGoogleTagManagerId = (): GoogleTagManagerId | null => {
  if (isGoogleTagManagerId(process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID)) {
    return process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
  }

  return null;
};
