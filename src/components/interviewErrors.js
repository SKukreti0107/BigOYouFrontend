export function isAgentUnavailable(error) {
  return error?.response?.status === 503;
}

export function getInterviewErrorMessage(error, context) {
  if (isAgentUnavailable(error)) {
    return `AI service is temporarily unavailable during ${context}. Please retry in a moment.`;
  }

  if (error?.response?.data?.detail) {
    return String(error.response.data.detail);
  }

  if (error?.code === "ECONNABORTED") {
    return "Request timed out. Please check your connection and retry.";
  }

  return "Something went wrong. Please try again.";
}
