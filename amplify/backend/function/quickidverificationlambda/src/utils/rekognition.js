import { Rekognition } from "@aws-sdk/client-rekognition";

import { getImageFromBase64ToBuffer } from "./image.js";

/**
 * The response of Detect Faces Rekognition
 *
 * @typedef {import('@aws-sdk/client-rekognition').DetectFacesCommandOutput} DetectFacesResponse
 */

/**
 * The response of Compared Faces Rekognition
 *
 * @typedef {import('@aws-sdk/client-rekognition').CompareFacesCommandOutput} CompareFacesResponse
 */

/**
 * The Response Check Object
 *
 * @typedef {Object} ResponseCheck
 * @property {boolean} isValid
 * @property {string} message
 */

/**
 * Get Detect Faces Response Check
 *
 * @param {DetectFacesResponse} response
 *
 * @returns {ResponseCheck}
 */
const getDetectFacesResponseCheck = (response) => {
  if (!response) {
    return {
      isValid: false,
      message: "Invalid payload",
    };
  }

  if (!response.FaceDetails || response.FaceDetails.length != 1) {
    return {
      isValid: false,
      message: "The image does not have a face or multiple faces detected",
    };
  }

  if (response.FaceDetails[0].Confidence < 90) {
    return {
      isValid: false,
      message: "The image provided is not suitable for a check",
    };
  }

  return {
    isValid: true,
    message: "The image is a valid face",
  };
};

/**
 * Get Compare Faces Response Check
 *
 * @param {CompareFacesResponse} response
 *
 * @returns {ResponseCheck}
 */
const getCompareFacesResponseCheck = (response) => {
  if (!response || !response.FaceMatches) {
    return {
      isValid: false,
      message: "Unable to perform comparison check of the images",
    };
  }

  if (response.FaceMatches[0].Similarity < 90) {
    return {
      isValid: false,
      message: "The images are not a matched",
    };
  }

  return {
    isValid: true,
    message: "The images are a matched",
  };
};

/**
 * Check Image by Detect Faces using Rekognition
 *
 * @param {string} image
 *
 * @returns {Promise<ResponseCheck>}
 */
const checkImageByDetectFaces = async (image) => {
  const rekognition = new Rekognition();

  const response = await rekognition.detectFaces({
    Image: {
      Bytes: image,
    },
  });

  return getDetectFacesResponseCheck(response);
};

/**
 * Check Images by Compare Faces using Rekognition
 *
 * @param {string} imageSource
 * @param {string} imageTarge
 *
 * @returns {Promise<ResponseCheck>}
 */
const checkImagesByCompareFaces = async (imageSource, imageTarget) => {
  const rekognition = new Rekognition();

  const response = await rekognition.compareFaces({
    SourceImage: {
      Bytes: imageSource,
    },
    TargetImage: {
      Bytes: imageTarget,
    },
  });

  return getCompareFacesResponseCheck(response);
};

/**
 * Check Selfie and ID are a matched
 *
 * @param {string} selfieImage
 * @param {string} idImage
 *
 * @returns {Promise<ResponseCheck>}
 */
const checkMatchSelfieAndId = async (selfieImage, idImage) => {
  const selfieImageBuffer = getImageFromBase64ToBuffer(selfieImage);

  const imageSelfieByDetectFaces = await checkImageByDetectFaces(selfieImageBuffer);

  if (!imageSelfieByDetectFaces.isValid) {
    return imageSelfieByDetectFaces;
  }

  const imageIdBuffer = getImageFromBase64ToBuffer(idImage);

  const imageIdByDetectFaces = await checkImageByDetectFaces(imageIdBuffer);

  if (!imageIdByDetectFaces.isValid) {
    return imageIdByDetectFaces;
  }

  return checkImagesByCompareFaces(selfieImageBuffer, imageIdBuffer);
};

export { checkMatchSelfieAndId };
