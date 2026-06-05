# ⚡ LayoutExport

LayoutExport is a premium, modular React + Tailwind CSS landing page builder designed for bootstrapped SaaS founders and creators. Visually design, reorder, customize, and export fully responsive landing page components ready to deploy to Vercel or Netlify for $0 hosting fees.

## 🚀 Features
- **Visual Section Manager**: Seamless native drag-and-drop builder to reorder layout blocks.
- **Modern Themes**: Swap layout presets between Neubrutalism (Gumroad style), Glassmorphism, and Linear (Command-center style) instantly.
- **Perfect Text Contrast**: Awareness engine automatically manages font colors for light and dark palettes to ensure maximum readability.
- **100% Zero-Lockin Export**: Clean React component code with inline SVGs, completely self-contained.

---

## 📽️ Video Tutorial & Setup Guide
Check out our step-by-step video guide showing how to design and host your first landing page:
👉 **[Watch the LayoutExport Video Setup Guide](https://youtube.com/placeholder-video-link)**

---

## 🛠️ Step-by-Step Landing Page Setup Guide

Once you click the **"Export Code"** button, follow these simple steps to deploy your landing page in a fresh Next.js or React application:

### Step 1: Add the React Component to Your Project
1. Copy the code from the **1. Component Code (TSX)** tab.
2. Inside your Next.js project, create a new file under `components/LandingPage.tsx` and paste the code.
3. Import the component in your route page (e.g. `app/page.tsx` for Next.js app router):
   ```tsx
   import LandingPage from '@/components/LandingPage';

   export default function Page() {
     return <LandingPage />;
   }
   ```

### Step 2: Configure Custom Tailwind Styling
Since styles like Neubrutalism offset shadows and Glassmorphism aren't built into Tailwind by default, you must paste the configurations shown in the **2. Tailwind Config / Styles (CSS)** tab:

* **If using Tailwind CSS v4** (Default in new Next.js 15 apps):
  Open your main CSS file (usually `app/globals.css` or `src/index.css`) and paste the `@theme` rules:
  ```css
  @theme {
    --shadow-neubrutalism-sm: 2px 2px 0px 0px rgba(0, 0, 0, 1);
    --shadow-neubrutalism-md: 4px 4px 0px 0px rgba(0, 0, 0, 1);
    --shadow-neubrutalism-lg: 8px 8px 0px 0px rgba(0, 0, 0, 1);
    --shadow-neubrutalism-btn: 3px 3px 0px 0px rgba(0, 0, 0, 1);
    --shadow-neubrutalism-btn-hover: 1.5px 1.5px 0px 0px rgba(0, 0, 0, 1);
    --shadow-neubrutalism-card: 6px 6px 0px 0px rgba(0, 0, 0, 1);
    
    --font-sans: 'Inter', sans-serif;
    --font-heading: 'Outfit', sans-serif;
  }
  ```

* **If using Tailwind CSS v3** (Default in Next.js 13/14 apps):
  Paste the extend configurations inside your `tailwind.config.js` file:
  ```js
  module.exports = {
    theme: {
      extend: {
        boxShadow: {
          'neubrutalism-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
          'neubrutalism-md': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
          'neubrutalism-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
          'neubrutalism-btn': '3px 3px 0px 0px rgba(0, 0, 0, 1)',
          'neubrutalism-btn-hover': '1.5px 1.5px 0px 0px rgba(0, 0, 0, 1)',
          'neubrutalism-card': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Outfit', 'sans-serif'],
        }
      }
    }
  }
  ```

### Step 3: Run and Test
Run `npm run dev` in your local project and view your stunning new landing page!

---

## 💻 Local Development Setup

To run the LayoutExport editor application locally on your device:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RehanScript/LayoutExport.git
   cd LayoutExport
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the local dev server**:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL (usually `http://localhost:5173/`).
