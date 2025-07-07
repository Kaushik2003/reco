# Reco - Professional Portfolio Platform

Reco is a modern, customizable portfolio platform built with Next.js, Tailwind CSS, shadcn/ui, and Zustand. It enables professionals to create, manage, and showcase their portfolios with a beautiful, drag-and-drop interface and fully editable sections.

---

## 🚀 Features

- **Drag-and-drop portfolio sections**: Easily reorder Education, Experience, Projects, Certifications, and Technologies.
- **Editable profile and sections**: Update your profile, skills, social links, and all portfolio content directly in the UI.
- **Responsive sidebar**: Showcases your profile, contact info, and social links.
- **Modern UI**: Built with shadcn/ui and Tailwind CSS for a clean, accessible design.
- **State management**: Uses Zustand for fast, local state updates.
- **Mock data**: Pre-filled with sample data for quick prototyping.
- **Dark mode support**: (If enabled via next-themes)

---

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI components)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Folder Structure

```
reco/
  app/                # Next.js app directory (pages, layout, dashboard)
  components/         # Reusable UI and portfolio components
    forms/            # Form components for editing sections
    ui/               # shadcn/ui and custom UI primitives
  hooks/              # Custom React hooks (edit mode, data, order)
  lib/                # Types, mock data, utilities
  public/             # Static assets (images, placeholders)
  styles/             # Global and Tailwind styles
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd reco
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your portfolio.

---

## 📝 Usage & Customization

- **Edit Profile**: Click the edit icon in the sidebar to update your name, status, bio, email, phone, location, and profile photo.
- **Edit Skills & Socials**: Use the sidebar controls to add/remove skills and social links.
- **Edit Portfolio Sections**: Each section (Education, Experience, Projects, Certifications, Technologies) can be edited, added, or removed. Use the drag handle (visible in edit mode) to reorder sections.
- **Switch to Edit Mode**: (If available) Toggle edit mode to enable drag-and-drop and editing controls.
- **Customize Data**: Update `lib/mock-data.ts` for default/mock content, or connect to your own backend.
- **Styling**: Modify `app/globals.css` and `tailwind.config.js` for custom themes and styles.

---

## 🖼️ Assets

- Default profile photo: `public/images/profile-photo.png`
- Placeholder images/logos: `public/placeholder-*.{svg,png,jpg}`

---

## 🧩 Extending Functionality

- Add new sections by creating new components and updating the section order logic in `use-portfolio-order.ts`.
- Integrate authentication, backend, or CMS as needed.
- Use shadcn/ui and Radix primitives for consistent, accessible UI.

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Lucide Icons](https://lucide.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
