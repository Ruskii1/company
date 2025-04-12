
import { useState } from 'react';
import { CorporateTicket } from '@/types/corporate';

export const useTickets = (
  accountTickets: CorporateTicket[],
  updateTickets: (tickets: CorporateTicket[]) => void
) => {
  const addTicket = (ticket: CorporateTicket) => {
    const updatedTickets = [...accountTickets, ticket];
    updateTickets(updatedTickets);
  };

  return {
    addTicket
  };
};
