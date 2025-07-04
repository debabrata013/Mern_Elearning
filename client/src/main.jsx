import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
// import AuthProvider from "./context/auth-context/index.jsx";
// import InstructorProvider from "./context/instructor-context/index.jsx";
// import StudentProvider from "./context/student-context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}>
    <AuthProvider>
      
          <App />
        
    </AuthProvider>
  </BrowserRouter>
);
