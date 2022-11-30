import { checkMatchSelfieAndId } from "./utils/rekognition.js";
import { isLambdaEventBodyValid } from "./utils/validation.js";

const RESPONSE_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

/**
 * Lambda Handler
 *
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = async (event) => {
  const body = JSON.parse(event.body);

  const lambdaEventBodyValidity = await isLambdaEventBodyValid(body);

  if (!lambdaEventBodyValidity.isValid) {
    return {
      statusCode: 403,
      headers: RESPONSE_HEADERS,
      error: lambdaEventBodyValidity.message,
    };
  }

  const { selfieImage, idImage } = body;

  const response = await checkMatchSelfieAndId(selfieImage, idImage);

  return {
    statusCode: 200,
    headers: RESPONSE_HEADERS,
    body: JSON.stringify(response),
  };
};

export { handler };
