// Example Application Field Id:
// name.first
// prior-employment,employer,name#1
const applicationFieldIdParser = (applicationFieldId: string): string => {
  const [applicationFieldIdBody, _applicationFieldIdSuffix] =
    applicationFieldId.split("#");

  return applicationFieldIdBody;
};

export { applicationFieldIdParser };
