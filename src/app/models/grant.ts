export interface Grant {
  id: string;
  title: string;
  agency: string;
  description: string;
  eligibility: string[];
  applicationDeadline: string;
  fundingAmount: number;
  category: string;
  status: 'open' | 'closed' | 'awarded';
}
