import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Eye,
  Reply,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { contactAPI } from "../utils/api";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getContacts();
      if (response.data.success) {
        setContacts(response.data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || contact.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await contactAPI.updateContact(contactId, {
        status: newStatus,
      });
      if (response.data.success) {
        setContacts(
          contacts.map((contact) =>
            contact._id === contactId
              ? { ...contact, status: newStatus }
              : contact
          )
        );
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (
      window.confirm("Are you sure you want to delete this contact message?")
    ) {
      try {
        const response = await contactAPI.deleteContact(contactId);
        if (response.data.success) {
          setContacts(contacts.filter((contact) => contact._id !== contactId));
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: "bg-yellow-900 text-yellow-300",
      read: "bg-blue-900 text-blue-300",
      replied: "bg-green-900 text-green-300",
    };
    return badges[status] || "bg-blue-900 text-blue-300";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "read":
        return <CheckCircle className="w-4 h-4" />;
      case "replied":
        return <Reply className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
        <p className="text-gray-400">
          Manage and respond to customer inquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-white">{contacts.length}</h3>
          <p className="text-gray-400">Total Messages</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-yellow-400">
            {contacts.filter((c) => c.status === "new").length}
          </h3>
          <p className="text-gray-400">New Messages</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-blue-400">
            {contacts.filter((c) => c.status === "read").length}
          </h3>
          <p className="text-gray-400">Read Messages</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-green-400">
            {contacts.filter((c) => c.status === "replied").length}
          </h3>
          <p className="text-gray-400">Replied Messages</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
          >
            <option value="all" className="bg-gray-800">
              All Status
            </option>
            <option value="new" className="bg-gray-800">
              New
            </option>
            <option value="read" className="bg-gray-800">
              Read
            </option>
            <option value="replied" className="bg-gray-800">
              Replied
            </option>
          </select>

          {/* Filter Button */}
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Message Preview
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-300 font-semibold">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{contact.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{contact.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-300 max-w-xs truncate">
                      {contact.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 w-fit ${getStatusBadge(contact.status)}`}
                    >
                      {getStatusIcon(contact.status)}
                      <span className="capitalize">{contact.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-900 border border-blue-800 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          handleStatusChange(contact._id, e.target.value)
                        }
                        className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white"
                      >
                        <option value="new" className="bg-gray-800">
                          New
                        </option>
                        <option value="read" className="bg-gray-800">
                          Read
                        </option>
                        <option value="replied" className="bg-gray-800">
                          Replied
                        </option>
                      </select>
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-900 border border-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No contact messages found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Contact Message Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-3">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-medium text-white">
                      {selectedContact.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">
                      {selectedContact.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium text-white">
                      {selectedContact.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-medium text-white">
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-3">
                  Message Details
                </h4>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Subject</p>
                  <p className="font-medium text-white mb-4">
                    {selectedContact.subject}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">Message</p>
                  <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <p className="text-white whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2">
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 border border-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
