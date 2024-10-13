# Virtual Treatment Planner: Integrated Video Conferencing for Veterinary Clinic and Pet Shop Management System

**Capstone Project for University Requirements**

## Overview

The **Virtual Treatment Planner** system is designed to modernize veterinary care by integrating video conferencing into a treatment planning platform for veterinary clinics and pet shops. This project offers a seamless solution for remote veterinary consultations, allowing pet owners to access professional care from the comfort of their homes. By utilizing advanced video conferencing technology and a user-friendly interface, pet owners can easily register pets, schedule appointments, view prescriptions, and consult with veterinarians in real-time.

The system primarily focuses on consultations and prescription services, ensuring that pet owners receive expert advice without needing a physical visit to the clinic. This is particularly useful for follow-up checkups, non-emergency consultations, and clients with limited mobility or those living in distant locations.

## Purpose and Description

The purpose of this project is to address the evolving needs of veterinary medicine through technological innovation, making veterinary care more accessible and future-proof. By integrating a treatment planner with video conferencing, the system hopes to increase the relevance of veterinary care, prepare veterinarians for societal trends, and improve the overall pet care experience.

While not a pharmacy, the system facilitates online consultations and prescriptions, but does not dispense medications. The system's core is built around providing remote veterinary advice and prescriptions.

## Key Features

1. **Video Conferencing for Consultations**: Allows veterinarians to provide remote consultations and follow-ups through integrated video communication.
2. **Appointment Scheduling**: Enables users to schedule veterinary appointments with ease.
3. **Pet Management**: Facilitates pet registration and management, including essential information about the pet's health and history.
4. **Online Prescriptions**: Veterinarians can prescribe treatments or medications based on consultations, accessible through the platform.
5. **PayPal Integration**: Allows users to securely make payments for services using PayPal.
6. **Chat App**: Provides a chat feature for quick communication between pet owners and veterinarians.
7. **Audit Trails for Admin**: Ensures all actions, such as appointment creations, pet information updates, and transactions, are logged for accountability.

## Beneficiaries

- **Pet Owners**: Busy individuals or those with limited access to physical clinics can benefit from remote consultations and timely advice.
- **Veterinarians**: Allows professionals to provide accessible care, expand their reach, and cater to clients with flexible scheduling.
- **Admin**: Can manage appointments, payments, and audit trails efficiently, ensuring a streamlined operational process.

## Technologies Used

### Frontend

- **React**: Front-end library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for designing responsive UIs.
- **Radix UI**: Primitives for building accessible, high-quality components.
- **Framer Motion**: Animation library for React.
- **React Hook Form**: Managing form inputs and validations.
- **Zustand**: State management library.
- **React Router DOM**: Navigation and routing.
- **React Big Calendar**: Calendar for appointment management.
- **React Toastify**: Notification system.
- **Lucide React**: Icon library.
- **Lottie React**: For animated icons and illustrations.
- **Recharts**: For building charts and graphs.
- **Date-fns** and **Moment.js**: Utilities for handling date and time.

### Video & Media

- **Video SDK**: For integrated video conferencing.
- **React Player**: For handling video content in consultations.
- **Lottie React**: For adding animations.

### Backend & Utilities

- **Firebase**: Backend service for authentication, data storage, and cloud functions.
- **Zod**: For validation of forms and inputs.
- **PayPal Integration**: For secure payment transactions.
- **Audit Trails**: Tracking of key administrative actions.

### Build Tools

- **Vite**: Front-end build tool for fast development.
- **PostCSS**: CSS processor.
- **ESLint**: Linting tool for code quality.
- **Autoprefixer**: PostCSS plugin to add vendor prefixes automatically.

### Testing

- **Functional Testing**: Ensuring the system performs its expected functionality.
- **Usability Testing**: Focusing on the user experience.
- **Compatibility Testing**: Checking compatibility across different devices and browsers.
- **Performance Testing**: Measuring system responsiveness and scalability.
- **Security Testing**: Safeguarding user data and transaction information.

## Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- Firebase Account
- PayPal Developer Account

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/vtpivcvcpms.git
cd vtpivcvcpms
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create an **.env** file in the root directory and add your Firebase and PayPal credentials:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Step 4: Run the Application

```bash
npm run dev

```

The application will be available at **http://localhost:3000**.

### Step 5: Build for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized build in the **dist** folder.

### Step 6: Firebase Deployment (Optional)

If you want to deploy your app using Firebase Hosting, you need to initialize Firebase in your project:

```bash
firebase init
```

Then, deploy your app:

```bash
firebase deploy
```

Make sure to set up Firebase Hosting and configure the deployment settings according to Firebase documentation.

## License

This project is open-source and is released under the MIT License. You are free to use, modify, and distribute it in accordance with the terms and conditions specified in the license.

## Acknowledgments

We would like to thank the following for their contributions and support in the development of this project:

- **Firebase**: For providing backend services.
- **PayPal**: For enabling secure payment processing.
- **Videosdk.live**: For integrating video conferencing capabilities.
- **The open-source community** for various libraries and tools used in this project.

## Contact

If you have any questions, encounter issues, or need support, please don't hesitate to reach out to our team:

- **John Carlo M. Tanjuakio**

  - Email: [jctanjuakio@gmail.com](mailto:jctanjuakio@gmail.m)
  - Phone: +639661960142

- **Arish M. Sotelo**
  - Email: [arishsotelo08@gmail.com](mailto:arishsotelo08@gmail.com)
  - Phone: +639489779447

## Disclaimer

This project is developed for educational purposes as a university capstone project and may not be intended for production use. Use it at your own discretion.
