const N8N_WEBHOOK_URL =
  "https://bouncydigital.app.n8n.cloud/webhook-test/bouncy-chat";

export async function sendMessage(
  message: string,
  sessionId: string = "demo-session"
): Promise<string> {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to connect to n8n");
  }

  const data = await response.json();

  return data.response || data.reply || data.message || "I received your message.";
}
