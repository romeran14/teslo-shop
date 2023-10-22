export interface PaypalOrderStatusResponse {
  id: string;
  intent: string;
  status: string;
  purchase_units: Purchaseunit[];
  payer: Payer;
  create_time: string;
  update_time: string;
  links: Link[];
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface Payer {
  name: Name2;
  email_address: string;
  payer_id: string;
  address: Address2;
}

export interface Address2 {
  country_code: string;
}

export interface Name2 {
  given_name: string;
  surname: string;
}

export interface Purchaseunit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  shipping: Shipping;
  payments: Payments;
}

export interface Payments {
  captures: Capture[];
}

export interface Capture {
  id: string;
  status: string;
  amount: Amount;
  final_capture: boolean;
  seller_protection: Sellerprotection;
  create_time: string;
  update_time: string;
}

export interface Sellerprotection {
  status: string;
  dispute_categories: string[];
}

export interface Shipping {
  name: Name;
  address: Address;
}

export interface Address {
  address_line_1: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export interface Name {
  full_name: string;
}

export interface Payee {
  email_address: string;
  merchant_id: string;
}

export interface Amount {
  currency_code: string;
  value: string;
}