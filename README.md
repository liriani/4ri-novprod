# LIRI. - Product Designer Portfolio

A modern, dark-themed portfolio showcasing product design work with interactive case studies, custom cursor, and comprehensive design system.


---

## 🎯 Project Overview

**Live Portfolio:** Personal portfolio website featuring:
- Interactive project cards with flip animations
- Detailed case studies for FIAP HealthHub, Nohs Somos, and Creators Fit
- Custom dual-layer cursor with hover effects
- Light/Dark theme support
- Fully responsive design
- Design system documentation page

---

## 🚀 Features

### **Interactive Project Cards**
- Flip animation on hover revealing project preview
- Smooth transitions and hover states
- Dynamic content loading via JavaScript modules

### **Custom Cursor System**
- Dual-layer cursor (outer ring + inner dot)
- Expands on interactive element hover
- Smooth follow animation with lag effect
- Auto-hides on mobile devices

### **Theme System**
- Dark theme (default)
- Light theme toggle
- Theme preference persistence via localStorage
- Synchronized across all pages

### **Case Studies**
- Detailed case studies with dedicated pages
- Scroll spy navigation sidebar
- Section-based content structure
- High-quality project visuals

### **Design System**
- Comprehensive design system documentation
- Typography specimens
- Color palette showcase
- Component library
- Animation examples
- Accessible design patterns

---

## 📁 Project Structure

```
4ri-novprod/
├── index.html                 # Main portfolio page
├── favicon.ico               # Site favicon
│
├── assets/                   # Image assets
│   ├── about.PNG
│   ├── fiap/                # FIAP HealthHub case study images
│   ├── nohs-somos/          # Nohs Somos case study images
│   └── creators-fit/        # Creators Fit case study images
│
├── cases/                    # Case study pages
│   ├── fiap-healthhub.html
│   ├── nohs-somos.html
│   └── creators-fit.html
│
├── css/                      # Stylesheets
│   ├── styles.css           # Main stylesheet (3900+ lines)
│   └── cursor-only.css      # Isolated cursor styles
│
└── js/                       # JavaScript modules
    ├── script.js            # Main application logic
    ├── projects-data.js     # Project data store
    ├── projects-components.js # UI component generators
    ├── projects-controller.js # Projects page controller
    ├── case-study-cursor.js # Standalone cursor for case studies
    ├── case-study-shared.js # Shared case study utilities
    ├── case-study-template.js # Case study template renderer
    ├── card-pile-content.js # Card pile game content
    ├── card-pile-utils.js   # Card pile utilities
    ├── home-card-pile.js    # Home page card pile
    └── reveal-game.js       # Reveal game interaction
```

---

## 🛠️ Technologies Used

### **Core**
- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript (ES6 Modules)

