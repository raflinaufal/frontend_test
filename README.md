# Frontend Technical Test

A modern React application built with Next.js 14, TypeScript, and shadcn/ui
demonstrating user management features with responsive design and best
practices.

## 🚀 Features

### ✅ Task 1 - Setup Complete

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **SWR** for data fetching
- **Jest** + **React Testing Library** for testing

### ✅ Task 2 - Users List Page (`/users`)

- **Responsive table** with Name, Email, Website columns
- **Real-time search** and filtering
- **Column sorting** (Name, Email, Website)
- **Loading states** with skeleton loaders
- **Error handling** with user-friendly messages
- **Mobile-responsive** with card layout
- **Client-side data fetching** using SWR

### 🚀 Task 3 - User Details Page (`/users/[id]`)

- **Server-side rendering** for SEO optimization
- **Dynamic routes** with user ID parameters
- **Comprehensive user information** display
- **Contact links** (email, phone, website)
- **Company and address** details
- **Loading and error states**
- **SEO metadata** generation

## 🛠️ Technology Stack

| Category          | Technology                      |
| ----------------- | ------------------------------- |
| **Framework**     | Next.js 14 (App Router)         |
| **Language**      | TypeScript                      |
| **Styling**       | Tailwind CSS + shadcn/ui        |
| **Data Fetching** | SWR (client) + fetch() (server) |
| **Testing**       | Jest + React Testing Library    |
| **Icons**         | Lucide React                    |
| **Components**    | Radix UI (via shadcn/ui)        |

## 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd frontend-test
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Open application** Navigate to
   [http://localhost:3000](http://localhost:3000)

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# Testing
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
```

## 📁 Project Structure

```
src/
├── app/
│   ├── users/
│   │   ├── [id]/
│   │   │   └── page.tsx     # User details page (SSR)
│   │   └── page.tsx         # Users list page (CSR)
│   ├── globals.css          # Global styles + CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── alert.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── skeleton.tsx
│       └── table.tsx
└── lib/
    └── utils.ts             # Utility functions
```

## 🎯 Key Features Implementation

### Data Fetching Strategy

- **Users List (`/users`):** Client-side with SWR for interactivity
- **User Details (`/users/[id]`):** Server-side with fetch() for SEO

### Responsive Design

- **Desktop:** Full table layout with sortable columns
- **Mobile:** Card-based layout for better UX
- **Breakpoints:** Tailwind's responsive utilities

### User Experience

- **Loading States:** Skeleton components during data fetch
- **Error Handling:** User-friendly error messages
- **Search & Filter:** Real-time client-side filtering
- **Sorting:** Multiple column sorting with visual indicators

### Performance Optimizations

- **ISR:** 5-minute revalidation for user details
- **TypeScript:** Full type safety
- **Modern React:** React 18 with Suspense
- **Optimized Builds:** Next.js production optimizations

## 🌐 API Integration

**Data Source:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

**Endpoints Used:**

- `GET /users` - Fetch all users
- `GET /users/{id}` - Fetch specific user details

## 🚦 Testing Strategy

- **Unit Tests:** Component rendering and functionality
- **Integration Tests:** User interactions and data flow
- **Mocking:** Network requests with Jest mocks
- **Coverage:** Focus on critical user paths

## 📱 Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge
- **Mobile browsers:** iOS Safari, Chrome Mobile
- **Progressive Enhancement:** Graceful degradation for older browsers

## 🔧 Development Notes

### Code Quality

- **ESLint** configuration for code consistency
- **TypeScript** strict mode enabled
- **Prettier** formatting (via shadcn/ui)

### Accessibility

- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly structure
- **Focus indicators** for better UX

### SEO Optimization

- **Meta tags** for user detail pages
- **Structured data** with proper headings
- **Server-side rendering** for content pages
- **Dynamic metadata** generation

## 🚀 Deployment

The application is ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting platform**

## 📄 License

This project is created for technical assessment purposes.
