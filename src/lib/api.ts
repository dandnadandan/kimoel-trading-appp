import { supabase } from "./supabase";
import type { InvoiceRequest, InvoiceStatus } from "@/types/invoice";

// ─── Customer-facing ────────────────────────────────────────────────

export async function submitInvoiceRequest(
  data: Omit<InvoiceRequest, "id" | "status" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; referenceNumber?: string }> {
  const { data: insertedData, error } = await supabase
    .from("invoice_requests")
    .insert({
      product_id: data.product_id,
      product_name: data.product_name,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      customer_email: data.customer_email,
      customer_city: data.customer_city,
      notes: data.notes || "",
      status: "pending",
    })
    .select("reference_number")
    .single();

  if (error) {
    console.error("Failed to submit invoice request:", error.message);
    return { success: false, error: error.message };
  }

  return { 
    success: true, 
    referenceNumber: insertedData?.reference_number 
  };
}

// ─── Admin-facing ───────────────────────────────────────────────────

export async function fetchInvoiceRequests(): Promise<InvoiceRequest[]> {
  const { data, error } = await supabase
    .from("invoice_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch invoice requests:", error.message);
    return [];
  }
  return data as InvoiceRequest[];
}

export async function fetchInvoiceRequestById(
  id: string
): Promise<InvoiceRequest | null> {
  const { data, error } = await supabase
    .from("invoice_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch invoice request:", error.message);
    return null;
  }
  return data as InvoiceRequest;
}

export async function updateInvoiceStatus(
  id: string,
  status: InvoiceStatus
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("invoice_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Failed to update invoice status:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteInvoiceRequest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("invoice_requests")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete invoice request:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ─── Dashboard stats ────────────────────────────────────────────────

export async function fetchDashboardStats(): Promise<{
  total: number;
  pending: number;
  reviewed: number;
  approved: number;
  rejected: number;
}> {
  const { data, error } = await supabase
    .from("invoice_requests")
    .select("status");

  if (error) {
    console.error("Failed to fetch stats:", error.message);
    return { total: 0, pending: 0, reviewed: 0, approved: 0, rejected: 0 };
  }

  const stats = {
    total: data.length,
    pending: data.filter((r) => r.status === "pending").length,
    reviewed: data.filter((r) => r.status === "reviewed").length,
    approved: data.filter((r) => r.status === "approved").length,
    rejected: data.filter((r) => r.status === "rejected").length,
  };

  return stats;
}

// ─── Auth helpers ───────────────────────────────────────────────────

export async function adminLogin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function adminLogout(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(
  callback: (session: any) => void
) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}