### **Libraries & Tools**
- [Tailwind CSS](https://tailwindcss.com/) (via CDN) - Utility-first CSS
- [Font Awesome 6.4.0](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Typography
  - Inter (Primary)
  - Anton (Display/Headings)
  - Space Mono (Monospace/Code)

### **Design System**
- CSS Custom Properties (CSS Variables)
- Component-based architecture
- Utility classes
- Design tokens

---

## 🎨 Design System

### **Color Palette**

**Dark Theme (Default):**
```css
--primary-dark: #101111;      /* Main background */
--primary-light: #FDFDFD;     /* Main text */
--accent-color: #FF6B00;      /* Brand orange */
--secondary-text-dark: #A0A0A0; /* Secondary text */
--border-color-dark: #2d2d2d; /* Borders */
```

**Light Theme:**
```css
--primary-light: #FDFDFD;     /* Main background */
--primary-dark: #101111;      /* Main text */
--accent-color: #FF6B00;      /* Brand orange (same) */
--secondary-text-light: #666; /* Secondary text */
--border-color-light: rgba(0,0,0,0.1); /* Borders */
```

### **Typography**

**Font Families:**
- **Primary:** Inter (Body text, UI)
- **Display:** Anton (Headings, Titles)
- **Mono:** Space Mono (Code, Labels)

**Font Sizes:**
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
--font-size-4xl: 2.25rem;  /* 36px */
```

### **Spacing System**
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
--spacing-3xl: 4rem;    /* 64px */
```

### **Border Radius**
```css
--border-radius-sm: 0.25rem;  /* 4px */
--border-radius-md: 0.5rem;   /* 8px */
--border-radius-lg: 1rem;     /* 16px */
--border-radius-full: 9999px; /* Circular */
```

### **Transitions**
```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
```

---

## 🎮 Interactive Features

### **Custom Cursor**

**Components:**
- **Outer Ring:** 20px circle with orange border
- **Inner Dot:** 20px filled orange circle
- **Hover Effect:** Outer ring scales to 1.8x on interactive elements

**Behavior:**
- Follows mouse with smooth lag animation
- Hides native cursor
- Automatically disabled on mobile (< 768px)

### **Project Cards**

**States:**
- **Default:** Shows logo and title
- **Hover:** Flips to reveal project preview with description and cover image
- **Click:** Navigates to detailed case study

### **Scroll Spy Navigation**

**Features:**
- Sticky sidebar on case study pages
- Auto-highlights active section
- Smooth scroll to section on click
- Visual indicator (orange border + color)

---

## 📱 Responsive Design

### **Breakpoints**
```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### **Mobile Optimizations**
- Stacked layouts for small screens
- Touch-optimized buttons and links
- Native cursor on mobile
- Simplified navigation
- Optimized images

---

## 🚦 Getting Started

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional for development)

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/4ri-novprod.git
cd 4ri-novprod
```

2. **Open in browser**
```bash
# Option 1: Direct file open
open index.html

# Option 2: Using Python server
python -m http.server 8000
# Visit http://localhost:8000

# Option 3: Using Node.js http-server
npx http-server
# Visit http://localhost:8080
```

### **No Build Process Required**
This is a static website with no build dependencies. Simply open `index.html` in a browser!

---

## 📂 Key Files Explained

### **index.html**
Main portfolio page containing:
- Navigation header
- About section with card pile game
- Projects grid
- Design system page
- Contact page

### **css/styles.css**
Main stylesheet (~3900 lines) with:
- CSS custom properties (design tokens)
- Layout system (container, grid, flex)
- Component styles (cards, buttons, navigation)
- Typography system
- Color system (dark/light themes)
- Animation utilities
- Responsive breakpoints

### **css/cursor-only.css**
Isolated cursor styles for case study pages:
- Custom cursor element styles
- Native cursor hiding
- Hover state animations
- Mobile reset

### **js/script.js**
Main application logic:
- Custom cursor initialization
- Theme toggle functionality
- Page navigation system
- Scroll animations
- Event listeners

### **js/projects-data.js**
Project data store containing:
- Project metadata
- Case study content
- Image paths
- Technology stacks

### **js/case-study-cursor.js**
Standalone cursor script for case studies:
- No module dependencies
- Self-contained IIFE
- Theme synchronization
- Cursor initialization

---

## 🎯 Case Studies

### **1. FIAP HealthHub**
**Type:** Healthcare Platform  
**Role:** Lead Product Designer & Frontend Developer  
**Recognition:** 2nd Place - FIAP Startup Challenge 2023  

Mobile-first platform connecting long-term patients with clinics, reducing appointment absences by 40%.

**Technologies:** React Native, Node.js, PostgreSQL, AWS

### **2. Nohs Somos**
**Type:** Social Platform  
**Role:** Product Designer & UX Researcher  

Community-driven platform featured in Forbes, focusing on neighborhood engagement and local connections.

**Technologies:** React, Firebase, Google Maps API

### **3. Creators Fit (Privi)**
**Type:** Creator Platform  
**Role:** Lead Product Designer  

Platform connecting fitness creators with their audience, featuring custom profiles and brand management tools.

**Technologies:** React Native, Node.js, MongoDB

---

## 🎨 Component Library

### **Buttons**
- Primary Button (`.btn-primary`)
- Outline Button (`.btn-outline`)
- Text Link (`.nav-link`)

### **Cards**
- Project Card (`.project-card`)
- Content Card (`.card`)
- Next Adventure Card (`.next-adventure-card`)

### **Navigation**
- Header Navigation (`.nav-list`)
- Sidebar Navigation (`.sticky-nav`)
- Breadcrumb Navigation

### **Typography**
- Display Heading (`.case-hero-title`)
- Section Title (`.section-title`)
- Card Title (`.card-title`)
- Body Text (`.body-text`)

---

## 🔧 Customization

### **Changing Colors**

Edit CSS variables in `css/styles.css`:

```css
:root {
    --accent-color: #FF6B00; /* Change to your brand color */
    --primary-dark: #101111; /* Change dark background */
    --primary-light: #FDFDFD; /* Change light background */
}
```

### **Adding Projects**

Add project data to `js/projects-data.js`:

```javascript
{
    id: 9,
    title: "Your Project Name",
    shortTitle: "Short Name",
    description: "Project description...",
    logo: "./assets/your-project/logo.png",
    cover: "./assets/your-project/cover.png",
    tech: ['Tech1', 'Tech2', 'Tech3'],
    caseStudy: { /* ... */ }
}
```

### **Modifying Theme**

Toggle between light/dark themes by clicking the theme button (sun/moon icon) in the navigation.

Theme preference is saved to `localStorage` and persists across sessions.

---

## 📊 Performance

### **Optimizations**
- ✅ Minimal external dependencies
- ✅ Lazy loading for images
- ✅ CSS custom properties (no preprocessor needed)
- ✅ ES6 modules for code splitting
- ✅ RequestAnimationFrame for smooth animations
- ✅ GPU-accelerated transforms
- ✅ Passive event listeners

### **Lighthouse Scores**
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 90+

---

## 🐛 Known Issues

### **Fixed Issues**
- ✅ Custom cursor now working on case study pages
- ✅ CSS conflicts resolved between inline styles and main stylesheet
- ✅ Sidebar navigation active states working properly
- ✅ Theme synchronization across all pages
- ✅ Cursor border-radius missing (added)

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 not supported (uses modern CSS features)

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

### **How to Contribute**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Liri**  
Product Designer & Frontend Developer

- Portfolio: [liri.design](https://liri.design)
- GitHub: [@liriani](https://github.com/liriani)
- LinkedIn: [Liriani](https://linkedin.com/in/liriani/)
- Email: its.liriani@gmail.com

---

## 🙏 Acknowledgments

- **Design Inspiration:** Modern portfolio trends, Awwwards
- **Typography:** Google Fonts (Inter, Anton, Space Mono)
- **Icons:** Font Awesome
- **Color Palette:** Custom design system
- **Special Thanks:** FIAP Startup Challenge team

---

## 📝 Changelog

### **v1.3.0** - February 3, 2026
- ✅ Fixed custom cursor on case study pages
- ✅ Created isolated `cursor-only.css`
- ✅ Resolved CSS conflicts
- ✅ Fixed sidebar navigation active states
- ✅ Added unified navigation styles
- ✅ Improved theme synchronization

### **v1.2.0** - January 2026
- ✅ Added light theme support
- ✅ Implemented theme toggle
- ✅ Enhanced Design System page
- ✅ Improved responsive design

### **v1.1.0** - December 2025
- ✅ Added case study pages
- ✅ Implemented custom cursor
- ✅ Created project card system
- ✅ Built design system documentation

### **v1.0.0** - November 2025
- 🎉 Initial release
- ✅ Portfolio structure
- ✅ Basic styling
- ✅ Project showcase

---

## 💡 Tips for Developers

### **Development Mode**
```bash
# Use a local server to avoid CORS issues with modules
python -m http.server 8000
```

### **Debugging Custom Cursor**
```javascript
// Check if cursor elements exist
console.log(document.querySelector('.cursor-outer'));
console.log(document.querySelector('.cursor-inner'));

// Check if JavaScript is loaded
console.log(window.__cursorInitialized);
```

### **Testing Theme Toggle**
```javascript
// Manually toggle theme in console
document.documentElement.classList.toggle('dark');
document.documentElement.classList.toggle('light');
```

### **Inspecting Project Data**
```javascript
// Access projects data (in browser console on index.html)
import { projectsData } from './js/projects-data.js';
console.log(projectsData);
```

---

## 🎓 Learning Resources

This project demonstrates:
- **ES6 Modules** - Code organization and reusability
- **CSS Custom Properties** - Design token system
- **Intersection Observer** - Scroll spy navigation
- **LocalStorage** - Theme persistence
- **Custom Cursor** - Advanced mouse tracking
- **Responsive Design** - Mobile-first approach
- **Component Architecture** - Modular UI components

---

**Built with ❤️ and ☕ by Liri**

*Last Updated: February 3, 2026*
