# TeamBoard Web Application

**TeamBoard** is a task‑management platform built for collaborative teams. It provides a clear project structure, flexible user roles, and an intuitive drag‑and‑drop interface for organising work.

## Technologies

- **Frontend:** React (TypeScript), HTML, CSS  
- **Backend:** ASP.NET Core  
- **Database:** PostgreSQL

## Key Features

- ✅ Role‑based access control (admin / member)  
- ✅ Team and project management  
- ✅ Task creation, assignment, and editing  
- ✅ Drag‑and‑drop task status updates (To Do / In Progress / Done)  
- ✅ Responsive layout and modern design  
- ✅ **Full data management (teams, projects, users, tasks) via the admin panel**

## Data Management & Admin Panel

Administrators can create, update, and delete any team, project, user, or task through a dedicated admin dashboard available at:

```
/admin/projects
```

## Test Users

You can explore the application with the following demo accounts:

- **Standard user**  
  - Username: `sara`  
  - Password: `sara123`

- **Admin user**  
  - Username: `admin`  
  - Password: `admin123`

## 📷 Screenshots

### Dashboard
![Dashboard](https://github.com/SrgaSRB/TeamBoard/blob/main/screenshots/dashboard.png)

### Projects
![Projects](https://github.com/SrgaSRB/TeamBoard/blob/main/screenshots/projects.png)

### Tasks View
![Tasks](https://github.com/SrgaSRB/TeamBoard/blob/main/screenshots/tasks.png)

### Teams Management
![Teams](https://github.com/SrgaSRB/TeamBoard/blob/main/screenshots/teams.png)

## How to Run the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/SrgaSRB/TeamBoard.git
   ```
2. **Navigate into the project**
   ```bash
   cd TeamBoard
   ```
3. **Set environment variables** – create a `.env` file (or use `appsettings.json` for ASP.NET Core) with your database connection string and JWT secret.
4. **Run the database migrations** (example shown with the dotnet CLI):
   ```bash
   dotnet ef database update
   ```
5. **Start the backend**
   ```bash
   dotnet run --project Backend/TeamBoard.Api
   ```
6. **Start the frontend**
   ```bash
   cd Frontend
   npm install
   npm start
   ```

The application will be available at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend by default). Log in with one of the test users above to get started.

