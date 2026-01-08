
export type ViewState = 'HOME' | 'INVENTORY' | 'SELL_FORM' | 'FINANCE_FORM' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  imageUrl: string;
  description: string;
}

export interface SellLead {
  id: string;
  type: 'SELL';
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  intendedValue: number;
  observations: string;
  date: string;
}

export interface FinanceLead {
  id: string;
  type: 'FINANCE';
  name: string;
  cpf: string;
  phone: string;
  email: string;
  vehicleValue: number;
  downPayment: number;
  installments: number;
  date: string;
}

export type Lead = SellLead | FinanceLead;

export interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
}
