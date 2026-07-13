import type { DealDocuments } from '@/lib/types'

export const dealDocuments: DealDocuments[] = [
  {
    id: 'DD-1', dealName: 'Marina Bay Tower — Priya Sharma', buyer: 'Priya Sharma',
    documents: [
      { name: 'Emirates ID', status: 'pending' },
      { name: 'Passport Copy', status: 'received' },
      { name: 'Mortgage Pre-Approval', status: 'received' },
      { name: 'Booking Form', status: 'received' },
      { name: 'MOU', status: 'pending' },
      { name: 'Payment Receipt', status: 'received' },
    ],
    alert: 'Emirates ID copy required to proceed with booking',
  },
  {
    id: 'DD-2', dealName: 'Azure Sky Penthouse — Elena Petrova', buyer: 'Elena Petrova',
    documents: [
      { name: 'Passport Copy', status: 'received' },
      { name: 'Proof of Funds', status: 'received' },
      { name: 'Booking Form', status: 'pending' },
      { name: 'MOU', status: 'pending' },
      { name: 'Golden Visa Application', status: 'pending' },
    ],
    alert: 'Awaiting booking form post-negotiation',
  },
  {
    id: 'DD-3', dealName: 'Palm Vista — James Carter', buyer: 'James Carter',
    documents: [
      { name: 'Passport Copy', status: 'received' },
      { name: 'Proof of Funds', status: 'received' },
      { name: 'Power of Attorney', status: 'expired' },
      { name: 'Booking Form', status: 'pending' },
      { name: 'Investment Declaration', status: 'received' },
    ],
    alert: 'Power of Attorney expired — renewal needed',
  },
  {
    id: 'DD-4', dealName: 'Creek Horizon — Anita Desai', buyer: 'Anita Desai',
    documents: [
      { name: 'Emirates ID', status: 'received' },
      { name: 'Passport Copy', status: 'received' },
      { name: 'Mortgage Approval', status: 'received' },
      { name: 'Booking Form', status: 'received' },
      { name: 'MOU', status: 'received' },
      { name: 'NOC', status: 'received' },
      { name: 'Title Deed Application', status: 'received' },
    ],
  },
]
