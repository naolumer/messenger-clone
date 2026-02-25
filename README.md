# 💬 Messenger Clone  
### Real-Time Chat App (Next.js 16 + Prisma + Pusher)

Modern full-stack messaging platform with real-time conversations, group chat, and presence tracking — inspired by Messenger.

---

## 🌐 Live Demo

🔗 https://messenger-clone-hke1.vercel.app

---

## ✨ Core Features

| Category | Features |
|----------|---------|
| **Authentication** | Email & OAuth login, secure sessions |
| **Messaging** | 1-to-1 chat, group chat, images, read receipts |
| **Realtime** | Instant messages, live updates, presence |
| **User** | Profile & settings |
| **UI** | Responsive layout, sidebar chat navigation |

---

## 🧱 Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React
- Tailwind CSS
- Headless UI

**Backend**
- Next.js Server Actions / Route Handlers
- Prisma ORM
- PostgreSQL
- NextAuth

**Realtime**
- Pusher Channels

---

## ⚡ How Realtime Works

```
User sends message
      ↓
Stored in DB (Prisma)
      ↓
Pusher event emitted
      ↓
Subscribed clients receive
      ↓
UI updates instantly
```

---

## ⚙️ Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

GITHUB_ID=
GITHUB_SECRET=

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=

NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

---

## 📄 License

MIT
