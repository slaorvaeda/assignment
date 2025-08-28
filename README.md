# SnapFetch - Result Checker App

A modern, responsive React application for fetching and displaying user results with a beautiful UI.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Dark/Light Mode**: Toggle between themes
- **Mobile Optimized**: Fully responsive across all devices
- **Real-time Search**: Instant result fetching with loading states
- **Recent Searches**: Keep track of your last 5 searches
- **Auto-scroll**: Smart scroll positioning for better UX
- **Toast Notifications**: User-friendly feedback messages

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Beautiful toast notifications
- **JSONPlaceholder API** - Mock data for testing

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd result-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm deployment settings
   - Deploy!

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Option 3: Manual Upload

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Create new project
   - Upload the `dist` folder
   - Deploy!

## ⚙️ Configuration

The project includes a `vercel.json` file with optimal settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **SPA Routing**: All routes redirect to `index.html`
- **Asset Caching**: Optimized cache headers for static assets

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized scroll behavior
- Mobile-specific layout adjustments

## 🎨 Customization

### Colors & Themes
- Primary: Blue to Purple gradient
- Dark mode: Yellow to Orange gradient
- Easily customizable in `src/index.css`

### Animations
- Smooth transitions and hover effects
- Custom keyframe animations
- Loading states and micro-interactions

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

MIT License - feel free to use this project for your own applications!

---

**Ready for deployment! 🚀**

Your SnapFetch Result Checker app is now optimized and ready to be deployed on Vercel with:
- ✅ Production build completed
- ✅ Vercel configuration added
- ✅ Mobile optimization implemented
- ✅ Performance optimizations applied
