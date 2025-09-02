OralVis Healthcare
A full-stack web application for managing dental scans with role-based access for Technicians (upload) and Dentists (view/download), using React, Node.js/Express, SQLite (Turso Cloud), and Cloudinary for images.

✨ Features

Role-based Login: Technician and Dentist, JWT-secured sessions.

Technician Dashboard: Upload patient scan + details, image sent to Cloudinary.

Dentist Dashboard: View all scans, thumbnails, full image modal.

Per-scan PDF Download: Patient info, scan details, image.

Cloud DB: Turso-hosted SQLite, safe for production/dev.

Deployed: Frontend and backend both live (see below).

Security: Passwords hashed, images never stored in DB, CORS, environment secrets.

🗂 Folder Structure
<details> <summary><b>Expand for tree</b></summary>
bash

 ```
oralvis-backend
├── config/
├── controllers/
├── middleware/
├── models/
├── node_modules/
├── routes/
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── vercel.json

oralvis-frontend
├── dist/
├── node_modules/
├── public/
├── src/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
├── vite.config.js
```
</details> [2]
🔗 Live Demo
Frontend: https://oralvis-healthcare-application-ucrs.vercel.app/

Backend: https://oralvis-healthcare-application-oy8rx35i4.vercel.app/



🏗️ Tech Stack
Layer	Technology
Frontend	React (Vite), Axios
Backend	Node.js, Express
Database	SQLite (Turso Cloud)
File Storage	Cloudinary
Auth	JWT, bcryptjs
Image Upload	multer
Routing	react-router-dom
PDF	jsPDF
Deployment	Vercel/Netlify/Render

📝 Getting Started (Local Setup)
Clone repo

bash
git clone https://github.com/YOUR-USER/oralvis-healthcare.git
cd oralvis-healthcare
Backend

bash
cd oralvis-backend
npm install
cp .env.example .env   # Fill in your keys (Cloudinary, JWT, Turso DB URL)
npm start
Frontend

bash
```
cd oralvis-frontend
npm install
cp .env.example .env   # Set VITE_BACKEND_URL
npm run dev
Visit the frontend at http://localhost:5173/ (or as shown in your console)
```

⚙️ Environment Variables
Create .env in each subfolder (see .env.example for template):
 
```

CLOUDINARY_CLOUD_NAME=...

CLOUDINARY_API_KEY=...

CLOUDINARY_API_SECRET=...

JWT_SECRET=...
```


🗃️ Database Schema
users

id	email	password	role (Technician/Dentist)
scans
| id | patientName | patientId | scanType | region | imageUrl | uploadDate |

🌩️ Cloudinary Integration
Image files uploaded via the Technician dashboard are sent to Cloudinary.

The Cloudinary image URL is saved in the scans table for display/download.

🚀 Deployment
Both frontend and backend are deployed (Vercel/Netlify/Render).

Set the correct backend URL in the frontend env (VITE_BACKEND_URL).

Ensure CORS allows requests from your frontend domain.

Use production-grade API keys and secrets in your deployment environment.

💾 Data & Hosting
Uses Turso, a cloud-hosted SQLite compatible provider — simple URL-based connection.

Local and production run identically (use different .env for local/dev).

🧾 License
MIT.
(c) OralVis Healthcare Demo Project.

Notes:

PRs, issues, suggestions welcome!

For PDF/report feature: handled entirely on frontend using jsPDF; no sensitive data stored in PDF.
