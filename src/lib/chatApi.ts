/**
 * Bouncy Digital AI Chatbot - API Service Layer
 * Connects frontend directly to n8n webhook workflow.
 */

// Production n8n webhook URL with environment variable support
export const N8N_WEBHOOK_URL: string =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  "https://bouncydigital.app.n8n.cloud/webhook/bouncy-chat";

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

  console.log("[Bouncy AI] Sending request to n8n:", {
    url: N8N_WEBHOOK_URL,
    payload,
  });

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`[Bouncy AI] Response status: ${response.status} ${response.statusText}`);

    // Read response text first to handle both JSON and plain-text gracefully
    const rawText = await response.text();
    console.log("[Bouncy AI] Raw response body:", rawText);

    if (!response.ok) {
      console.error("[Bouncy AI] Server returned error response:", {
        status: response.status,
        statusText: response.statusText,
        body: rawText,
      });
      throw new Error(`n8n webhook error: ${response.status} ${response.statusText} - ${rawText}`);
    }

    // Parse JSON
    let data: any;
    try {
      data = JSON.parse(rawText);
      console.log("[Bouncy AI] Parsed response JSON:", data);
    } catch {
      // If response is plain text instead of JSON
      console.log("[Bouncy AI] Response is not JSON, using raw text");
      return rawText || "I received your message.";
    }

    // Read reply field according to n8n Respond to Webhook structure
    const replyText =
      data?.reply ||
      data?.response ||
      data?.message ||
      data?.output ||
      (typeof data === "string" ? data : "I received your message.");

    return replyText;
  } catch (error) {
    console.error("[Bouncy AI] Network/Fetch error communicating with n8n:", error);
    throw error;
  }
}
