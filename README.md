<!-- README_START -->
# LocalPress - Neighborhood News Hub

A modern, clean news aggregation platform that delivers hyper-local news based on your zip code. Get all your neighborhood news in one place with an intuitive, mobile-first design that's as friendly as a local bulletin board but as sleek as Apple News.

## Features

- **Zip Code-Based News Discovery** - Enter your zip code to get news tailored to your exact location
- **Smart Category Organization** - News organized by Local News, Politics, Business, Sports, Weather, and Community topics
- **Responsive Mobile-First Design** - Beautiful experience on all devices
- **Fast Loading with Animations** - Smooth loading states and transitions
- **Tip Integration** - Support local journalism with easy donation options
- **Email Newsletter Signup** - Stay informed with optional local news notifications
- **Clean Typography** - Easy-to-read Inter font family throughout
- **Source Attribution** - Clear attribution to original news sources
- **Fallback Handling** - Graceful messages when no news is available

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=my-news-site-production)

## Original Prompt

This application was built based on the following request:

> Build a modern, clean, and simple news-aggregating website. The homepage should ask the user to enter their zip code. Once entered, the site should pull and display a feed of free, publicly available news articles relevant to that zip code. Organize the news by topic (e.g. local news, events, crime, politics, weather). Include a "Tip This Site" button on every page so users can send a small donation (integrate a simple payment method like Stripe or Buy Me a Coffee). The site should have: A responsive design that looks great on mobile and desktop, A clear, friendly headline and subheadline on the homepage, A loading animation while news is being fetched, A fallback message if no news is available for a zip code, A footer with simple navigation: About, Contact, Privacy Policy, An optional email sign-up form to be notified of new local headlines. Keep the design modern, clean, and user-friendly — like a cross between Apple News and a neighborhood bulletin board.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **CMS**: [Cosmic](https://www.cosmicjs.com) headless CMS
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Inter font family for modern typography
- **Icons**: Lucide React for consistent iconography
- **Runtime**: Bun for fast package management and development

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account and bucket set up
- Basic knowledge of Next.js and TypeScript

### Installation

1. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd localpress-news-hub
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Cosmic CMS credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching News Articles by Zip Code
```typescript
import { cosmic } from '@/lib/cosmic'

// Get articles for specific zip code areas
const articles = await cosmic.objects
  .find({
    type: 'news-articles',
    'metadata.zip_code_areas': zipCodeId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating a New Tip
```typescript
const tip = await cosmic.objects.insertOne({
  type: 'tips',
  title: `Tip from ${tipperName}`,
  metadata: {
    amount: tipAmount,
    tipper_name: tipperName,
    message: message,
    tip_date: new Date().toISOString().split('T')[0],
    show_publicly: showPublicly
  }
})
```

### Newsletter Signup Implementation
```typescript
// Create subscriber in Cosmic
const subscriber = await cosmic.objects.insertOne({
  type: 'newsletter-subscribers',
  title: email,
  metadata: {
    email: email,
    zip_code: zipCode,
    subscribed_date: new Date().toISOString(),
    active: true
  }
})
```

## Cosmic CMS Integration

This app leverages your existing Cosmic content structure:

- **News Articles**: Display news with categories, sources, and zip code targeting
- **Zip Code Areas**: Location-based content filtering
- **News Sources**: Attribution and source credibility
- **Tips**: Community support and engagement tracking

The integration uses the [Cosmic SDK](https://www.cosmicjs.com/docs) for seamless content management and real-time updates.

## Deployment Options

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add your environment variables in Netlify dashboard
4. Deploy automatically

### Environment Variables for Production
Set these in your hosting platform:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->