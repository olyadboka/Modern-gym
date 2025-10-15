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

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchContacts = async () => {
      // Simulate API call
      setTimeout(() => {
        setContacts([
          {
            _id: "1",
            name: "John Smith",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
            subject: "Membership Inquiry",
            message:
              "I am interested in joining your gym. Can you please provide information about membership plans and pricing?",
            status: "new",
            createdAt: "2024-01-15T10:30:00Z",
          },
          {
            _id: "2",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "+1 (555) 234-5678",
            subject: "Personal Training",
            message:
              "I would like to book a consultation with one of your personal trainers. What are the available time slots?",
            status: "read",
            createdAt: "2024-01-14T14:20:00Z",
          },
          {
            _id: "3",
            name: "Mike Davis",
            email: "mike@example.com",
            phone: "+1 (555) 345-6789",
            subject: "Equipment Question",
            message:
              "Do you have Olympic lifting platforms? I am training for a powerlifting competition.",
            status: "replied",
            createdAt: "2024-01-13T09:15:00Z",
          },
          {
            _id: "4",
            name: "Emily Wilson",
            email: "emily@example.com",
            phone: "+1 (555) 456-7890",
            subject: "Group Classes",
            message:
              "What yoga classes do you offer? I am a beginner and looking for a suitable class.",
            status: "new",
            createdAt: "2024-01-12T16:45:00Z",
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || contact.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (contactId, newStatus) => {
    setContacts(
      contacts.map((contact) =>
        contact._id === contactId ? { ...contact, status: newStatus } : contact
      )
    );
  };

  const handleDeleteContact = (contactId) => {
    if (
      window.confirm("Are you sure you want to delete this contact message?")
    ) {
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: "admin-badge admin-badge-warning",
      read: "admin-badge admin-badge-info",
      replied: "admin-badge admin-badge-success",
    };
    return badges[status] || "admin-badge admin-badge-info";
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600">
          Manage and respond to customer inquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            {contacts.length}
          </h3>
          <p className="text-gray-600">Total Messages</p>
        </div>
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-yellow-600">
            {contacts.filter((c) => c.status === "new").length}
          </h3>
          <p className="text-gray-600">New Messages</p>
        </div>
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {contacts.filter((c) => c.status === "read").length}
          </h3>
          <p className="text-gray-600">Read Messages</p>
        </div>
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {contacts.filter((c) => c.status === "replied").length}
          </h3>
          <p className="text-gray-600">Replied Messages</p>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>

          {/* Filter Button */}
          <button className="admin-btn-secondary flex items-center justify-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Subject</th>
                <th>Message Preview</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {contact.name}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                  <td>
                    <p className="font-medium text-gray-900">
                      {contact.subject}
                    </p>
                  </td>
                  <td>
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {contact.message}
                    </p>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${getStatusBadge(contact.status)} flex items-center space-x-1 w-fit`}
                    >
                      {getStatusIcon(contact.status)}
                      <span className="capitalize">{contact.status}</span>
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          handleStatusChange(contact._id, e.target.value)
                        }
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50"
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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Contact Message Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div className="admin-card p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">
                      {selectedContact.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">
                      {selectedContact.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">
                      {selectedContact.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <div className="admin-card p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Message Details
                </h4>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Subject</p>
                  <p className="font-medium text-gray-900 mb-4">
                    {selectedContact.subject}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">Message</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button className="admin-btn-primary flex-1 flex items-center justify-center space-x-2">
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="admin-btn-secondary flex-1"
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
