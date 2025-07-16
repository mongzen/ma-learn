# MaLearn - E-Learning Platform

MaLearn is a comprehensive e-learning platform built with Next.js 15, Payload CMS, and MongoDB. It supports multi-role user management, course creation, payment integration, and cryptocurrency transactions.

## 🚀 Features

### Core Features
- **Multi-Role User System**: Admin, Instructor, and Student roles with different permissions
- **Course Management**: Create, manage, and sell courses with multimedia content
- **Payment Integration**: Support for both fiat currency (Stripe) and cryptocurrency payments
- **Quiz System**: Create assessments with multiple question types
- **Progress Tracking**: Track student progress through courses
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **Payload CMS**: Headless CMS for content management
- **MongoDB**: NoSQL database for scalable data storage
- **Redis**: Caching and session management
- **Docker**: Containerized development environment
- **TypeScript**: Type-safe development
- **Authentication**: Built-in auth with email verification

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Payload CMS, Node.js
- **Database**: MongoDB, Redis
- **Payment**: Stripe, Cryptocurrency support
- **Infrastructure**: Docker, Docker Compose
- **Development**: ESLint, Prettier, Vitest, Playwright

## 📋 Prerequisites

- Node.js 18+
- Docker Desktop
- pnpm (recommended) or npm
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ma-learn
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```

Update the following environment variables in `.env`:
- `PAYLOAD_SECRET`: A secure secret key for Payload CMS
- `DATABASE_URI`: MongoDB connection string
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret

### 4. Start Development Environment
```bash
# Using the management script (recommended)
./manage.sh start

# Or manually
docker-compose up -d
pnpm dev
```

### 5. Seed Database
```bash
# Using the management script
./manage.sh reset

# Or manually
export PAYLOAD_SECRET="your-secret-key-here-change-this-in-production"
export DATABASE_URI="mongodb://localhost:27017/malearn"
npx tsx src/endpoints/seed/simple-seed.ts
```

## 📖 Usage

### Access Points
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API**: http://localhost:3000/api

### Default Login Credentials
- **Admin**: admin@malearn.com / admin123
- **Instructor**: instructor@malearn.com / instructor123
- **Student**: student@malearn.com / student123

### Management Script
The `manage.sh` script provides convenient commands for platform management:

```bash
# Start development environment
./manage.sh start

# Stop development environment
./manage.sh stop

# Reset database and reseed
./manage.sh reset

# Show platform status
./manage.sh status

# Run tests
./manage.sh test

# Build for production
./manage.sh build

# Show help
./manage.sh help
```

## 🏗️ Architecture

### Collections
- **Users**: User management with role-based access control
- **Courses**: Course content, pricing, and curriculum
- **Enrollments**: Student-course relationships and progress tracking
- **Quizzes**: Assessment system with multiple question types
- **Categories**: Course categorization
- **Pages**: Static content pages
- **Posts**: Blog/news posts
- **Media**: File uploads and media management

### User Roles
- **Admin**: Full platform management access
- **Instructor**: Course creation and management
- **Student**: Course enrollment and learning

### Payment System
- **Fiat Currency**: Stripe integration for credit card payments
- **Cryptocurrency**: Support for ETH, BTC, MATIC, BNB

## 🧪 Testing

### Unit Tests
```bash
pnpm test
```

### E2E Tests
```bash
pnpm test:e2e
```

### Integration Tests
```bash
pnpm test:integration
```

## 📦 Building for Production

### Local Build
```bash
pnpm build
pnpm start
```

### Docker Build
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## 🐳 Docker Configuration

### Development Services
- **MongoDB**: Database on port 27017
- **Redis**: Cache and sessions on port 6379
- **Nginx**: Reverse proxy on port 80

### Docker Commands
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Reset volumes
docker-compose down -v
```

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URI=mongodb://localhost:27017/malearn
MONGODB_URL=mongodb://localhost:27017/malearn

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cryptocurrency
NEXT_PUBLIC_ENABLE_CRYPTO_PAYMENTS=true
NEXT_PUBLIC_SUPPORTED_CHAINS=ethereum,polygon,bsc

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Custom Configuration
- **Payload Config**: `src/payload.config.ts`
- **Next.js Config**: `next.config.js`
- **Tailwind Config**: `tailwind.config.mjs`
- **Docker Config**: `docker-compose.yml`

## 🎨 Customization

### Styling
- Tailwind CSS configuration in `tailwind.config.mjs`
- Global styles in `src/app/(frontend)/globals.css`
- Component-specific styles using CSS modules

### Content Types
- Add new collections in `src/collections/`
- Configure fields and access control
- Update API endpoints as needed

### Payment Methods
- Configure Stripe in environment variables
- Add new cryptocurrency support in payment handlers
- Update pricing models in course collections

## 🔒 Security

