# Frontend Test App

![Next.js](https://img.shields.io/badge/Next.js-14.2.17-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=for-the-badge&logo=jest)

Aplikasi frontend modern yang dibangun dengan Next.js 14, TypeScript, shadcn/ui,
dan SWR. Aplikasi ini menampilkan daftar users dengan fitur pencarian, sorting,
pagination, dan detail user.

## 🚀 Fitur Utama

- **User Management**: Menampilkan daftar users dengan data lengkap
- **Real-time Search**: Pencarian users berdasarkan nama, email, atau website
- **Sorting**: Sorting data berdasarkan nama, email, atau website
- **Pagination**: Navigasi halaman dengan pilihan jumlah item per halaman
- **Responsive Design**: Optimized untuk desktop dan mobile
- **Error Handling**: Error boundary untuk menangani error dengan graceful
- **Unit Testing**: Comprehensive testing dengan Jest dan React Testing Library
- **Type Safety**: Full TypeScript support untuk type safety

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 14.2.17** - React framework dengan App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety

### Styling & UI

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible React components
- **Radix UI** - Low-level UI primitives
- **Lucide React** - Beautiful icons

### Data Fetching & State Management

- **SWR 2.3.6** - Data fetching dengan caching dan revalidation
- **JSONPlaceholder API** - Mock REST API untuk demo

### Testing

- **Jest 30.2.0** - Testing framework
- **React Testing Library** - Testing utilities untuk React
- **Jest Environment JSDOM** - DOM testing environment

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Class Variance Authority** - Utility untuk styling variants

## 📦 Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/raflinaufal/frontend_test.git
   cd frontend-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

4. **Buka browser** dan akses [http://localhost:3000](http://localhost:3000)

## 🚀 Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Menjalankan development server     |
| `npm run build`      | Build aplikasi untuk production    |
| `npm run start`      | Menjalankan production server      |
| `npm run lint`       | Menjalankan ESLint                 |
| `npm test`           | Menjalankan unit tests             |
| `npm run test:watch` | Menjalankan tests dalam watch mode |

## 📁 Struktur Project

```
frontend-test/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── users/              # Users pages
│   │       ├── page.tsx        # Users list page
│   │       └── [id]/           # Dynamic user detail page
│   │           └── page.tsx
│   ├── components/             # Reusable components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── error/              # Error boundary components
│   └── lib/                    # Utilities dan configurations
│       ├── api.ts              # API endpoints dan fetcher
│       ├── types.ts            # TypeScript type definitions
│       └── utils.ts            # Utility functions
├── __tests__/                  # Unit tests
├── public/                     # Static assets
└── config files               # Various config files
```

## 🎯 Halaman dan Fitur

### 1. Homepage (`/`)

- Landing page dengan hero section
- Navigasi ke halaman users
- Responsive design dengan gradient background

### 2. Users List (`/users`)

**Fitur:**

- **Data Fetching**: Menggunakan SWR untuk efisien data fetching
- **Search**: Real-time search berdasarkan nama, email, atau website
- **Sorting**: Click pada header tabel untuk sorting ascending/descending
- **Pagination**: Navigation dengan pilihan 5, 10, 20 items per page
- **Loading States**: Skeleton loading untuk UX yang better
- **Error Handling**: Error boundary dengan retry mechanism

**Kolom Tabel:**

- Name (sortable)
- Username
- Email (sortable)
- Phone
- Website (sortable)
- Company
- Actions (View Detail)

### 3. User Detail (`/users/[id]`)

- Detail lengkap user termasuk alamat dan company info
- Navigation kembali ke users list
- Error handling untuk user tidak ditemukan

## 🧪 Testing

Aplikasi ini memiliki comprehensive unit tests yang mencakup:

### Test Coverage

- **Component Rendering**: Memastikan components render dengan benar
- **User Interactions**: Testing search, sorting, pagination
- **Error Scenarios**: Testing error states dan error boundaries
- **API Integration**: Mocking API calls dan responses

### Menjalankan Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Files

- `__tests__/users.test.tsx` - Testing untuk users list page
- `__tests__/user-details.test.tsx` - Testing untuk user detail page

## 🎨 Design System

### Color Palette

- Menggunakan CSS variables untuk theming
- Support untuk dark/light mode (via Tailwind)
- Consistent color usage across components

### Typography

- Responsive text sizes
- Proper hierarchy dengan heading levels
- Readable line heights dan spacing

### Components

- **shadcn/ui components**: Table, Card, Button, Input, dll.
- **Custom components**: ErrorBoundary, Pagination
- **Consistent styling**: Menggunakan Tailwind classes


### Features

- **Error Handling**: Comprehensive error handling dengan retry logic
- **Loading States**: Loading indicators untuk better UX
- **Caching**: SWR automatic caching dan revalidation
- **Type Safety**: Full TypeScript support untuk API responses

## 🎯 Performance Optimizations

1. **Next.js App Router**: Server-side rendering dan static generation
2. **SWR Caching**: Automatic background revalidation
3. **Code Splitting**: Automatic code splitting oleh Next.js
4. **Image Optimization**: Next.js built-in image optimization
5. **CSS Optimization**: Tailwind CSS purging unused styles

## 🔒 Error Handling

- **Error Boundaries**: React error boundaries untuk graceful error handling
- **API Error Handling**: Comprehensive API error handling dengan user-friendly
  messages
- **Loading States**: Skeleton loading untuk better perceived performance
- **Retry Mechanisms**: Automatic retry untuk failed requests

## 📱 Responsive Design

- **Mobile-First**: Design approach mobile-first
- **Breakpoints**: Tailwind responsive breakpoints
- **Touch-Friendly**: Touch-optimized interactions
- **Accessibility**: ARIA labels dan keyboard navigation

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub repository
2. Connect repository di Vercel dashboard
3. Deploy automatically on every push

### Manual Build

```bash
npm run build
npm run start
```





