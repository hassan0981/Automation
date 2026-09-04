/**
 * Bouncy Digital AI Chatbot - API Service Layer
 * Connects frontend directly to n8n webhook workflow.
 */

export const BUILD_MARKER = "v1.0.5";

// n8n Webhook Endpoints
export const N8N_TEST_WEBHOOK_URL =
  "https://bouncydigital.app.n8n.cloud/webhook-test/bouncy-chat";

export const N8N_PROD_WEBHOOK_URL =
  "https://bouncydigital.app.n8n.cloud/webhook/bouncy-chat";

/**
 * Automatically selects the appropriate webhook endpoint:
 * 1. Uses VITE_N8N_WEBHOOK_URL environment variable if explicitly set.
 * 2. In local development (npm run dev / import.meta.env.DEV): uses the TEST URL (/webhook-test/bouncy-chat).
 * 3. In production builds (npm run build / Vercel / import.meta.env.PROD): uses the PRODUCTION URL (/webhook/bouncy-chat).
 */
export const N8N_WEBHOOK_URL: string =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  (import.meta.env.DEV ? N8N_TEST_WEBHOOK_URL : N8N_PROD_WEBHOOK_URL);

/**
 * Sends a message to the n8n AI webhook workflow and returns data.reply.
 * 
 * @param message The user's input text
 * @param sessionId Optional conversation session ID (defaults to 'demo-session')
 * @returns Promise<string> The assistant's reply text from data.reply
 */
export async function sendMessage(
  message: string,
  sessionId: string = "demo-session"
): Promise<string> {
  const payload = {
    message,
    sessionId,
  };

  console.log(`[Bouncy AI] Calling Webhook URL: ${N8N_WEBHOOK_URL}`);
  console.log("[Bouncy AI] Payload:", payload);

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Bouncy AI] Error Response (${response.status}):`, errorText);
    throw new Error(`Failed to connect to n8n (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  console.log("[Bouncy AI] Parsed response data:", data);

  return data.reply;
}