### Authentication
- Email/password authentication
- Role-based access control
- Session management with Redis

### Data Protection
- Input validation and sanitization
- CSRF protection
- Rate limiting on API endpoints

### Environment Security
- Secure secret management
- Environment variable validation
- Production security headers

## 📊 Monitoring

### Development
- Real-time compilation feedback
- Error reporting and stack traces
- Performance monitoring

### Production
- Health check endpoints
- Error logging and monitoring
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add documentation for new features
- Maintain test coverage

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Database Connection**: Ensure MongoDB is running and accessible
- **Build Errors**: Check Node.js version and dependencies
- **Docker Issues**: Verify Docker Desktop is running
- **Environment Variables**: Ensure all required env vars are set

### Getting Help
- Check the issue tracker for known problems
- Review the documentation
- Submit bug reports with detailed information
- Join our community discussions

## 🛣️ Roadmap

### Upcoming Features
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Video streaming optimization
- [ ] Mobile app development
- [ ] Advanced quiz types
- [ ] Certificate generation
- [ ] Social learning features

### Long-term Goals
- Scalability improvements
- AI-powered recommendations
- Advanced reporting
- Integration marketplace
- Multi-tenant support

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe Documentation](https://stripe.com/docs)

### Community
- [GitHub Discussions](https://github.com/your-repo/discussions)
- [Discord Community](https://discord.gg/your-server)
- [Twitter Updates](https://twitter.com/your-handle)

---

Made with ❤️ by the MaLearn team

3. **Start with Docker**
   ```bash
   # Using the convenience script
   ./docker-dev.sh up

   # Or using Make
   make dev

   # Or using Docker Compose
   docker-compose up -d
   ```

4. **Start the application**
   ```bash
   pnpm install
   pnpm dev
   ```

5. **Access the platform**
   - **Application**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **MongoDB Express**: http://localhost:8081
   - **Redis Commander**: http://localhost:8082

If you have not done so already, you need to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

#### Method 1 (recommended)

Go to Payload Cloud and [clone this template](https://payloadcms.com/new/clone/website). This will create a new repository on your GitHub account with this template's code which you can then clone to your own machine.

#### Method 2

Use the `create-payload-app` CLI to clone this template directly to your machine:

```bash
pnpx create-payload-app my-project -t website
```

#### Method 3

Use the `git` CLI to clone this template directly to your machine:

```bash
git clone -n --depth=1 --filter=tree:0 https://github.com/payloadcms/payload my-project && cd my-project && git sparse-checkout set --no-cone templates/website && git checkout && rm -rf .git && git init && git add . && git mv -f templates/website/{.,}* . && git add . && git commit -m "Initial commit"
```

### Development

1. First [clone the repo](#clone) if you have not done so already
1. `cd my-project && cp .env.example .env` to copy the example environment variables
1. `pnpm install && pnpm dev` to install dependencies and start the dev server
1. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel and unpublished content. See [Access Control](#access-control) for more details.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Posts

  Posts are used to generate blog posts, news articles, or any other type of content that is published over time. All posts are layout builder enabled so you can generate unique layouts for each post using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Posts are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Pages

  All pages are layout builder enabled so you can generate unique layouts for each page using layout-building blocks, see [Layout Builder](#layout-builder) for more details. Pages are also draft-enabled so you can preview them before publishing them to your website, see [Draft Preview](#draft-preview) for more details.

- #### Media

  This is the uploads enabled collection used by pages, posts, and projects to contain media like images, videos, downloads, and other assets. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

- #### Categories

  A taxonomy used to group posts together. Categories can be nested inside of one another, for example "News > Technology". See the official [Payload Nested Docs Plugin](https://payloadcms.com/docs/plugins/nested-docs) for more details.

### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `Header`

  The data required by the header on your front-end like nav links.

- `Footer`

  Same as above but for the footer of your site.

## Access control

Basic access control is setup to limit access to various content based based on publishing status.

- `users`: Users can access the admin panel and create or edit content.
- `posts`: Everyone can access published posts, but only users can create, update, or delete them.
- `pages`: Everyone can access published pages, but only users can create, update, or delete them.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Layout Builder

Create unique page layouts for any type of content using a powerful layout builder. This template comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action
- Archive

Each block is fully designed and built into the front-end website that comes with this template. See [Website](#website) for more details.

## Lexical editor

A deep editorial experience that allows complete freedom to focus just on writing content without breaking out of the flow with support for Payload blocks, media, links and other features provided out of the box. See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

## Draft Preview

All posts and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, posts, and projects will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/examples/draft-preview).

## Live preview

In addition to draft previews you can also enable live preview to view your end resulting page as you're editing content with full support for SSR rendering. See [Live preview docs](https://payloadcms.com/docs/live-preview/overview) for more details.

## On-demand Revalidation

We've added hooks to collections and globals so that all of your pages, posts, footer, or header changes will automatically be updated in the frontend via on-demand revalidation supported by Nextjs.

> Note: if an image has been changed, for example it's been cropped, you will need to republish the page it's used on in order to be able to revalidate the Nextjs image cache.

## SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Search

This template also pre-configured with the official [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) to showcase how SSR search features can easily be implemented into Next.js with Payload. See [Website](#website) for more details.

## Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Jobs and Scheduled Publish

We have configured [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) which uses the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) in order to publish or unpublish your content on a scheduled time. The tasks are run on a cron schedule and can also be run as a separate instance if needed.

> Note: When deployed on Vercel, depending on the plan tier, you may be limited to daily cron only.

## Website

This template includes a beautifully designed, production-ready front-end built with the [Next.js App Router](https://nextjs.org), served right alongside your Payload app in a instance. This makes it so that you can deploy both your backend and website where you need it.

Core features:

- [Next.js App Router](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload/tree/main/packages/admin-bar)
- [TailwindCSS styling](https://tailwindcss.com/)
- [shadcn/ui components](https://ui.shadcn.com/)
- User Accounts and Authentication
- Fully featured blog
- Publication workflow
- Dark mode
- Pre-made layout building blocks
- SEO
- Search
- Redirects
- Live preview

### Cache

Although Next.js includes a robust set of caching strategies out of the box, Payload Cloud proxies and caches all files through Cloudflare using the [Official Cloud Plugin](https://www.npmjs.com/package/@payloadcms/payload-cloud). This means that Next.js caching is not needed and is disabled by default. If you are hosting your app outside of Payload Cloud, you can easily reenable the Next.js caching mechanisms by removing the `no-store` directive from all fetch requests in `./src/app/_api` and then removing all instances of `export const dynamic = 'force-dynamic'` from pages files, such as `./src/app/(pages)/[slug]/page.tsx`. For more details, see the official [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching).

## Development

To spin up this example locally, follow the [Quick Start](#quick-start). Then [Seed](#seed) the database with a few pages, posts, and projects.

### Working with Postgres

Postgres and other SQL-based databases follow a strict schema for managing your data. In comparison to our MongoDB adapter, this means that there's a few extra steps to working with Postgres.

Note that often times when making big schema changes you can run the risk of losing data if you're not manually migrating it.

#### Local development

Ideally we recommend running a local copy of your database so that schema updates are as fast as possible. By default the Postgres adapter has `push: true` for development environments. This will let you add, modify and remove fields and collections without needing to run any data migrations.

If your database is pointed to production you will want to set `push: false` otherwise you will risk losing data or having your migrations out of sync.

#### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deploy with Postgres you will need to make sure you create and then run your migrations.

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.

On the server after building and before running `pnpm start` you will want to run your migrations

```bash
pnpm payload migrate
```

This command will check for any migrations that have not yet been run and try to run them and it will keep a record of migrations that have been run in the database.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

### Seed

To seed the database with a few pages, posts, and projects you can click the 'seed database' link from the admin panel.

The seed script will also create a demo user for demonstration purposes only:

- Demo Author
  - Email: `demo-author@payloadcms.com`
  - Password: `password`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

## Production

To run Payload in production, you need to build and start the Admin panel. To do so, follow these steps:

1. Invoke the `next build` script by running `pnpm build` or `npm run build` in your project root. This creates a `.next` directory with a production-ready admin bundle.
1. Finally run `pnpm start` or `npm run start` to run Node in production and serve Payload from the `.build` directory.
1. When you're ready to go live, see Deployment below for more details.

### Deploying to Payload Cloud

The easiest way to deploy your project is to use [Payload Cloud](https://payloadcms.com/new/import), a one-click hosting solution to deploy production-ready instances of your Payload apps directly from your GitHub repo.

### Deploying to Vercel

This template can also be deployed to Vercel for free. You can get started by choosing the Vercel DB adapter during the setup of the template or by manually installing and configuring it:

```bash
pnpm add @payloadcms/db-vercel-postgres
```

```ts
// payload.config.ts
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  // ...
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // ...
```

We also support Vercel's blob storage:

```bash
pnpm add @payloadcms/storage-vercel-blob
```

```ts
// payload.config.ts
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  // ...
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  // ...
```

There is also a simplified [one click deploy](https://github.com/payloadcms/payload/tree/templates/with-vercel-postgres) to Vercel should you need it.

### Self-hosting

Before deploying your app, you need to:

1. Ensure your app builds and serves in production. See [Production](#production) for more details.
2. You can then deploy Payload as you would any other Node.js or Next.js application either directly on a VPS, DigitalOcean's Apps Platform, via Coolify or more. More guides coming soon.

You can also deploy your app manually, check out the [deployment documentation](https://payloadcms.com/docs/production/deployment) for full details.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
