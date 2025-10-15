export type EntityBase = {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type Property = EntityBase & {
  name: string;
  address?: string;
  unitCount?: number;
  tags?: string[];
  notes?: string;
};

export type Tenant = EntityBase & {
  name: string;
  phone?: string;
  email?: string;
  propertyId?: string; // optional link to Property
  unitNumber?: string;
  leaseStart?: string; // ISO date
  leaseEnd?: string; // ISO date
  monthlyRent?: number;
  notes?: string;
};

export type ListResponse<T> = {
  items: T[];
};

export type ErrorResponse = {
  error: string;
};
