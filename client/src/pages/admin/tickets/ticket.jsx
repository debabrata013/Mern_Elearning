import React, { useState } from "react";
import { FaTrash, FaPen, FaEye } from "react-icons/fa"; // Added FaEye for view button
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
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = ticketData.filter((ticket) => ticket !== ticketToDelete);
      setTicketData(updatedTickets);
    }
  };

  return (
    <div className="admin-dashboard p-4 md:p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <h1 className="text-xl md:text-2xl font-bold text-[#5491CA] mb-4 md:mb-6">
        {viewTicket
          ? isEditMode
            ? "Edit Ticket"
            : "View Ticket"
          : showAnsweredPage
          ? "Answered Tickets"
          : "Unanswered Tickets"}
      </h1>

      {!viewTicket && (
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5491CA]/50"
          />
          <button
            onClick={() => setShowAnsweredPage(!showAnsweredPage)}
            className="w-full md:w-auto bg-[#5491CA] text-white py-2 px-4 rounded-md hover:bg-[#4a82b6] transition-colors"
          >
            {showAnsweredPage ? "Unanswered Tickets" : "Answered Tickets"}
          </button>
        </div>
      )}

      {viewTicket ? (
        <div className="view-ticket-box bg-white shadow-md rounded-md p-4 md:p-6 max-w-lg mx-auto border border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold text-[#5491CA] mb-4">
            {isEditMode ? "Edit Ticket" : "View Ticket"}
          </h2>
          <div className="ticket-details mb-4 space-y-2 text-sm md:text-base">
            <p>
              <strong className="text-gray-700">Name:</strong> {viewTicket.name}
            </p>
            <p>
              <strong className="text-gray-700">Email:</strong> {viewTicket.email}
            </p>
            <p>
              <strong className="text-gray-700">Phone:</strong> {viewTicket.phone}
            </p>
            <p>
              <strong className="text-gray-700">Subject:</strong> {viewTicket.subject}
            </p>
            <p>
              <strong className="text-gray-700">Status:</strong>{" "}
              <span className={viewTicket.status === "Answered" ? "text-green-600" : "text-yellow-600"}>
                {viewTicket.status}
              </span>
            </p>
          </div>
          <textarea
            placeholder="Reply to the student's problem"
            className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4 reply-textarea focus:outline-none focus:ring-2 focus:ring-[#5491CA]/50"
            defaultValue={viewTicket.reply || ""}
          ></textarea>
          {!isEditMode && (
            <select
              id="status"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5491CA]/50"
              defaultValue={viewTicket.status}
            >
              <option value="">Select Status</option>
              <option value="Answered">Answered</option>
              <option value="Pending">Pending</option>
            </select>
          )}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={() => setViewTicket(null)}
              className="w-full md:flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={isEditMode ? handleUpdateTicket : handleSaveTicket}
              className="w-full md:flex-1 bg-[#5491CA] text-white py-2 rounded-md hover:bg-[#4a82b6] transition-colors"
            >
              {isEditMode ? "Update Ticket" : "Save Ticket"}
            </button>
          </div>
        </div>
      ) : (
        <div className="ticket-table-wrapper overflow-x-auto">
          {showAnsweredPage ? (
            <div>
              {answeredTickets.length === 0 ? (
                <div className="text-center text-gray-600 text-base md:text-lg p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200">
                  No answered tickets available.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#5491CA] text-white">
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Name</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base hidden md:table-cell">Email</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base hidden md:table-cell">Phone</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Issue</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Status</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {answeredTickets.map((ticket, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base">{ticket.name}</td>
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base hidden md:table-cell">{ticket.email}</td>
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base hidden md:table-cell">{ticket.phone}</td>
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base">{ticket.subject}</td>
                          <td className="py-2 px-2 md:px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-2 px-2 md:px-4 flex space-x-2">
                            <button
                              onClick={() => handleViewTicket(ticket, false)}
                              className="text-[#5491CA] p-1.5 hover:bg-[#5491CA]/10 rounded-full transition-colors"
                              title="View Ticket"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleViewTicket(ticket, true)}
                              className="text-[#b1a9f1] p-1.5 hover:bg-[#b1a9f1]/10 rounded-full transition-colors"
                              title="Edit Ticket"
                            >
                              <FaPen className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(ticket)}
                              className="text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete Ticket"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>
              {unansweredTickets.length === 0 ? (
                <div className="text-center text-gray-600 text-base md:text-lg p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200">
                  No unanswered tickets available.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#5491CA] text-white">
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Name</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base hidden md:table-cell">Email</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base hidden md:table-cell">Phone</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Issue</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Status</th>
                        <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unansweredTickets.map((ticket, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base">{ticket.name}</td>
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base hidden md:table-cell">{ticket.email}</td>
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base hidden md:table-cell">{ticket.phone}</td>
                          <td className="py-2 px-2 md:px-4 text-sm md:text-base">{ticket.subject}</td>
                          <td className="py-2 px-2 md:px-4">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-2 px-2 md:px-4 flex space-x-2">
                            <button
                              onClick={() => handleViewTicket(ticket)}
                              className="text-[#5491CA] p-1.5 hover:bg-[#5491CA]/10 rounded-full transition-colors"
                              title="View Ticket"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTicket(ticket)}
                              className="text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete Ticket"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
