# CarePulse

CarePulse is a comprehensive healthcare management system designed to streamline the process of booking doctor appointments and managing related administrative tasks. This system provides a user-friendly interface for patients and administrators, real-time notifications, and a robust admin panel for effective healthcare management.

## Features

### Patient Portal
- Secure user authentication and registration
- Profile management for personal information and medical history
- Easy appointment booking system
- Appointment confirmation and review screen

### Admin Panel
- Comprehensive appointment management
- User permission controls
- SMS notification management
- Administrative dashboard

### Notifications
- Real-time SMS alerts for appointments
- Appointment status updates
- Reminder notifications

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org) - Server-side rendering and nested layouts
- [TypeScript](https://www.typescriptlang.org) - Type-safe development
- [TailwindCSS](https://tailwindcss.com) - Responsive styling
- [React Hook Form](https://react-hook-form.com) - Form handling
- [Shadcn/ui](https://ui.shadcn.com) - UI components

### Backend & Services
- [Appwrite](https://appwrite.io) - Backend services and authentication
- [Twilio](https://twilio.com) - SMS notifications
- [Sentry](https://sentry.io) - Error tracking and monitoring

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/MatrimPathak/CarePulse.git
   cd CarePulse
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables
   - Create a `.env` file in the root directory
   - Add necessary credentials for Appwrite, Twilio, and Sentry

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
CarePulse/
├── app/                          # Next.js app directory
│   ├── (auth)/                  # Authentication related routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/             # Dashboard routes
│   │   ├── admin/              # Admin panel routes
│   │   └── user/               # User dashboard routes
│   ├── api/                     # API routes
│   └── layout.tsx               # Root layout
├── components/                   # Reusable UI components
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard components
│   ├── forms/                   # Form components
│   ├── shared/                  # Shared/common components
│   └── ui/                      # UI components (shadcn)
├── constants/                    # Application constants
│   ├── routes.ts
│   └── site.ts
├── lib/                         # Utility libraries
│   ├── appwrite/               # Appwrite configuration
│   ├── sentry/                 # Sentry configuration
│   ├── twilio/                 # Twilio configuration
│   └── utils/                  # Helper functions
├── public/                      # Static assets
│   ├── images/
│   └── icons/
├── types/                       # TypeScript type definitions
│   ├── auth.ts
│   ├── dashboard.ts
│   └── api.ts
├── instrumentation.ts           # Monitoring setup
├── sentry.client.config.ts      # Sentry client config
├── sentry.edge.config.ts        # Sentry edge config
├── sentry.server.config.ts      # Sentry server config
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## Acknowledgments

- Appwrite team for backend services
- Twilio for notification services
- Sentry for monitoring solutions
- Next.js team for the framework

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Twilio Documentation](https://www.twilio.com/docs)
- [Sentry Documentation](https://docs.sentry.io)
