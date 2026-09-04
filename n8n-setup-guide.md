# Bouncy Digital AI — n8n AI Agent Workflow Setup Guide

This guide details how to configure your n8n workflow so that incoming requests from the live Vercel frontend ([https://automation-one-eta.vercel.app](https://automation-one-eta.vercel.app)) generate dynamic AI responses with conversation memory.

---

## 🏗️ Workflow Architecture

```
[ Webhook (POST: bouncy-chat) ]
             │
             ▼
[ AI Agent (LangChain) ] ── [ OpenAI Chat Model (gpt-4o-mini) ]
             │           └── [ Window Buffer Memory (Session ID) ]
             ▼
[ Respond to Webhook ({ "reply": "<AI output>" }) ]
```

---

## ⚙️ Node-by-Node Configuration in n8n

### 1. Webhook Node
- **HTTP Method**: `POST`
- **Path**: `bouncy-chat`
- **Authentication**: `None`
- **Respond**: `Using 'Respond to Webhook' Node`

---

### 2. AI Agent Node (or Basic LLM Chain)
- **Prompt Type**: `Define below`
- **User Message / Prompt (Expression)**:
  ```javascript
  ={{ $json.body.message || $json.message }}
  ```
- **System Message (Instructions)**:
  ```text
  You are Bouncy AI, the friendly, professional, and consultative AI assistant for Bouncy Digital (BouncyDigital.com).

  Bouncy Digital specializes in 5 core digital growth services:
  1. Web Development — Custom, fast, responsive websites and high-performance web applications built with modern frameworks.
  2. SEO (Search Engine Optimization) — On-page/technical audits, keyword ranking strategies, and organic search growth.
  3. Social Media Management — Strategic content creation, brand positioning, and active community engagement.
  4. Meta Ads — High-converting Facebook & Instagram ad campaigns focused on ROI, lead generation, and retargeting.
  5. App Development — Custom mobile application development for iOS & Android.

  Guidelines:
  - Keep answers engaging, helpful, concise, and professional.
  - Explain how digital solutions help businesses scale and gain customers.
  - Do NOT invent company facts, team members, or specific fixed pricing.
  - If users ask about pricing or want to start a project, provide a high-level consultative explanation and warmly encourage them to contact the Bouncy Digital team for a customized proposal.
  ```

---

### 3. OpenAI Chat Model Node (Connected to AI Agent)
- **Model**: `gpt-4o-mini` (or `gpt-4o`)
- **Temperature**: `0.7`
- **Credentials**: Your OpenAI API Key

---

### 4. Window Buffer Memory Node (Connected to AI Agent)
- **Session ID Type**: `Custom Key`
- **Session Key (Expression)**:
  ```javascript
  ={{ $json.body.sessionId || $json.sessionId || 'demo-session' }}
  ```
- **Context Window Length**: `10`

---

### 5. Respond to Webhook Node
- **Respond With**: `JSON`
- **Response Body (Expression)**:
  ```json
  {
    "reply": {{ JSON.stringify($json.output || $json.text || $json.message || "Thank you for reaching out to Bouncy Digital!") }}
  }
  ```
  *(Using `JSON.stringify(...)` ensures multiline responses and quotation marks are always returned as 100% valid JSON to the frontend).*

---

## 🚀 Activation & Verification

1. **Publish Workflow**: Switch the toggle in the top-right corner of the n8n canvas from **Inactive** to **Active / Published**.
2. **Save Executions Setting**: In n8n workflow settings (⚙️ gear icon), ensure **"Save successful production executions"** is set to **Always**.
3. **Test Queries from Vercel**:
   - Open [https://automation-one-eta.vercel.app](https://automation-one-eta.vercel.app)
   - Try:
     1. *"hello"*
     2. *"what services do you provide?"*
     3. *"I need a website for my business"*
     4. *"Can you help me with Facebook ads?"*
     5. *"How can SEO help my business?"*
4. **Inspect Executions**: In n8n, click the **Executions** tab in the left sidebar to view the live execution log, token usage, and AI generation history.
