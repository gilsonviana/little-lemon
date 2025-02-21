export const conditionalKey = (condition: boolean, key: string) => {
  if (condition) {
    return key;
  }
  return null;
}
