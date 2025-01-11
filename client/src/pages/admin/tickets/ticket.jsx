import React, { useState } from "react";
import { tickets } from "./ticketpage"; // Importing tickets from TicketPage

const AdminDashboard = () => {
  const [ticketData, setTicketData] = useState(
    tickets.map(ticket => ({ ...ticket, status: "Unanswered" }))
  );
  const [viewTicket, setViewTicket] = useState(null);
  const [search, setSearch] = useState("");

  // Filtered tickets based on search
  const filteredTickets = ticketData.filter(ticket =>
    ticket.name.toLowerCase().includes(search.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  // Count tickets by status
  const ticketCounts = {
    Answered: ticketData.filter(ticket => ticket.status === "Answered").length,
    Pending: ticketData.filter(ticket => ticket.status === "Pending").length,
    Closed: ticketData.filter(ticket => ticket.status === "Closed").length,
  };

  const handleViewTicket = (ticket) => {
    setViewTicket(ticket);
  };

  const handleSubmit = () => {
    const status = document.getElementById("status").value;
    if (!status) {
      alert("Please select a status before submitting.");
      return;
    }

    const updatedTickets = ticketData.map(ticket =>
      ticket === viewTicket ? { ...ticket, status } : ticket
    );
    setTicketData(updatedTickets);
    setViewTicket(null); // Redirect back to the homepage
  };

  return (
    <div className="admin-dashboard p-4 bg-white-100 rounded-lg border border-gray-300 shadow-xl">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tickets</h1>

      {/* Ticket Summary Boxes (Only shown if not viewing a ticket and tickets are available) */}
      {/* {!viewTicket && ticketData.length > 0 && (
        <div className="ticket-summary grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* <div className="summary-box bg-white shadow-md p-4 text-center rounded-md">
            <h3 className="text-gray-700 text-lg font-medium">Closed Tickets</h3>
            <p className="text-blue-600 text-2xl font-bold">{ticketCounts.Closed}</p>
          </div> */}
        {/*  <div className=" summary-box bg-white shadow-md p-4 text-center rounded-md">
            <h3 className="text-gray-700 text-lg font-medium">Answered Tickets</h3>
            <p className="text-blue-600 text-2xl font-bold">{ticketCounts.Answered}</p>
          </div>
          <div className="summary-box bg-white shadow-md p-4 text-center rounded-md">
            <h3 className="text-gray-700 text-lg font-medium">Pending Tickets</h3>
            <p className="text-blue-600 text-2xl font-bold">{ticketCounts.Pending}</p>
          </div>
        </div>
      )} */}

      {/* Conditional Rendering: If viewing a ticket */}
      {viewTicket ? (
        <div className="view-ticket-box bg-white shadow-md rounded-md p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">View Ticket</h2>
          <div className="ticket-details mb-4">
            <p><strong>Name:</strong> {viewTicket.name}</p>
            <p><strong>Subject:</strong> {viewTicket.subject}</p>
          </div>
          <textarea
            placeholder="Reply to the student's problem"
            className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4"
          ></textarea>
          <select
            id="status"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          >
            <option value="">Select Status</option>
            <option value="Answered">Answered</option>
            <option value="Pending">Pending</option>
            {/* <option value="Closed">Closed</option> */}
          </select>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
          >
            Submit
          </button>
        </div>
      ) : ticketData.length === 0 ? (
        // No Tickets Added Message
        <div className="text-center text-gray-600 text-lg">
          No tickets have been added.
        </div>
      ) : (
        <>
          {/* Search Bar and Ticket Table */}
          {ticketData.length > 0 && (
            <div className="ticket-table-wrapper">
              {/* Search Bar */}
              <div className="text-center mb-4">
              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
              {/* Ticket Table */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Department</th>
                    <th className="py-2 px-4 text-left">Subject</th>
                    <th className="py-2 px-4 text-left">Priority</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Unanswered</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{ticket.name}</td>
                      <td className="py-2 px-4">{ticket.email}</td>
                      <td className="py-2 px-4">{ticket.department}</td>
                      <td className="py-2 px-4">{ticket.subject}</td>
                      <td className="py-2 px-4">{ticket.priority}</td>
                      <td className="py-2 px-4">{ticket.status}</td>
                      <td className="py-2 px-4">{ticket.status === "Unanswered" ? "Yes" : "No"}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleViewTicket(ticket)}
                          className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-500"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
