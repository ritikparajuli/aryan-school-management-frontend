# Aryan School Management System - Frontend

## College Management Platform

This is the frontend application for the Aryan School Management System built with React, TypeScript, and TanStack Router.

## Features

- 👨‍🎓 **Student Dashboard** - View results, attendance, materials, and calendar
- 👨‍🏫 **Teacher Dashboard** - Manage attendance, upload notes, assignments, and results
- 👑 **Admin Dashboard** - Complete system overview and user management
- 💬 **Real-time Messaging System** - Communicate between students, teachers, and admins
- 📊 **Attendance Management** - Track and monitor attendance
- 📝 **Assignment Management** - Upload and submit assignments
- 🎯 **Results Management** - Add and view results with performance tracking
- 📅 **College Calendar** - Stay updated with events and deadlines

## Technologies Used

- **React 18** - UI Library
- **TypeScript** - Type-safe JavaScript
- **TanStack Router** - File-based routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon set
- **Sonner** - Toast notifications
- **Shadcn/ui** - Reusable UI components

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/ritikparajuli/aryan-school-management-frontend.git
cd aryan-school-management-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run type-check
```

### Project Structure

```
├── public/
│   ├── aryan_college.jpg
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   ├── AppLayout.tsx
│   │   ├── Footer.tsx
│   │   ├── MessagePage.tsx
│   │   └── PageHeader.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── lovable-error-reporting.ts
│   │   ├── mock-data.ts
│   │   └── utils.ts
│   ├── routes/
│   │   ├── admin/
│   │   │   └── messages.tsx
│   │   ├── student/
│   │   │   └── messages.tsx
│   │   ├── teacher/
│   │   │   └── messages.tsx
│   │   ├── __root.tsx
│   │   ├── admin.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── README.md
│   │   ├── student.attendance.tsx
│   │   ├── student.calendar.tsx
│   │   ├── student.index.tsx
│   │   ├── student.materials.tsx
│   │   ├── student.results.tsx
│   │   ├── student.tsx
│   │   ├── teacher.assignments.tsx
│   │   ├── teacher.attendance.tsx
│   │   ├── teacher.calendar.tsx
│   │   ├── teacher.index.tsx
│   │   ├── teacher.notes.tsx
│   │   ├── teacher.results.tsx
│   │   ├── teacher.students.tsx
│   │   └── teacher.tsx
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── AGENTS.md
├── bunfig.toml
├── components.json
├── eslint.config.js
├── generate-readme.cjs
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript type checking |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Aryan College

## Live Demo

[Coming Soon]

## Contact

- **Author**: Ritik Parajuli
- **GitHub**: [@ritikparajuli](https://github.com/ritikparajuli)

## Acknowledgments

- Built with ❤️ for Aryan College
- Special thanks to all contributors
