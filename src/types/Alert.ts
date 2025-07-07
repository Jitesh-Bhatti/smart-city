export interface Alert {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
  timestamp: string;
  source: string;
  description: string;
  status: 'active' | 'awaiting' | 'resolved';
}
