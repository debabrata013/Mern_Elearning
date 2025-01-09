import React from "react";

// Named export for the tickets array
export const tickets = [
  { name: "John Doe", email: "john@example.com", department: "IT", subject: "Login Issue", priority: "High" },
  { name: "Jane Smith", email: "jane@example.com", department: "Finance", subject: "Salary Delay", priority: "Medium" },
  { name: "Mark Lee", email: "mark@example.com", department: "HR", subject: "Leave Policy", priority: "Low" },
];

const TicketPage = () => {
  return (
    <div className="ticket-page">
      <h1>Generated Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Subject</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.name}</td>
              <td>{ticket.email}</td>
              <td>{ticket.department}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketPage;
