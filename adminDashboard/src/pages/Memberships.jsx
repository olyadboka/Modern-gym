import React, { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2, X, Save } from "lucide-react";
import { membershipAPI } from "../utils/api";

const Memberships = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    duration: "monthly",
    features: [""],
    isPopular: false,
    maxUsers: 50,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await membershipAPI.getMemberships();
      if (res.data.success) setItems(res.data.memberships || []);
    } catch (e) {
      console.error("Fetch memberships failed", e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = items.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setEditing(null);
    setForm({
      name: "",
      description: "",
      price: 0,
      duration: "monthly",
      features: [""],
      isPopular: false,
      maxUsers: 50,
    });
  };

  const onAddFeature = () => setForm({ ...form, features: [...form.features, ""] });
  const onRemoveFeature = (idx) =>
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  const onChangeFeature = (idx, val) => {
    const next = [...form.features];
    next[idx] = val;
    setForm({ ...form, features: next });
  };

  const onSave = async () => {
    try {
      if (editing) {
        const res = await membershipAPI.updateMembership(editing._id, form);
        if (res.data.success) {
          setItems(items.map((m) => (m._id === editing._id ? res.data.membership : m)));
          setShowModal(false);
          resetForm();
        }
      } else {
        const res = await membershipAPI.createMembership(form);
        if (res.data.success) {
          setItems([...items, res.data.membership]);
          setShowModal(false);
          resetForm();
        }
      }
    } catch (e) {
      console.error("Save membership failed", e);
    }
  };

  const onEdit = (m) => {
    setEditing(m);
    setForm({
      name: m.name,
      description: m.description,
      price: m.price,
      duration: m.duration,
      features: m.features,
      isPopular: m.isPopular || false,
      maxUsers: m.maxUsers || 50,
    });
    setShowModal(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this membership?")) return;
    try {
      const res = await membershipAPI.deleteMembership(id);
      if (res.data.success) setItems(items.filter((m) => m._id !== id));
    } catch (e) {
      console.error("Delete membership failed", e);
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Memberships</h1>
          <p className="text-gray-400">Create and manage membership plans</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Membership</span>
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search memberships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((m) => (
          <div key={m._id} className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white">{m.name}</h3>
              {m.isPopular && (
                <span className="px-2 py-1 text-xs rounded bg-yellow-900 text-yellow-300">Popular</span>
              )}
            </div>
            <p className="text-gray-400 mb-3">{m.description}</p>
            <div className="text-blue-400 font-bold mb-2">${m.price} / {m.duration}</div>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              {m.features?.slice(0, 4).map((f, i) => (
                <li key={i}>- {f}</li>
              ))}
              {m.features?.length > 4 && (
                <li className="text-gray-500">+{m.features.length - 4} more</li>
              )}
            </ul>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(m)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2 border border-gray-700"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(m._id)}
                className="px-4 py-2 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors border border-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editing ? "Edit" : "Add"} Membership</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                    placeholder="Gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <select
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  >
                    {[
                      "monthly",
                      "quarterly",
                      "yearly",
                    ].map((d) => (
                      <option key={d} value={d} className="bg-gray-800">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="What is included in this plan"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                    placeholder="49"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Users</label>
                  <input
                    type="number"
                    value={form.maxUsers}
                    onChange={(e) => setForm({ ...form, maxUsers: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                    placeholder="50"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-7">
                  <input
                    id="popular"
                    type="checkbox"
                    checked={form.isPopular}
                    onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                    className="h-4 w-4 text-blue-600 border-gray-700 bg-gray-800 rounded"
                  />
                  <label htmlFor="popular" className="text-sm text-gray-300">Mark as Popular</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
                {form.features.map((f, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={f}
                      onChange={(e) => onChangeFeature(idx, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400 flex-1"
                      placeholder="Feature description"
                    />
                    <button onClick={() => onRemoveFeature(idx)} className="p-2 text-red-400 hover:bg-red-900 rounded-lg border border-red-800">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={onAddFeature} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 border border-gray-700 text-sm">
                  Add Feature
                </button>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 border border-gray-700"
                >
                  Cancel
                </button>
                <button onClick={onSave} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships;


