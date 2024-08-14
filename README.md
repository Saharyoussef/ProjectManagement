# CollabPro
CollabPro is a comprehensive task and project management website designed to help large teams efficiently manage their projects, tasks, and communication. It was developed during a one-month internship at Proxym IT in Sousse, Tunisia, in 2024.

# Website demo link
https://drive.google.com/file/d/1N8yrAOVj95R0W24kxIUtYJXJDAJu7Wcp/view?usp=sharing

# Project Overview
CollabPro is built to handle the entire project management process from start to finish. It offers powerful tools for project creation, task delegation, progress tracking, and communication, making it ideal for teams working on complex projects that require close collaboration and effective management.

# Frontend-Only Components
Some parts of the project, such as the dashboard and the chat feature, are currently implemented as frontend-only components. These sections provide the user interface and interactions but are not yet connected to a backend or database.

# Potential Enhancements
Future enhancements for CollabPro include making the dashboard and chat features fully functional with backend integration, allowing for real-time data management and storage.

# Key Features
**User Management
- Role-Based Access Control: Users are assigned different roles (e.g., Admin, Project Manager, Team Member) with permissions tailored to their responsibilities. This is managed using Clerk for secure and scalable authentication.
- User Profiles: Each team member has a profile displaying their tasks, progress, and contributions to the project, ensuring transparency and accountability.
  
**Project and Task Management
- Dynamic Project Pages: Every new project created generates a dedicated page dynamically, allowing team members to access all related information, tasks, and progress in one place.
- Task Delegation: Project managers can assign tasks to specific team members, set deadlines, and track task completion.
  
**Progress Tracking:
- The platform uses Kanban boards to visualize task status (e.g., To Do, In Progress, Done), making it easy to monitor progress at a glance.
  
**Real-Time Communication and Collaboration
- Real-Time Communication: Team members can communicate directly within the platform through an instant messaging feature, enabling quick and efficient collaboration.
- Activity Feed: A real-time activity feed displays recent actions taken within the project, helping to keep everyone informed and up-to-date on project developments.
  
**Centralized Dashboard
- Dashboard: The central dashboard provides an overview of all active projects, pending tasks, and recent activities, helping team members prioritize their work and stay organized.

# Technology Stack
- Frontend: Built with Next.js, a React framework that supports server-side rendering and static site generation, ensuring a fast and responsive user experience.
- Backend: The project has potential integration with a MySQL database for data management and it's built in the backend with next.js too, though the dashboard and chat features are currently frontend-only.
- Styling: Styled using Tailwind CSS, providing a modern and consistent look and feel across the platform.
- UI Components: Utilized ShadCN UI for enhanced component design.
- Version Control: Managed with GitHub to track changes, collaborate, and deploy the application efficiently.

# Installation and Setup
**Prerequisites
- Node.js
- npm (Node Package Manager)
- XAMPP for running Apache and MySQL
- Clerk account for authentication management
  
**Installation Steps

1- Clone the repository:git clone https://github.com/yourusername/collabpro.git

2- Navigate to the project directory:cd collabpro

3- Install the dependencies:

- Initialize ShadCN UI:npx shadcn-ui@latest init
- Install Prisma for database management:npm i -D prisma -> npx prisma init
- Install Drag and Drop functionality:npm i @hello-pangea/dnd
- Install React Query for client-side task management:npm i @tanstack/react-query
- Install Date-FNS for date handling in the activity feed:npm i date-fns

4- Create a MySQL Database:

Set up MySQL using XAMPP and create a new database.
Update your .env file with the database credentials.

5- Initialize Prisma

- npx prisma init
- npx prisma generate
- npx prisma db push

6- Configure Authentication:

Obtain API keys from your Clerk account.
Update your .env file with the Clerk API key.

7- Run the development server: npm run dev

8- Access the application:Open your browser and navigate to http://localhost:3000 to access CollabPro.

# Acknowledgments
Proxym IT, Sousse, Tunisia for providing the internship opportunity where this project was developed.
The open-source community for their invaluable tools and resources that made this project possible.
