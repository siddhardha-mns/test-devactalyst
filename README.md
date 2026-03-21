# DevCatalyst ✨

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-6.0.0-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.0.0-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<div align="center">
  <h3>A student-led developer community focused on learning-by-building</h3>
  <p>DevCatalyst brings together curious minds to explore modern technologies, collaborate on real projects, and become industry-ready through practice, mentorship, and engaging events.</p>
</div>

---

## 🌟 Live Demo

**Experience the magic:** Visit our interactive showcase at your local development server!

- 🏠 **Homepage**: Animated loading screen with starfield
- 🎨 **Components Library**: `/components` - Interactive UI component showcase
- 📖 **About Us**: `/about` - Community values with glowing cards
- 🎯 **Workshops**: `/workshops` - Interactive workshop catalog
- 🖼️ **Gallery**: `/gallery` - Project showcase with glowing effects
- 👥 **Team**: `/team` - Meet the people behind DevCatalyst
- 📞 **Contact**: `/contact` - Get in touch with animated forms

---

## ✨ Featured UI Components

### 🌌 Stars Canvas
A mesmerizing animated starfield background with 1200+ orbiting stars

Note: For contained demos, pass withinContainer to render the canvas inside a card instead of the full viewport.

**Features:**
- 🎨 Customizable color themes via HSL hue
- ✨ Dynamic twinkling effects
- 📱 Fully responsive design
- ⚡ Performance optimized with cached gradients
- 🎛️ Live configuration controls

```tsx
<StarsCanvas 
  maxStars={1200}
  hue={217}
  brightness={0.8}
  speedMultiplier={1.0}
  twinkleIntensity={20}
  withinContainer // confines to parent card
/>
```

### 🌟 Star Border
An interactive border and spotlight effect that follows the cursor

**Features:**
- ✨ Animated gradient border
- 🖱️ Mouse spotlight hover
- 🎛️ Customizable density and radius
- 💫 Smooth motion animations

```tsx
<StarBorder className="p-8">
  <YourContent />
</StarBorder>
```

### 🔘 Liquid Glass Button
Modern glassmorphism buttons with liquid animations

**Features:**
- 🫧 Glass morphism design
- 💧 Liquid hover animations
- 📏 Multiple size variants (sm, md, lg)
- 🎨 Customizable styles (primary, secondary, outline)
- ♿ Accessibility optimized

```tsx
<LiquidButton size="lg" variant="primary">
  Beautiful Button
</LiquidButton>
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddhardha-mns/DevCatalyst.git
   cd DevCatalyst
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` and enjoy the experience!

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.7.0** - Type safety and enhanced developer experience
- **Vite 6.0.0** - Lightning fast build tool and dev server
- **Tailwind CSS 3.3.0** - Utility-first CSS framework

