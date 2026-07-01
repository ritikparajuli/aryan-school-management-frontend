// generate-readme.cjs of frontend
const fs = require('fs');
const path = require('path');

function generateStructure(dir, prefix = '', depth = 0) {
    let structure = '';
    if (!fs.existsSync(dir) || depth > 3) return structure;
    
    const items = fs.readdirSync(dir);
    const sorted = items.sort((a, b) => {
        try {
            const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
            const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        } catch (e) { return 0; }
    });

    const filtered = sorted.filter(item => {
        const exclude = ['node_modules', '.git', 'dist', 'build', '.lovable', '__pycache__', '.vscode', '.idea', 'coverage', '.next'];
        const excludeFiles = ['.env', 'package-lock.json', 'bun.lock', '.gitignore', '.DS_Store', 'yarn.lock'];
        const fullPath = path.join(dir, item);
        try {
            const isDir = fs.statSync(fullPath).isDirectory();
            if (isDir) return !exclude.includes(item) && !item.startsWith('.');
            else return !excludeFiles.includes(item) && !item.startsWith('.');
        } catch (e) { return false; }
    });

    filtered.forEach((item, index) => {
        const fullPath = path.join(dir, item);
        const isLast = index === filtered.length - 1;
        const connector = isLast ? '└── ' : '├── ';
        const childPrefix = isLast ? '    ' : '│   ';
        try {
            const isDir = fs.statSync(fullPath).isDirectory();
            if (isDir) {
                structure += prefix + connector + item + '/\n';
                structure += generateStructure(fullPath, prefix + childPrefix, depth + 1);
            } else {
                structure += prefix + connector + item + '\n';
            }
        } catch (e) {}
    });
    return structure;
}

// Generate structure from root
const rootStructure = generateStructure('.', '', 0);

// Create README content
const readmeContent = '# Aryan School Management System - Frontend\n\n' +
'## College Management Platform\n\n' +
'This is the frontend application for the Aryan School Management System built with React, TypeScript, and TanStack Router.\n\n' +
'## Features\n\n' +
'- 👨‍🎓 **Student Dashboard** - View results, attendance, materials, and calendar\n' +
'- 👨‍🏫 **Teacher Dashboard** - Manage attendance, upload notes, assignments, and results\n' +
'- 👑 **Admin Dashboard** - Complete system overview and user management\n' +
'- 💬 **Real-time Messaging System** - Communicate between students, teachers, and admins\n' +
'- 📊 **Attendance Management** - Track and monitor attendance\n' +
'- 📝 **Assignment Management** - Upload and submit assignments\n' +
'- 🎯 **Results Management** - Add and view results with performance tracking\n' +
'- 📅 **College Calendar** - Stay updated with events and deadlines\n\n' +
'## Technologies Used\n\n' +
'- **React 18** - UI Library\n' +
'- **TypeScript** - Type-safe JavaScript\n' +
'- **TanStack Router** - File-based routing\n' +
'- **Tailwind CSS** - Utility-first CSS framework\n' +
'- **Lucide Icons** - Beautiful icon set\n' +
'- **Sonner** - Toast notifications\n' +
'- **Shadcn/ui** - Reusable UI components\n\n' +
'## Installation\n\n' +
'### Prerequisites\n' +
'- Node.js (v18 or higher)\n' +
'- npm or bun\n\n' +
'### Setup\n\n' +
'```bash\n' +
'# Clone the repository\n' +
'git clone https://github.com/ritikparajuli/aryan-school-management-frontend.git\n' +
'cd aryan-school-management-frontend\n\n' +
'# Install dependencies\n' +
'npm install\n\n' +
'# Start development server\n' +
'npm run dev\n' +
'```\n\n' +
'## Development\n\n' +
'```bash\n' +
'# Start development server\n' +
'npm run dev\n\n' +
'# Build for production\n' +
'npm run build\n\n' +
'# Preview production build\n' +
'npm run preview\n\n' +
'# Run type checking\n' +
'npm run type-check\n' +
'```\n\n' +
'### Project Structure\n\n' +
'```\n' +
rootStructure +
'```\n\n' +
'### Environment Variables\n\n' +
'Create a `.env` file in the root directory:\n\n' +
'```env\n' +
'VITE_API_URL=http://localhost:8000\n' +
'```\n\n' +
'## Available Scripts\n\n' +
'| Command | Description |\n' +
'|---------|-------------|\n' +
'| `npm run dev` | Start development server |\n' +
'| `npm run build` | Build for production |\n' +
'| `npm run preview` | Preview production build |\n' +
'| `npm run type-check` | Run TypeScript type checking |\n\n' +
'## Contributing\n\n' +
'1. Fork the repository\n' +
'2. Create your feature branch (`git checkout -b feature/amazing-feature`)\n' +
'3. Commit your changes (`git commit -m \'Add some amazing feature\'`)\n' +
'4. Push to the branch (`git push origin feature/amazing-feature`)\n' +
'5. Open a Pull Request\n\n' +
'## License\n\n' +
'MIT © Aryan College\n\n' +
'## Live Demo\n\n' +
'[Coming Soon]\n\n' +
'## Contact\n\n' +
'- **Author**: Ritik Parajuli\n' +
'- **GitHub**: [@ritikparajuli](https://github.com/ritikparajuli)\n\n' +
'## Acknowledgments\n\n' +
'- Built with ❤️ for Aryan College\n' +
'- Special thanks to all contributors\n';

fs.writeFileSync('README.md', readmeContent);
console.log('✅ README.md created with complete project structure!');
console.log('📁 Structure includes all files and folders from your project!');