
export type TicketTag = 
  | '#Providers' 
  | '#Employees' 
  | '#Finance' 
  | '#Operations' 
  | '#Corporates' 
  | '#Suggestions' 
  | '#Scedule' 
  | '#IT' 
  | '#SP Comapnies' 
  | '#quality' 
  | '#High Priority' 
  | '#NULL';

export type TicketStatus = 'open' | 'closed';

export interface TicketNote {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface TicketTagChange {
  id: string;
  tag: TicketTag;
  addedAt: Date;
  addedBy: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  tags: TicketTag[];
  notes: TicketNote[];
  tagChanges: TicketTagChange[];
  createdAt: Date;
  createdBy: string;
  closedAt?: Date;
  closedBy?: string;
}