### UI & Animation Libraries
- **Framer Motion 12.0.0** - Production-ready motion library
- **Lucide React 0.263.1** - Beautiful & consistent icon library
- **Class Variance Authority 0.7.1** - Component styling utilities

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
DevCatalyst/
├── 📦 public/                 # Static assets
├── 📂 src/
│   ├── 🧩 components/
│   │   ├── common/            # Shared layout/navigation
│   │   │   ├── Layout.tsx
│   │   │   └── Navigation.tsx
│   │   └── ui/                # UI component library
│   │       ├── stars-canvas.tsx          # ✨ Animated starfield
│   │       ├── gradient-button.tsx       # 🎛️ Gradient button
│   │       ├── LiquidButton.tsx          # 🔘 Glass buttons
│   │       ├── StarBorder.tsx            # 🌟 Interactive border
│   │       └── GlassFilter.tsx           # 🫧 Shared SVG filters
│   ├── 🛠️ features/           # Feature-based modular architecture
│   │   ├── home/              # Homepage feature
│   │   ├── gallery/           # Gallery feature
│   │   ├── workshops/         # Workshops feature
│   │   ├── team/              # Team management feature
│   │   └── ...                # Other modularized features
│   ├── 🪝 hooks/              # Shared hooks
│   ├── 🔧 lib/                # Shared utilities
│   ├── 🎨 index.css           # Global styles
│   ├── ⚛️ App.tsx            # Main app component
│   └── 🚀 main.tsx           # Application entry point
├── ⚙️ tailwind.config.js     # Tailwind configuration
├── 📝 tsconfig.json          # TypeScript configuration
├── ⚡ vite.config.ts         # Vite configuration
└── 📋 package.json           # Dependencies and scripts
```

---

## 🎨 Component Library Features

### Interactive Demos
Visit `/components` to experience our component library:

- 🎮 **Live Configuration Controls** - Adjust parameters in real-time
- 🖥️ **Full-Screen Demos** - Immersive component testing
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Category Filtering** - Easy component discovery
- 📖 **Feature Documentation** - Detailed component guides

### Page-Specific Themes
Each page features unique star configurations:

- 🏠 **Home**: Blue theme (800 stars, loading animation)
- 📖 **About**: Subtle theme (600 stars, glowing value cards)
- 🎯 **Workshops**: Purple theme (700 stars, dynamic speed)
- 🖼️ **Gallery**: Cyan theme (900 stars, glowing project cards)
- 📞 **Contact**: Green theme (500 stars, calming atmosphere)
- 🎨 **Components**: Showcase theme (400 stars, interactive demos)

---

## 🚀 Performance Optimizations

### Rendering Performance
- ⚡ **RequestAnimationFrame** - Smooth 60fps animations
- 🎯 **Cached Gradients** - Optimized star rendering
- 🧠 **Smart Proximity Detection** - Efficient mouse tracking
- 📱 **Responsive Breakpoints** - Adaptive star density

### Memory Management
- 🔄 **Proper Cleanup** - Event listeners and animations
- 🎛️ **Configurable Parameters** - Adjust performance vs quality
- 📊 **Optimized Star Counts** - Balanced per page type

---

## 🌍 Browser Support

- ✅ **Chrome 90+**
- ✅ **Firefox 88+**
- ✅ **Safari 14+**
- ✅ **Edge 90+**
- ⚠️ **Mobile Browsers** (touch optimized)

---

## 🤝 Contributing

We welcome contributions from developers of all levels!

### How to Contribute
1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✨ Make your changes
4. ✅ Test thoroughly
5. 📝 Commit with semantic messages (`git commit -m 'feat: add amazing feature'`)
6. 🚀 Push to your branch (`git push origin feature/amazing-feature`)
7. 🎯 Open a Pull Request

### Development Guidelines
- 📋 Follow TypeScript best practices
- 🎨 Use Tailwind CSS for styling
- ✨ Add animations with Framer Motion
- 🧪 Include tests for new components
- 📖 Update documentation

---

## 📈 Roadmap

### Upcoming Features
- [ ] 🎵 **Sound Effects** - Audio feedback for interactions
- [ ] 🌈 **Color Themes** - Multiple preset color schemes
- [ ] 📱 **Mobile Gestures** - Touch-based interactions
- [ ] 🎮 **Game Mode** - Interactive star collection
- [ ] 🔌 **Plugin System** - Extensible component architecture
- [ ] 🌐 **Internationalization** - Multi-language support

### Community Goals
- 👥 **500+ Active Members**
- 🏆 **100+ Projects Built**
- 🎯 **50+ Workshops Conducted**
- 🌟 **Industry Partnerships**

### Recent Updates (March 2026)
- 📢 **Team Restructuring**: Renamed "Event Planning" to **Outreach Team** for better alignment with community goals.
- 🤝 **New Members**: Welcomed **Hasini Parre** to the Outreach Team and **R.Sai varun** to the Vision Makers.
- 🚀 **Bavana N** transitioned to the Outreach Team to lead event-based initiatives.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎨 **Design Inspiration** - Modern web design trends
- 🌟 **Animation Ideas** - Creative coding community
- 👥 **Community Support** - DevCatalyst members
- 🛠️ **Open Source** - Amazing library maintainers

---

<div align="center">
  <h3>Built with ❤️ by the DevCatalyst Community</h3>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p>🤝 Join us in building the future of developer education</p>
</div>
