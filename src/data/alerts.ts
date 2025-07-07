import type { Alert } from "../types/Alert";

export const sampleAlerts: Alert[] = [
  {
    id: 1,
    type: 'fire',
    severity: 'high',
    location: 'Ahmedabad - Satellite Area',
    timestamp: '2025-01-07T14:30:00Z',
    source: 'Fire Department',
    description: 'Building fire reported at commercial complex',
    status: 'active',
  },
  {
    id: 2,
    type: 'medical',
    severity: 'medium',
    location: 'Surat - Varachha',
    timestamp: '2025-01-07T14:25:00Z',
    source: 'Emergency Services',
    description: 'Medical emergency - ambulance dispatched',
    status: 'awaiting',
  },
  {
    id: 3,
    type: 'weather',
    severity: 'low',
    location: 'Rajkot - City Center',
    timestamp: '2025-01-07T14:20:00Z',
    source: 'IMD',
    description: 'Heavy rain warning issued',
    status: 'resolved',
  }
];
