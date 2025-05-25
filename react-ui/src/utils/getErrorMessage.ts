const getErrorMessage = (error: any) => { 
  let errorMessage = '';

  if (error instanceof Error) {
    errorMessage += error.message;
  } else {
    errorMessage = error.data.error;
  }

  return errorMessage;
};

export default getErrorMessage;