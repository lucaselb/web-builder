# Web Builder

An interactive web design builder built with Vue 3, TypeScript, and Vite. Drag and drop UI components, design layouts visually, and export clean HTML/CSS code.

## Technologies Used

- [Vue 3] — Reactive UI framework
- [TypeScript] — Type-safe development
- [Vite] — Fast build tool and dev server

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
web-builder/
├── index.html                # App entry point
├── package.json              # Project metadata & scripts
├── tsconfig*.json            # TypeScript configs
├── vite.config.ts            # Vite configuration
├── public/                   # Static assets
│   ├── icon.svg
│   ├── placeholder.jpg
│   └── vite.svg
├── src/                      # Source code
│   ├── App.vue               # Main app component
│   ├── main.ts               # App entry script
│   ├── style.css             # Global styles
│   ├── assets/               # App-specific assets
│   │   └── vue.svg
│   ├── components/           # UI components
│   │   ├── CanvasElement.vue
│   │   ├── CodeExportPanel.vue
│   │   ├── ComponentSidebar.vue
│   │   └── DesignCanvas.vue
│   ├── composables/          # Reusable logic (composables)
│   │   └── useDragDrop.ts
│   └── data/                 # Static data (component definitions)
│       └── components.ts
└── README.md                 # Project documentation
```

## Features

- Drag & drop UI builder
- Sidebar with categorized components
- Visual design canvas
- Export HTML/CSS code
- TypeScript for type safety

## License

This project is for educational and entertainment purposes.

## Live Demo
