/**
 * Bouncy Digital AI Chatbot - API Service Layer
 * 
 * PHASE 1: Mock Communication Layer
 * PHASE 2: Replace mock logic with the live n8n webhook URL.
 */

// ============================================================================
// FUTURE N8N WEBHOOK CONFIGURATION
// In Phase 2, put your n8n webhook URL here and switch to the live fetch call.
// ============================================================================
export const N8N_WEBHOOK_URL: string = ""; // e.g. "https://your-n8n-instance.com/webhook/bouncy-chat"

/**
 * Sends a message to the AI assistant.
 * 
 * In Phase 1: Simulates network latency and returns a simple mock response to
 * demonstrate UI state, typing indicator, message insertion, and auto-scrolling.
 * 
 * In Phase 2: Will POST { message } directly to N8N_WEBHOOK_URL and return { reply }.
 * 
 * @param message The text sent by the user
 * @returns Promise<string> The assistant's reply text
 */
export async function sendMessage(message: string): Promise<string> {
  // --------------------------------------------------------------------------
  // FUTURE N8N IMPLEMENTATION (Phase 2):
  // --------------------------------------------------------------------------
  if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL.trim() !== "") {
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status: ${response.status}`);
      }

      const data = await response.json();
      // Assumes n8n returns { "reply": "..." } or { "message": "..." }
      return data.reply || data.message || "Thank you for your message. How else can I help?";
    } catch (error) {
      console.error("Error communicating with n8n webhook:", error);
      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // PHASE 1: MOCK SIMULATION (Purely for demonstrating UI flow)
  // --------------------------------------------------------------------------
  // Simulate network latency (800ms - 1200ms) for realistic typing indicator test
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Simple, friendly demonstration response
  return `Thanks for reaching out to Bouncy Digital! You asked: "${message}". In Phase 2, this will connect directly to the Bouncy AI workflow via n8n.`;
}
