import React from "react";

// Named export for the tickets array
export const tickets = [
  { name: "John Doe", email: "john@example.com",phone:"852", subject: "Login Issue", priority: "High" },
  { name: "Jane Smith", email: "jane@example.com",phone:"852", subject: "Salary Delay", priority: "Medium" },
  { name: "Mark Lee", email: "mark@example.com",phone:"852", subject: "Leave Policy", priority: "Low" },
  { name: "John Doe", email: "john@example.com",phone:"852", subject: "Login Issue", priority: "High" },
  { name: "Jane Smith", email: "jane@example.com",phone:"852", subject: "Salary Delay", priority: "Medium" },
  { name: "Mark Lee", email: "mark@example.com",phone:"852", subject: "Leave Policy", priority: "Low" },
];

const TicketPage = () => {
  return (
    <div className="ticket-page">
      <h1>Generated Tickets</h1>
    </div>
  );
};

export default TicketPage;
