import * as yup from "yup";

const ERROR_MESSAGES = {
  selfieImage: {
    string: "selfieImage must be a string",
    required: "selfieImage is required",
  },
  idImage: {
    string: "idImage must be a string",
    required: "idImage is required",
  },
};

/**
 * The Response Check Object
 *
 * @typedef {Object} ResponseCheck
 * @property {boolean} isValid
 * @property {string} message
 */

/**
 * Check Selfie and ID are a matched
 *
 * @param {object} data
 *
 * @returns {Promise<ResponseCheck>}
 */
const isLambdaEventBodyValid = async (data) => {
  const eventLambdaSchema = yup.object({
    selfieImage: yup.string(ERROR_MESSAGES.selfieImage.string).required(ERROR_MESSAGES.selfieImage.required),
    idImage: yup.string(ERROR_MESSAGES.idImage.string).required(ERROR_MESSAGES.idImage.required),
  });

  try {
    await eventLambdaSchema.validate(data);

    return {
      isValid: true,
      message: "Valid Event Body",
    };
  } catch (error) {
    return {
      isValid: false,
      message: error.message,
    };
  }
};

export { isLambdaEventBodyValid };
