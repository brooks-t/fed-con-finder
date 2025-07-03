import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contract } from '../models/contract';
import { SearchCriteria } from '../shared/search-form/search-form';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private mockContracts: Contract[] = [
    {
      id: 'CNT-001',
      title: 'Cloud Infrastructure Modernization',
      agency: 'Department of Defense',
      description:
        'Modernize legacy IT infrastructure with cloud-based solutions',
      postedDate: '2024-01-15',
      responseDeadline: '2024-02-15',
      estimatedValue: 2500000,
      location: 'Washington, DC',
      category: 'it',
      status: 'open',
    },
    {
      id: 'CNT-002',
      title: 'Highway Construction Project',
      agency: 'Department of Transportation',
      description:
        'Construction of 25-mile highway section with modern safety features',
      postedDate: '2024-01-10',
      responseDeadline: '2024-03-01',
      estimatedValue: 45000000,
      location: 'Texas',
      category: 'construction',
      status: 'open',
    },
    {
      id: 'CNT-003',
      title: 'Cybersecurity Consulting Services',
      agency: 'Department of Homeland Security',
      description: 'Provide cybersecurity assessment and consulting services',
      postedDate: '2024-01-20',
      responseDeadline: '2024-02-20',
      estimatedValue: 1200000,
      location: 'Virginia',
      category: 'consulting',
      status: 'open',
    },
  ];

  constructor() {}

  searchContracts(criteria: SearchCriteria): Observable<Contract[]> {
    let filteredContracts = this.mockContracts;

    // Filter by keywords
    if (criteria.keywords) {
      const keywords = criteria.keywords.toLowerCase();
      filteredContracts = filteredContracts.filter(
        (contract) =>
          contract.title.toLowerCase().includes(keywords) ||
          contract.description.toLowerCase().includes(keywords) ||
          contract.agency.toLowerCase().includes(keywords)
      );
    }

    // Filter by location
    if (criteria.location) {
      const location = criteria.location.toLowerCase();
      filteredContracts = filteredContracts.filter((contract) =>
        contract.location.toLowerCase().includes(location)
      );
    }

    // Filter by category
    if (criteria.category) {
      filteredContracts = filteredContracts.filter(
        (contract) => contract.category === criteria.category
      );
    }

    // Simulate API delay
    return of(filteredContracts);
  }

  getAllContracts(): Observable<Contract[]> {
    return of(this.mockContracts);
  }
}
