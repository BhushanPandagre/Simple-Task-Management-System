
# MERN Simple Task Management System

## Overview
The **MERN Task Management System** is a web-based application developed using the MERN stack (**MongoDB, Express.js, React.js, Node.js**) designed to streamline task management processes in organizations. It features two role-based panels: an **Admin Panel** for managing tasks and users, and an **Employee Panel** for task collaboration.

---

## Features

### **Admin Panel**
The Admin Panel provides administrators with full control over task and user management:
- **Employee Management**: Add, edit, and delete employees with details such as name, role, and contact information.
- **Task Assignment**: Assign tasks to employees with specific deadlines and descriptions.
- **Task Monitoring**: View and track the status and progress of all tasks in real time.
- **User Authentication**: Secure login for admins to prevent unauthorized access.
- **Logout**: Secure session termination to safeguard sensitive data.

### **Employee Panel**
The Employee Panel allows employees to view and update their tasks efficiently:
- **Task Management**: View a personalized list of tasks assigned by the admin.
- **Task Status Updates**: Mark tasks as pending, in progress, or completed to reflect real-time progress.

### **General Features**
- **Priority Management**: Categorize tasks into high, medium, and low priorities with color-coded indicators:
  - **High Priority**: Red
  - **Medium Priority**: Yellow
  - **Low Priority**: Green
- **Role-Based Access Control**: Separate interfaces and permissions for admins and employees.
- **Pagination**: Navigate through large datasets efficiently with smooth transitions using AJAX.
- **Real-Time Updates**: Instant feedback and updates for task actions.

---

## Technology Stack

| Component      | Technology              |
|----------------|-------------------------|
| Frontend       | React.js, css     |
| Backend        | Node.js, Express.js     |
| Database       | MongoDB                 |
| Authentication | JWT (JSON Web Tokens)   |
| Styling        | CSS         |

---

## Installation and Setup

### Clone the Repository
```bash
git clone <[repository-url](https://github.com/BhushanPandagre/Simple-Task-Management-System.git)>
cd client
cd task management system

### Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install


### Set Up Environment Variables

Create a `.env` file in the root directory of your project and include the following keys:

PORT=5000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret-key>

### Start the Application

#### Start the Frontend Development Server:
Navigate to the `client` folder and run the following command to start the development server:


cd client
cd task management system
npm start dev

#### Start the Backend Server:

Navigate to the `server` folder and use the following command to start the backend server:

cd server
nodemon server.js

### Usage Instructions

#### Admin Functions:
- Log in using the **admin credentials**.
- Add employees and assign tasks via the **Admin Panel**.
- Monitor task progress and update task statuses as needed.

#### Employee Functions:
- Log in using the **employee credentials**.
- View assigned tasks in the **Employee Panel**.
- Update the status of tasks as they progress (e.g., Pending, In Progress, Completed).


## Developed By

**[Bhushan Pandagre]**  
🚀 **Developer | Programmer | Innovator**  

📧 **Contact**: [pandagrebhushan3@gmail.com] 
🌐 **Portfolio**: [(https://logo-generator-ra9f.vercel.app/)]  
💼 **LinkedIn**: [www.linkedin.com/in/bhushan-pandagre ] 

 






