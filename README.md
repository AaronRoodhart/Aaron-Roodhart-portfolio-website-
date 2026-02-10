# The Digital Compass - Personal Portfolio

An interactive portfolio website featuring a circular navigation compass with smooth animations and transitions.

## Features

- **Interactive Navigation Wheel**: Hover-responsive compass with three main categories
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Category-Based Content**: Experience, Cool Things, and Personal Life sections
- **Accordion Items**: Expandable content cards with images and descriptions
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Personal Site/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles and Tailwind imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Technologies

- **React 18** - UI library
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

## Customization

### Adding New Content

Edit the `DATA` array in `src/App.jsx` to add new portfolio items. Each item should have:
- `id`: Unique identifier
- `category`: One of 'experience', 'cool-things', or 'personal'
- `title`: Item title
- `role`: Subtitle/role
- `year`: Time period
- `description`: Detailed description
- `image`: Image URL
- `tags`: Array of tag strings

### Modifying Categories

Update the `CATEGORIES` object in `src/App.jsx` to change colors, labels, or angle ranges.

## License

Personal project - All rights reserved
