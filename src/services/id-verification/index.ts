import { API } from "aws-amplify";

/**
 * Get Image as Base 64
 */
const getImageAsBase64 = async (imageFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = () => resolve(reader.result as string);

    reader.onerror = (error) => reject(error);
  });
};

type ResponseCheckMatchSelfieAndId = {
  isValid: boolean;
  message: string;
};

/**
 * Check Selfie and ID are a matched
 */
const checkMatchSelfieAndId = async (selfieImage: File, idImage: File): Promise<ResponseCheckMatchSelfieAndId> => {
  const selfieImageBase64 = await getImageAsBase64(selfieImage);

  const idImageBase64 = await getImageAsBase64(idImage);

  const data = {
    body: {
      selfieImage: selfieImageBase64,
      idImage: idImageBase64,
    },
  };

  return API.post("quickidverificationapi", "/id-verification", data);
};

export { checkMatchSelfieAndId };
