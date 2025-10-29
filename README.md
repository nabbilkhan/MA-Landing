# Mentor Agile Landing Page

A modern, responsive landing page for Mentor Agile's Product Owner Training programs built with Next.js 15, React 19, and Tailwind CSS.

## 🎯 Project Overview

Mentor Agile provides comprehensive Product Owner training through two program formats:
- **VIP Program** ($6,000) - Live coaching with expert instructors plus pre-recorded curriculum
- **On-Demand Program** ($800) - Self-paced learning with lifetime access

The platform helps professionals break into high-paying Product Owner roles with CSPO® certification, AI essentials training, and hands-on portfolio projects.

## 🚀 Tech Stack

- **Framework:** Next.js 15.5.6 (App Router)
- **UI Library:** React 19.1.1
- **Styling:** Tailwind CSS 3.4.17
- **Animations:** GSAP 3.13.0 with ScrollTrigger
- **Icons:** Lucide React 0.469.0
- **Image Optimization:** Next.js Image Component
- **Deployment Ready:** Vercel-optimized

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd MA-Landing

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3001`

## 🎨 Features

### 🏠 Homepage (`/course-landing`)
- Dynamic hero section with animated gradients
- Interactive program comparison (VIP vs On-Demand)
- 12-week curriculum breakdown with all 9 topics:
  - Agile Principles
  - Agile Ceremonies & Artifacts
  - Discovery & Validation
  - MVP Development
  - User Stories, Requirements, & Technical Communication
  - Product Backlog Management & Analytics
  - Release Planning & Strategy
  - Stakeholder Management & Tech-Savvy Leadership
  - AI Essentials
- Certifications showcase (CSPO® + 2 AI certifications)
- Student testimonials carousel
- Scroll-triggered animations
- Sticky navigation header

### 📚 Courses Page (`/courses`)
- Comprehensive program comparison
- Dual-program pricing cards
- Target roles section
- Full curriculum listing
- Certifications information
- Student success stories
- 12-week learning journey breakdown

### ℹ️ About Page (`/about`)
- Company story and mission
- Core values showcase (6 values)
- Curriculum preview
- Certifications overview
- Program comparison cards

### 📞 Contact Page (`/contact`)
- Interactive contact form with validation
- Business information cards
  - Office Location: Chicago, IL
  - Business Hours: CST timezone
  - Email: info@mentoragile.com
  - Phone: +1 (312) 555-0123
- Social media integration
- Smooth scroll animations
- Form submission handling

### 📄 Legal Pages
- **Privacy Policy** (`/privacy`) - Data handling and protection policies
- **Terms of Service** (`/terms`) - Service terms, payment, and refund policies

## 🎯 Recent Updates (Latest Session)

### Navigation & UX Improvements
1. **Fixed NavigationHeader Component**
   - Added cross-page navigation support
   - "Reserve Your Seat" button now works on all pages with fallback behavior
   - Contact link navigates to `/contact` page
   - Logo is now clickable and navigates to homepage
   - All navigation links properly redirect to homepage before scrolling to sections

2. **Theme Consistency**
   - Changed all blue bullet points to gold in Terms page
   - Maintained consistent gold/black theme across all pages
   - Fixed color mismatches in pricing cards

3. **Content Sections Added**
   - Created `CurriculumSection` component with complete 12-week breakdown
   - Created `CertificationsSection` component (CSPO® + 2 AI certs)
   - Created `TestimonialsSection` component with 3 alumni stories
   - All sections feature responsive design and GSAP animations

4. **Contact Page Fixes**
   - Changed timezone from PST to CST
   - Removed placeholder map section
   - Fixed animation loading issues with null checks and cleanup functions
   - Updated all social media links to correct URLs:
     - LinkedIn: https://linkedin.com/company/mentoragile
     - Twitter: https://twitter.com/mentoragile
     - Facebook: https://facebook.com/mentoragile
     - Instagram: https://instagram.com/mentoragile
     - YouTube: https://youtube.com/@mentoragile

5. **Container & Spacing Improvements**
   - Updated section containers from `max-w-[1920px]` to `max-w-7xl` (1280px)
   - Increased horizontal padding for better breathing room
   - Proper margins from screen edges on all displays

6. **Bug Fixes**
   - Fixed hydration error in CurriculumSection floating particles
   - Added client-side only rendering for random animations
   - Proper GSAP animation cleanup to prevent memory leaks
   - Removed 14-day guarantee policy (changed to "All sales are final")

## 📁 Project Structure

```
MA-Landing/
├── app/
│   ├── about/
│   │   └── page.js                 # About page
│   ├── components/
│   │   ├── CurriculumSection.jsx   # 12-week curriculum component
│   │   ├── CertificationsSection.jsx # Certifications showcase
│   │   └── TestimonialsSection.jsx # Student testimonials
│   ├── contact/
│   │   └── page.js                 # Contact page with form
│   ├── course-landing/
│   │   ├── components/
│   │   │   ├── NavigationHeader.jsx # Sticky navigation
│   │   │   ├── SocialFooter.jsx    # Social media footer
│   │   │   └── TestimonialsCarousel.jsx # Homepage carousel
│   │   ├── path-selection/
│   │   │   └── page.js             # Program selection page
│   │   └── page.js                 # Main landing page
│   ├── courses/
│   │   └── page.js                 # Courses listing page
│   ├── privacy/
│   │   └── page.js                 # Privacy policy
│   ├── terms/
│   │   └── page.js                 # Terms of service
│   ├── layout.js                   # Root layout
│   └── globals.css                 # Global styles
├── public/
│   └── images/
│       └── logos/                  # Brand assets
├── package.json
├── tailwind.config.js              # Tailwind configuration
├── next.config.js                  # Next.js configuration
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary (Gold):**
  - `gold-300`: #FDE68A
  - `gold-400`: #FCD34D
  - `gold-500`: #D4AF37
  - `gold-600`: #B8860B
  - `gold-700`: #8B6508

