interface PresignedUrlData {
  url: string;
  params: { [key: string]: string };
}

const uploadFileToCloudinary = async (file: File, presignedUrlData: PresignedUrlData) => {
  if (!file || !presignedUrlData) return;

  const { url, params } = presignedUrlData;

  const formData = new FormData();

  formData.append('file', file);
  Object.keys(params).forEach(key => formData.append(key, params[key]));

  console.log('formData:', formData);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

export default uploadFileToCloudinary;