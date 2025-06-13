<br />
<div align="center">
  <h1> Medical Inventory Chatbot</h1>
  <p align="center">
    An intelligent AI-powered chatbot designed to manage and streamline medical inventory tasks through natural language interactions.
  </p>
</div>

---

## About the Project

The **Medical Inventory Chatbot** is a full-stack AI-powered platform that allows users to manage medical supplies and inventory using natural language. It integrates **Google Gemini API**, fine-tuned on 500+ inventory-related prompts, to deliver context-aware, multi-turn conversations.

It features a secure login/signup system, supports continuous dialogue, and provides real-time management of chat logs. Whether you’re a hospital admin or a clinic manager, this platform helps you track, query, and control inventory like never before.

---

## Features

- **Conversational Inventory Management**  
  Chat with the bot to check stock, usage, and needs in real-time.

- **Multi-turn & Linked Chat Support**  
  Ask follow-up questions for ongoing threads—Gemini handles context.

- **Chat Logs & History**  
  Add, delete, and manage chats easily through a friendly UI.

- **Authentication System**  
  Secure signup/login with protected access to chats and features.

- **Backend Integration**  
  Real-time connection to MongoDB for dynamic inventory updates.

- **Modern Tech Stack**  
  Built using React, Vite, Django, MongoDB, and the Google Gemini API.

---

## Built With

- [Google Gemini API](https://ai.google.dev/)
- [React](https://reactjs.org)
- [Vite](https://vite.dev/)
- [Django](https://www.djangoproject.com/)
- [MongoDB](https://www.mongodb.com/)

---

## Getting Started

Follow these steps to run the chatbot locally.

### Prerequisites

Ensure the following are installed:

- Node.js (v16+)
- Python (>=3.8)
- Django
- MongoDB
- Google Cloud API Key (for Gemini access)

---

## Installation

### Backend Setup (Django)

```bash
cd server
pip install -r requirements.txt
python manage.py runserver
```
### Frontend Setup (React + Vite)
```bash
cd client
npm install
npm run dev
```
## Usage
Once running locally:

- Sign Up / Log In via the authentication system.

- Start a new chat or continue existing ones.

- Ask inventory-related questions like:

  - “How many gloves are left?”

  - “Order 10 boxes of syringes.”

-View, delete, or manage previous conversations easily.

### Results
*Sign Up Page -* 
![Image](https://github.com/deepthidornala/MedicalChatBot/blob/master/3.png)
*Login In Page -*
![Image](https://github.com/deepthidornala/MedicalChatBot/blob/master/2.png)
*Chat Interface-*
![Image](https://github.com/deepthidornala/MedicalChatBot/blob/master/1.png)
### Future Scope

- Analytics dashboard for trends and usage history.

- Multi-language support.

- Mobile app version for on-the-go access.

### Contact
Email - deepthidornala@gmail.com