- **Background:**
  - Black: #000000
  - Gray-900: #111827
  - Gray-800: #1F2937

- **Accents:**
  - Glass effects with `backdrop-blur`
  - Gradient overlays
  - Gold glow effects

### Typography
- **Font:** System font stack for optimal performance
- **Headings:** Font-black weights (900)
- **Body:** Font-normal to font-semibold (400-600)

### Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## ⚡ Performance Optimizations

1. **Image Optimization**
   - Next.js Image component with automatic optimization
   - Lazy loading for below-the-fold images
   - WebP format support

2. **Code Splitting**
   - Automatic route-based code splitting
   - Dynamic imports for heavy components

3. **Animation Performance**
   - GSAP for hardware-accelerated animations
   - RequestAnimationFrame for smooth 60fps
   - Proper cleanup to prevent memory leaks

4. **SEO Optimizations**
   - Semantic HTML structure
   - Meta tags configuration
   - Proper heading hierarchy

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://mentoragile.com
NEXT_PUBLIC_API_URL=your-api-url
```

### Tailwind Configuration
Custom color palette and responsive breakpoints configured in `tailwind.config.js`

## 📱 Social Media

- **LinkedIn:** https://linkedin.com/company/mentoragile
- **Instagram:** https://instagram.com/mentoragile
- **YouTube:** https://youtube.com/@mentoragile
- **Facebook:** https://facebook.com/mentoragile
- **Twitter:** https://twitter.com/mentoragile
- **TikTok:** https://tiktok.com/@mentoragile

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build and test production build
npm run build && npm start
```

## 📊 Key Statistics

- **500+** Graduates
- **4.9★** Average Rating
- **$85K+** Average Salary
- **95%** Job Placement Rate
- **12 Weeks** Program Duration

## 🎓 Programs Offered

### VIP Program ($6,000)
- Weekly live cohort sessions
- Full pre-recorded curriculum library
- CSPO® + 2 AI certifications guidance
- Career assets development
- Personalized coach feedback
- Private community access

### On-Demand Program ($800)
- 12-week self-paced curriculum
- Video lessons and worksheets
- CSPO® certification guidance
- AI Essentials training
- Portfolio Capstone Project
- Lifetime access
- Slack community

## 📞 Contact Information

- **Email:** info@mentoragile.com
- **Phone:** +1 (312) 555-0123
- **Location:** Chicago, IL
- **Business Hours:**
  - Monday - Friday: 9:00 AM - 6:00 PM (CST)
  - Saturday: 10:00 AM - 2:00 PM (CST)
  - Sunday: Closed

## 📝 License

Copyright © 2025 Mentor Agile. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or support, please contact info@mentoragile.com

---

**Built with ❤️ by the Mentor Agile Team**
