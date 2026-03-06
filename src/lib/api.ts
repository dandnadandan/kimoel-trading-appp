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
