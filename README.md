# 📧 Automated Email Sequencer

**Automated Email Sequencer** is a full-stack `MERN` (MongoDB, Express.js, React.js, Node.js) web application that enables users to **design, schedule, and manage email sequences** using an interactive flowchart-based interface.

Whether you're running outreach campaigns, nurturing leads, or automating follow-ups, this tool provides a **visual and intuitive way** to build your email logic using draggable and connectable nodes.

---

## 🌟 Key Features

### 🔗 Flowchart Interface (React Flow)
- Drag-and-drop interface using **React Flow** to create **email sequences visually**.
- Users can define:
  - **Lead Source**: Starting point containing the recipient's email.
  - **Cold Email Node**: A message with a subject and content.
  - **Wait/Delay Node**: Pause execution between email sends (in hours/days).
- Nodes are connected to define the **execution order** of actions.
- Nodes are stored in MongoDB and processed by the backend.

---

### 🗖️ Scheduling with Agenda.js
- Uses [**Agenda.js**](https://github.com/agenda/agenda), a light-weight job scheduler for Node.js backed by MongoDB.
- The backend interprets the flowchart and schedules the emails as **jobs**.
- Supports wait/delay intervals between emails as defined in the flowchart.
- Ensures the sequence is executed automatically once it's created.

---

### 📨 Email Sending via Nodemailer
- [**Nodemailer**](https://nodemailer.com/about/) is used to send emails through the user's configured SMTP provider (Gmail, Outlook, etc.).
- Each `Cold-Email` node triggers a job to send the email using the content in the node.
- Sends email based on the structure and schedule defined in the flowchart.

---

### 🧾 Modal-Based Node Creation
- Users can add or edit node information using modal forms.
- Each node type has its own form:
  - **Lead Source Node**: Accepts recipient email.
  - **Cold Email Node**: Accepts subject and message body.
  - **Wait Node**: Accepts delay duration (e.g., 3 hours, 2 days).
- All node data is validated before being added to the flowchart.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** – SPA framework for building user interfaces.
- **React Flow** – For building interactive flowcharts.
- **Axios** – For communicating with the backend API.
- **React Modal** – For user-friendly modal dialogs.

### Backend
- **Node.js & Express.js** – REST API and business logic.
- **MailTrap-For fake or dummy server of mails.
- **Agenda.js** – Job scheduling and background tasks.
- **Nodemailer** – Sending transactional emails.
- **MongoDB** – Stores users, sequences, node metadata, and job schedules.
- **Mongoose** – Object modeling for MongoDB.

---

## 🚀 Getting Started

### 📁 1. Clone the Repository
```bash
git clone https://github.com/your-username/automated-email-sequencer.git
cd automated-email-sequencer
```

---

### 🔐 2. Environment Setup

Create `.env` files for both `backend` and `frontend`.

#### 📦 Backend `.env` (example)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/email-sequencer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_or_app_token
```

#### 🌐 Frontend `.env` (example)
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

### 📦 3. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### ▶️ 4. Run the Application

#### Start the backend server
```bash
cd backend
npm run dev
```

#### Start the frontend (Vite-based React app)
```bash
cd ../frontend
npm run dev
```

---

### 🌐 5. Open the Application

Go to:  
[http://localhost:5173](http://localhost:5173)  
Use the interface to create and deploy email sequences.

---

## 📌 How It Works Internally

1. **User Interaction**
   - User drags nodes into the canvas and connects them.
   - Each node is edited via a modal form.
   - On "Start Sequence", nodes and edges are sent to the backend.

2. **Backend Parsing**
   - Backend receives node/edge JSON.
   - Validates connections and sequence logic.
   - Saves sequence metadata and schedules email jobs via Agenda.

3. **Agenda + Nodemailer**
   - Agenda executes jobs as scheduled.
   - Nodemailer sends the corresponding email for each `Cold Email` node.
   - If there's a `Wait Node`, it calculates the delay using `setTimeout` or scheduled Agenda jobs.

---

## 📀 Folder Structure Overview

```bash
automated-email-sequencer/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── scheduler/         # Agenda jobs
│   └── app.js
│
├── frontend/
│   ├── components/
│   │   ├── FlowChart.jsx
│   │   ├── Homepage.jsx
│   │   └── Register.jsx
│   └── App.jsx
│
├── README.md
```

---

## 🔄 Possible Enhancements

- ✅ **Authentication** (e.g., JWT + Mongo sessions)
- 📊 **Email Analytics** (open rates, click tracking)
- 🧠 **AI Email Generator** (GPT for writing cold emails)
- 🔁 **Loop/Conditional Logic** in flowchart
- 🔔 **Email Templates** with personalization tags

---

## 🥪 Testing Strategy (Optional Section)

- **Frontend**: Use `Vitest` + `React Testing Library` to simulate form inputs and verify network requests.
- **Backend**: Use `Jest` or `Mocha` to test scheduling logic and email sending.
- **Mocks**: Use mock SMTP server like [Mailtrap](https://mailtrap.io/) for development testing.

---

## 🙋‍♂️ Contribution Guide

If you want to contribute:
1. Fork the repo
2. Create a feature branch (`feat/my-feature`)
3. Commit with conventional messages
4. Create a PR

---

## 📧 Contact & Support

For questions or feedback, reach out at:  
📧 `harshitharsha778@gmail.com`  
🔗 GitHub Issues for bugs and feature requests

