<h1>Simple_Task_Management_System</h1>

# MERN Task Management System

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
| Frontend       | React.js, Bootstrap     |
| Backend        | Node.js, Express.js     |
| Database       | MongoDB                 |
| Authentication | JWT (JSON Web Tokens)   |
| Styling        | CSS, Bootstrap          |

---

## Installation and Setup

### Clone the Repository
```bash
git clone <repository-url>
cd task-management-system

