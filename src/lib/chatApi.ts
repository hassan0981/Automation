/**
 * Bouncy Digital AI Chatbot - API Service Layer
 * Connects frontend directly to n8n webhook workflow.
 */

export const BUILD_MARKER = "v1.0.4-live-debug";

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

console.log(`[Bouncy AI] Initialized (${BUILD_MARKER}) | Mode: ${import.meta.env.DEV ? "DEV" : "PROD"} | Target: ${N8N_WEBHOOK_URL}`);

/**
 * Sends a message to the n8n AI webhook workflow.
 * 
 * @param message The user's input text
 * @param sessionId Optional conversation session ID (defaults to 'demo-session')
 * @returns Promise<string> The assistant's reply text
 */
export async function sendMessage(
  message: string,
  sessionId: string = "demo-session"
): Promise<string> {
  const payload = {
    message,
    sessionId,
  };

  const environmentMode = import.meta.env.DEV ? "Development (Test Webhook)" : "Production (Live Webhook)";

  console.log(`[Bouncy AI] (${BUILD_MARKER}) Environment: ${environmentMode}`);
  console.log(`[Bouncy AI] (${BUILD_MARKER}) Calling Webhook URL: ${N8N_WEBHOOK_URL}`);
  console.log(`[Bouncy AI] (${BUILD_MARKER}) Request Payload:`, payload);

  // Setup 30s timeout abort controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.warn(`[Bouncy AI] (${BUILD_MARKER}) 30-second timeout reached. Aborting request.`);
    controller.abort();
  }, 30000);

  try {
    console.log(`[Bouncy AI] (${BUILD_MARKER}) Initiating fetch() to ${N8N_WEBHOOK_URL}...`);
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(`[Bouncy AI] (${BUILD_MARKER}) Response received. HTTP Status: ${response.status} ${response.statusText}`);

    // Read response text first to handle both JSON and plain-text gracefully
    const rawText = await response.text();
    console.log(`[Bouncy AI] (${BUILD_MARKER}) Raw Response Body:`, rawText);

    if (!response.ok) {
      if (response.status === 404 && N8N_WEBHOOK_URL.includes("webhook-test")) {
        console.warn(
          `[Bouncy AI] (${BUILD_MARKER}) Note: In n8n test mode, make sure you clicked 'Listen for test event' in the n8n canvas before sending the message.`
        );
      }
      throw new Error(`n8n webhook error (${response.status} ${response.statusText}): ${rawText}`);
    }

    // Parse JSON
    let data: any;
    try {
      data = JSON.parse(rawText);
      console.log(`[Bouncy AI] (${BUILD_MARKER}) Parsed JSON Response:`, data);
    } catch {
      // If response is plain text instead of JSON
      console.log(`[Bouncy AI] (${BUILD_MARKER}) Response is not JSON, using raw text string.`);
      return rawText || "I received your message.";
    }

    // Read reply field according to n8n Respond to Webhook structure
    const replyText =
      data?.reply ||
      data?.response ||
      data?.message ||
      data?.output ||
      (typeof data === "string" ? data : "I received your message.");

    console.log(`[Bouncy AI] (${BUILD_MARKER}) Final Assistant Text to display:`, replyText);
    return replyText;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.error(`[Bouncy AI] (${BUILD_MARKER}) Request timed out after 30 seconds waiting for n8n response.`);
      throw new Error("Request timed out. Please check your n8n workflow.");
    }
    console.error(`[Bouncy AI] (${BUILD_MARKER}) Network/Fetch error communicating with n8n:`, error);
    throw error;
  }
}
