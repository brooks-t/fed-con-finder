import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Grant } from '../models/grant';
import { SearchCriteria } from '../shared/search-form/search-form';

@Injectable({
  providedIn: 'root',
})
export class GrantService {
  private mockGrants: Grant[] = [
    {
      id: 'GRT-001',
      title: 'Small Business Innovation Research (SBIR)',
      agency: 'National Science Foundation',
      description:
        'Research and development funding for small businesses developing innovative technologies',
      eligibility: ['Small businesses', 'Startups', 'Research institutions'],
      applicationDeadline: '2024-03-15',
      fundingAmount: 500000,
      category: 'research',
      status: 'open',
    },
    {
      id: 'GRT-002',
      title: 'Rural Development Grant Program',
      agency: 'Department of Agriculture',
      description:
        'Support for rural community development and infrastructure projects',
      eligibility: [
        'Rural communities',
        'Local governments',
        'Non-profit organizations',
      ],
      applicationDeadline: '2024-04-01',
      fundingAmount: 1000000,
      category: 'construction',
      status: 'open',
    },
    {
      id: 'GRT-003',
      title: 'Cybersecurity Education Grant',
      agency: 'Department of Homeland Security',
      description:
        'Funding for cybersecurity education and workforce development programs',
      eligibility: [
        'Universities',
        'Community colleges',
        'Training organizations',
      ],
      applicationDeadline: '2024-02-28',
      fundingAmount: 750000,
      category: 'it',
      status: 'open',
    },
    {
      id: 'GRT-004',
      title: 'Clean Energy Innovation Fund',
      agency: 'Department of Energy',
      description:
        'Support for renewable energy research and development projects',
      eligibility: [
        'Research institutions',
        'Universities',
        'Private companies',
      ],
      applicationDeadline: '2024-05-15',
      fundingAmount: 2000000,
      category: 'research',
      status: 'open',
    },
    {
      id: 'GRT-005',
      title: 'Community Health Centers Grant',
      agency: 'Department of Health and Human Services',
      description:
        'Funding to establish and expand community health centers in underserved areas',
      eligibility: [
        'Non-profit organizations',
        'Public agencies',
        'Tribal organizations',
      ],
      applicationDeadline: '2024-03-30',
      fundingAmount: 1500000,
      category: 'consulting',
      status: 'open',
    },
  ];

  constructor() {}

  searchGrants(criteria: SearchCriteria): Observable<Grant[]> {
    let filteredGrants = this.mockGrants;

    // Filter by keywords
    if (criteria.keywords) {
      const keywords = criteria.keywords.toLowerCase();
      filteredGrants = filteredGrants.filter(
        (grant) =>
          grant.title.toLowerCase().includes(keywords) ||
          grant.description.toLowerCase().includes(keywords) ||
          grant.agency.toLowerCase().includes(keywords) ||
          grant.eligibility.some((eligibility) =>
            eligibility.toLowerCase().includes(keywords)
          )
      );
    }

    // Filter by category
    if (criteria.category) {
      filteredGrants = filteredGrants.filter(
        (grant) => grant.category === criteria.category
      );
    }

    // Simulate API delay
    return of(filteredGrants);
  }

  getAllGrants(): Observable<Grant[]> {
    return of(this.mockGrants);
  }
}
