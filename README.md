# Student Search University Portal

*Student admission review system with optimized UI for minimal scrolling and mouse operations*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/peters-projects-0870b8f0/v0-university-student-portal-zd)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/s7u3rlhM4Dz)

## Overview

A Next.js application for university student admission review, designed to minimize reviewer mouse operations and eliminate unnecessary scrolling during document review.

### Key Features

- **🎯 Optimized Layout**: Minimal scrolling with flexible document column height
- **⚡ Fast Review**: Efficient UI for quick student record processing  
- **📱 Responsive**: Works on all screen sizes
- **🔒 Authentication**: Secure login system for reviewers
- **📊 Dashboard**: Real-time statistics and student management

## Deployment on Vercel

This project is optimized for automatic deployment on Vercel via GitHub integration.

### Auto-Deploy Setup (Recommended)

1. **Connect Repository**: Link this GitHub repository to your Vercel account
2. **Auto-Deploy**: Vercel will automatically deploy on every push to `main` branch
3. **Build Settings**: Uses default Next.js build configuration

### Manual Deploy

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Configuration

No environment variables required for basic functionality. The app uses mock data for development and demo purposes.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Build and Test

```bash
# Build for production
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── student-details.tsx # Optimized student details view
├── lib/                   # Utilities and data
│   ├── mock-data.ts      # Sample student data
│   └── mock-auth.ts      # Authentication logic
└── public/               # Static assets
```

## Key Optimizations

### UI/UX Improvements

- **✅ Flexible Document Column**: Eliminates fixed height scrolling
- **✅ Increased Font Sizes**: Better readability across all components
- **✅ Optimized Grid Layout**: 4-4-2 column distribution for better space usage
- **✅ Complete Mock Data**: All sample student IDs have full information
- **✅ Clean Codebase**: No unused imports, variables, or deprecated naming

### Technical Features

- **Next.js 15**: Latest framework features
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible components
- **Responsive Design**: Mobile-first approach

## How It Works

1. **Authentication**: Reviewers log in with mock credentials
2. **Student Search**: Search by student ID (MSSV) 
3. **Document Review**: Check documents without scrolling
4. **Quick Actions**: One-click approval/rejection
5. **Real-time Updates**: Status changes reflect immediately

## Deployment Status

✅ **Ready for Production**
- All builds successful
- No TypeScript errors  
- No runtime errors
- Vercel configuration optimized
- GitHub integration ready
