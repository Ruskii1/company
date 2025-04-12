
import { useState } from 'react';
import { CorporateRequest } from '@/types/corporate';

export const useRequests = (
  accountRequests: CorporateRequest[],
  updateRequests: (requests: CorporateRequest[]) => void
) => {
  const addRequest = (request: CorporateRequest) => {
    const updatedRequests = [...accountRequests, request];
    updateRequests(updatedRequests);
  };

  return {
    addRequest
  };
};
