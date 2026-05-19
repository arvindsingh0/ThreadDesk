import API from "../services/api";

export const uploadPDF = async (formData) => {

  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};