# Admin Template

## Configuration System

This template includes a powerful configuration system that allows you to customize various aspects of the application without modifying the source code.

### Available Configuration Files

- **Site Configuration** (`config/site.ts`): Customize branding, images, links, and more
- **Theme Configuration** (`config/theme.ts`): Customize colors, typography, and layout settings

### How to Customize

#### Changing the Logo and Brand Name

1. Open `config/site.ts`
2. Update the `logo` section:

```typescript
logo: {
  icon: "YourIconName", // Icon from lucide-react
  text: "Your Company Name",
},
```

#### Changing the Background Image

1. Add your image to the `public/` directory
2. Open `config/site.ts`
3. Update the image path:

```typescript
assets: {
  images: {
    authBackground: "/your-image.jpg", // Path relative to public directory
  },
},
```

#### More Customization Options

See the detailed documentation in `config/README.md` for more customization options.

## Getting Started

## Getting Started

### Clerk Authentication Setup

This project uses Clerk for authentication. Before running the development server:

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Get your API keys from the Clerk Dashboard
4. Update the `.env.local` file with your Clerk API keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
CLERK_SECRET_KEY=sk_test_your-secret-key
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication Features

- User sign-in and sign-up with Clerk
- Protected routes using Clerk middleware
- User profile management with Clerk's UserButton
- Sign-in/Sign-up buttons for unauthenticated users

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components
- `middleware.ts` - Clerk authentication middleware
- `.env.local` - Environment variables for Clerk configuration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Clerk Documentation](https://clerk.com/docs) - learn about Clerk authentication.
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs) - official Clerk Next.js integration guide.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
