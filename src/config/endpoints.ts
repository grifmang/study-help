
const TESTING_ENDPOINTS = false

// `/api/proxy?url=${encodeURIComponent("https://ytshorts-grif.app.n8n.cloud/webhook/process-media"
// const BASE_URL = `https://ytshorts-grif.app.n8n.cloud/webhook${TESTING_ENDPOINTS}`;
const BASE_URL = `/api/proxy?url=${encodeURIComponent("https://ytshorts-grif.app.n8n.cloud/webhook")}`;

export const ENDPOINTS = {
  CREATE_EXAM: BASE_URL + "/create-exam",
  TRANSCRIBE: BASE_URL + "/transcribe",
  EVALUATE_EXAM: BASE_URL + "/evaluate-exam",
  PROCESS_MEDIA: BASE_URL + "/process-media"
} as const; 