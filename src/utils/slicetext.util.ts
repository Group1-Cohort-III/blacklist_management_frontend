export const sliceText = (title: string, len: number): string => {
  const result = title.length > len ? title.slice(0, len - 1) + "..." : title;
  return result;
};
