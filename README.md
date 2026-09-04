# Bouncy Digital AI Chatbot — Phase 1 Demo Interface

A modern, responsive, and high-performance AI Chatbot frontend built for **Bouncy Digital** ([BouncyDigital.com](https://bouncydigital.com)).

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Build for Production / Vercel
```bash
npm run build
```

---

## 📁 Project Structure

```
AUTOMATION/
├── public/
│   └── favicon.svg             # Bouncy geometric icon
├── src/
│   ├── components/
│   │   ├── ChatHeader.tsx      # Bouncy Digital branding, online status, reset action
│   │   ├── ChatInput.tsx       # Textarea input, Enter-to-send, Send/Mic/Attachment buttons
│   │   ├── ChatWindow.tsx      # Main chatbot card orchestrating UI & chat state
│   │   ├── MessageBubble.tsx   # User & Assistant message bubbles with timestamps & copy
│   │   ├── MessageList.tsx     # Message scroll container with smooth auto-scrolling
│   │   ├── QuickActions.tsx    # 5 Service suggestion chips (Web Dev, SEO, Social Media, etc.)
│   │   ├── Toast.tsx           # Feedback notification for Phase 2 placeholders
│   │   └── TypingIndicator.tsx # Animated pulsing dots while waiting for responses
│   ├── lib/
│   │   └── chatApi.ts          # Isolated communication function (Mock in Phase 1 -> n8n in Phase 2)
│   ├── types/
│   │   └── chat.ts             # TypeScript interfaces
│   ├── App.tsx                 # App layout with responsive agency backdrop
│   ├── index.css               # Design system, glassmorphism, custom scrollbar
│   └── main.tsx                # React root mount
├── index.html                  # SEO tags & Google Fonts (Plus Jakarta Sans)
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Brand color tokens & custom animations
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel deployment routing configuration
└── vite.config.ts              # Vite configuration
```

---

## 🔌 Connecting to n8n in Phase 2

All chatbot communication is isolated inside [`src/lib/chatApi.ts`](./src/lib/chatApi.ts).

To connect the frontend to your live n8n workflow in Phase 2:
1. Open `src/lib/chatApi.ts`.
2. Set `N8N_WEBHOOK_URL` to your live n8n webhook URL:
   ```ts
   export const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/bouncy-chat";
   ```
3. The function will automatically POST `{ "message": "user text" }` to n8n and display the `{ "reply": "AI response" }` without touching any UI component!
