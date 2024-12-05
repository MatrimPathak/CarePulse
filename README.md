# CarePulse

CarePulse is a comprehensive healthcare management system designed to streamline the process of booking doctor appointments and managing related administrative tasks. This system provides a user-friendly interface for patients and administrators, real-time notifications, and a robust admin panel for effective healthcare management.

## Features

### Patient Portal
- **User Authentication:** Secure login and registration.
- **Profile Management:** Input personal information, medical history, and identification details.
- **Appointment Booking:** Schedule doctor appointments with ease.
- **Confirmation Screen:** View appointment details before finalizing.

### Notifications
- **Real-Time SMS Alerts:** Receive timely updates and reminders for appointments.

### Admin Panel
- **Appointment Management:** Schedule, update, and cancel appointments.
- **User Permissions:** Grant or restrict admin access.
- **SMS Confirmations:** Notify patients about appointment status.

## Technology Stack

### Front-End
- **Next.js**: Server-side rendering and nested layouts for optimized performance.
- **TypeScript**: Ensures type safety and enhances developer productivity.
- **TailwindCSS**: Provides modern, responsive design with ease.
- **React Hook Form**: Simplifies form handling and validation.
- **Shadcn**: For reusable and accessible components.

### Back-End
- **Appwrite**: Handles backend services, including authentication and database.
- **Twilio**: Facilitates real-time SMS notifications.

### Monitoring and Analysis
- **Sentry**: Tracks performance issues and monitors application health.

## Installation

To set up the project locally, follow these steps:

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/MatrimPathak/CarePulse.git
   cd CarePulse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the required credentials for Appwrite, Twilio, and other services.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Folder Structure

```plaintext
CarePulse/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Application pages
│   ├── services/     # API and backend service integrations
│   ├── styles/       # Global styles
│   ├── utils/        # Utility functions
│   └── hooks/        # Custom hooks
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## Contributing

Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Appwrite](https://appwrite.io/) for backend services.
- [Twilio](https://www.twilio.com/) for SMS notifications.
- [Sentry](https://sentry.io/) for performance monitoring.

---

For any questions or support, feel free to reach out via the repository's [Issues](https://github.com/MatrimPathak/CarePulse/issues) section.
