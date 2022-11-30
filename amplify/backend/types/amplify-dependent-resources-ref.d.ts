export type AmplifyDependentResourcesAttributes = {
  api: {
    quickidverificationapi: {
      RootUrl: "string";
      ApiName: "string";
      ApiId: "string";
    };
  };
  function: {
    quickidverificationlambda: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
  };
};
