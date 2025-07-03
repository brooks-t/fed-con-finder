export interface Contract {
  id: string;
  title: string;
  agency: string;
  description: string;
  postedDate: string;
  responseDeadline: string;
  estimatedValue?: number;
  location: string;
  category: string;
  status: 'open' | 'closed' | 'awarded';
}
