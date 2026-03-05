import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  LogOut,
  Home,
  Loader2,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchInvoiceRequests,
  fetchDashboardStats,
  updateInvoiceStatus,
  deleteInvoiceRequest,
} from "@/lib/api";
import type { InvoiceRequest, InvoiceStatus } from "@/types/invoice";
import { toast } from "sonner";
import logo from "/Back.png";

const statusConfig: Record<
  InvoiceStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  reviewed: { label: "Reviewed", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  approved: { label: "Approved", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, session } = useAuth();
  const [invoices, setInvoices] = useState<InvoiceRequest[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [invoiceData, statsData] = await Promise.all([
      fetchInvoiceRequests(),
      fetchDashboardStats(),
    ]);
    setInvoices(invoiceData);
    setStats(statsData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InvoiceStatus) => {
    const result = await updateInvoiceStatus(id, newStatus);
    if (result.success) {
      toast.success(`Invoice marked as ${newStatus}`);
      loadData();
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this invoice request?")) return;
    const result = await deleteInvoiceRequest(id);
    if (result.success) {
      toast.success("Invoice request deleted");
      setExpandedId(null);
      loadData();
    } else {
      toast.error(result.error || "Failed to delete");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  const filteredInvoices =
    statusFilter === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === statusFilter);

  const statCards = [
    { label: "Total", value: stats.total, icon: FileText, color: "text-brand-blue-dark", bg: "bg-gray-50" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Reviewed", value: stats.reviewed, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Approved", value: stats.approved, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-bold text-brand-blue-dark text-base sm:text-lg">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-brand-blue-dark hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Website</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${stat.bg} rounded-xl border border-gray-200 p-4 sm:p-5`}
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  {stat.label}
                </span>
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>
                {loading ? "-" : stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Invoice Requests Section */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-bold text-brand-blue-dark">
              Invoice Requests
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "pending", "reviewed", "approved", "rejected"] as const).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      statusFilter === f
                        ? "bg-[#FFD700] text-brand-blue-dark"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-[#FFD700]" />
            </div>
          )}

          {/* Empty */}
          {!loading && filteredInvoices.length === 0 && (
            <div className="text-center py-16 px-4">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                No invoice requests found.
              </p>
            </div>
          )}

          {/* Invoice List */}
          {!loading && filteredInvoices.length > 0 && (
            <div className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => {
                const cfg = statusConfig[inv.status];
                const isExpanded = expandedId === inv.id;

                return (
                  <motion.div
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Row Summary */}
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : inv.id || null)
                      }
                      className="w-full px-5 sm:px-6 py-4 flex items-center gap-4 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-brand-blue-dark text-sm sm:text-base truncate">
                            {inv.customer_name}
                          </p>
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}
                          >
                            {cfg.label}
                          </span>
                          {inv.reference_number && (
                            <span className="inline-flex px-2 py-0.5 rounded text-xs font-mono font-bold text-[#FFD700] bg-brand-blue-dark">
                              {inv.reference_number}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                          {inv.product_name} &middot; {inv.customer_city}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
                        {formatDate(inv.created_at)}
                      </p>
                    </button>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 sm:px-6 pb-5 border-t border-gray-100"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          <div className="space-y-2.5 text-sm">
                            <div>
                              <span className="font-medium text-gray-500">Reference #:</span>{" "}
                              <span className="text-gray-800 font-mono font-bold text-[#FFD700] bg-brand-blue-dark px-2 py-0.5 rounded">
                                {inv.reference_number || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Product:</span>{" "}
                              <span className="text-gray-800">{inv.product_name}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Product ID:</span>{" "}
                              <span className="text-gray-800 font-mono text-xs">{inv.product_id}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Name:</span>{" "}
                              <span className="text-gray-800">{inv.customer_name}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Email:</span>{" "}
                              <a
                                href={`mailto:${inv.customer_email}`}
                                className="text-blue-600 hover:underline"
                              >
                                {inv.customer_email}
                              </a>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Phone:</span>{" "}
                              <a
                                href={`tel:${inv.customer_phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {inv.customer_phone}
                              </a>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">City:</span>{" "}
                              <span className="text-gray-800">{inv.customer_city}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-500">Date:</span>{" "}
                              <span className="text-gray-800">{formatDate(inv.created_at)}</span>
                            </div>
                          </div>
                          <div className="space-y-2.5 text-sm">
                            <div>
                              <span className="font-medium text-gray-500">Notes:</span>
                              <p className="text-gray-800 mt-1 bg-gray-50 rounded-lg p-3 text-xs">
                                {inv.notes || "No notes provided."}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-gray-100">
                          <span className="text-xs font-medium text-gray-500 mr-1">
                            Update status:
                          </span>
                          {(["pending", "reviewed", "approved", "rejected"] as InvoiceStatus[]).map(
                            (s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusChange(inv.id!, s)}
                                disabled={inv.status === s}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                  inv.status === s
                                    ? `${statusConfig[s].bg} ${statusConfig[s].color} border-current cursor-default`
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                                }`}
                              >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </button>
                            )
                          )}
                          <div className="flex-1" />
                          <button
                            onClick={() => handleDelete(inv.id!)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
