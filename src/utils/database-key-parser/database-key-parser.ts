// Example Database Keys:
// User#9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
// ApplcationField#name.first
// ApplcationField#prior-employment,employer,name#1
const databaseKeyParser = (databaseKey: string): string => {
  const [_keyPrefix, keyBody, keySuffix] = databaseKey.split("#");

  if (keySuffix) {
    return `${keyBody}#${keySuffix}`;
  }

  return keyBody;
};

export { databaseKeyParser };
