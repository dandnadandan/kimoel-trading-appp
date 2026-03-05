export interface InvoiceRequest {
  id?: string;
  reference_number?: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_city: string;
  notes?: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  created_at?: string;
  updated_at?: string;
}

export type InvoiceStatus = InvoiceRequest["status"];

export interface AdminUser {
  id: string;
  email: string;
}
