export const getErrorMessage = (e: unknown): string => {
  if (e && typeof e === "object" && "data" in e) {
    return e.data as string;
  } else if (e && typeof e === "object" && "error" in e) {
    return e.error as string;
  } else {
    return "Unrecognized Error";
  }
};
