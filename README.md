# Tensor AI

This is a web application built with **Spring Boot**, **React**, **PostgreSQL**, **Docker**, and **Tailwind CSS**, leveraging the **Gemini Flash 1.5 API** for AI chatbot capabilities. The application allows users to log in using Google or GitHub (OAuth2), interact with an AI chatbot, and manage their conversation history.

## Demo

https://github.com/user-attachments/assets/5256aeaa-4b6b-43a2-8867-d26852b3aceb

## Features

- **Authentication**
  - Users can log in using Google or GitHub via OAuth2.
  - Secure session management with logout functionality.

- **AI Chatbot**
  - Ask questions and receive intelligent responses powered by the **Gemini Flash 1.5 API**.

- **Conversation History**
  - Save each conversation in a PostgreSQL database.
  - View conversation history.
  - Delete specific conversations.

- **Responsive Design**
  - Styled with **Tailwind CSS** for a modern and responsive user experience.

- **Routing**
  - Managed with **React Router** for seamless navigation.

## Tech Stack

### Frontend
- **React**: Framework for building the user interface.
- **Tailwind CSS**: For responsive and elegant UI design.

### Backend
- **Spring Boot**: Backend framework for handling API requests and business logic.
- **Spring Security**: For authentication and authorization.
- **Gemini Flash 1.5 API**: Provides AI chatbot functionality.
- **PostgreSQL**: Database for storing user data and conversation history.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rkisuru/tensor-ai-fullstack.git
