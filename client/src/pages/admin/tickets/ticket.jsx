import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa"; // Different icons with no background
import { tickets } from "./ticketpage";

const AdminDashboard = () => {
  const [ticketData, setTicketData] = useState(
    tickets.map((ticket) => ({ ...ticket, status: "Unanswered" }))
  );
  const [viewTicket, setViewTicket] = useState(null);
  const [search, setSearch] = useState("");
  const [showAnsweredPage, setShowAnsweredPage] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredTickets = ticketData.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  const unansweredTickets = filteredTickets.filter(
    (ticket) => ticket.status !== "Answered"
  );
  const answeredTickets = filteredTickets.filter(
    (ticket) => ticket.status === "Answered"
  );

  const handleViewTicket = (ticket, editMode = false) => {
    setViewTicket(ticket);
    setIsEditMode(editMode);
  };

  const handleSaveTicket = () => {
    const status = document.getElementById("status").value;
    if (!status) {
      alert("Please select a status before saving.");
      return;
    }

    const reply = document.querySelector(".reply-textarea").value;
    const updatedTickets = ticketData.map((ticket) =>
      ticket === viewTicket ? { ...ticket, status, reply } : ticket
    );
    setTicketData(updatedTickets);
    setViewTicket(null);
  };

  const handleUpdateTicket = () => {
    const reply = document.querySelector(".reply-textarea").value;
    const updatedTickets = ticketData.map((ticket) =>
      ticket === viewTicket ? { ...ticket, reply } : ticket
    );
    setTicketData(updatedTickets);
    setViewTicket(null);
  };

  const handleDeleteTicket = (ticketToDelete) => {
    const updatedTickets = ticketData.filter((ticket) => ticket !== ticketToDelete);
    setTicketData(updatedTickets);
  };

  return (
    <div className="admin-dashboard p-4 bg-white rounded-lg border border-gray-300 shadow-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {viewTicket
          ? isEditMode
            ? "Edit Ticket"
            : "View Ticket"
          : showAnsweredPage
          ? "Answered Tickets"
          : "Unanswered Tickets"}
      </h1>

      {!viewTicket && (
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowAnsweredPage(!showAnsweredPage)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 ml-4"
          >
            {showAnsweredPage ? "Unanswered Tickets" : "Answered Tickets"}
          </button>
        </div>
      )}

      {viewTicket ? (
        <div className="view-ticket-box bg-white shadow-md rounded-md p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isEditMode ? "Edit Ticket" : "View Ticket"}
          </h2>
          <div className="ticket-details mb-4">
            <p>
              <strong>Name:</strong> {viewTicket.name}
            </p>
            <p>
              <strong>Subject:</strong> {viewTicket.subject}
            </p>
          </div>
          <textarea
            placeholder="Reply to the student's problem"
            className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4 reply-textarea"
            defaultValue={viewTicket.reply || ""}
          ></textarea>
          {!isEditMode && (
            <select
              id="status"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              defaultValue={viewTicket.status}
            >
              <option value="">Select Status</option>
              <option value="Answered">Answered</option>
              <option value="Pending">Pending</option>
            </select>
          )}
          <button
            onClick={isEditMode ? handleUpdateTicket : handleSaveTicket}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
          >
            {isEditMode ? "Update Ticket" : "Save Ticket"}
          </button>
        </div>
      ) : (
        <div className="ticket-table-wrapper">
          {showAnsweredPage ? (
            <div>
              {answeredTickets.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">
                  No answered tickets available.
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Email</th>
                      <th className="py-2 px-4 text-left">Department</th>
                      <th className="py-2 px-4 text-left">Subject</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answeredTickets.map((ticket, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{ticket.name}</td>
                        <td className="py-2 px-4">{ticket.email}</td>
                        <td className="py-2 px-4">{ticket.department}</td>
                        <td className="py-2 px-4">{ticket.subject}</td>
                        <td className="py-2 px-4">{ticket.status}</td>
                        <td className="py-2 px-4 flex space-x-2">
                          <button
                            onClick={() => handleViewTicket(ticket, true)}
                            className="text-blue-600 p-2 hover:underline"
                          >
                            <FaPen />
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket)}
                            className="text-red-600 p-2 hover:underline"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div>
              {unansweredTickets.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">
                  No unanswered tickets available.
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Email</th>
                      <th className="py-2 px-4 text-left">Department</th>
                      <th className="py-2 px-4 text-left">Subject</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unansweredTickets.map((ticket, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{ticket.name}</td>
                        <td className="py-2 px-4">{ticket.email}</td>
                        <td className="py-2 px-4">{ticket.department}</td>
                        <td className="py-2 px-4">{ticket.subject}</td>
                        <td className="py-2 px-4">{ticket.status}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="text-blue-600 p-2 hover:underline"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
