import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Contract } from '../models/contract';
import { SearchCriteria } from '../shared/search-form/search-form';
import { environment } from '../../environments/environment';

export interface SamOpportunity {
  noticeId: string;
  title: string;
  department: string;
  subTier: string;
  description: string;
  postedDate: string;
  responseDeadline: string;
  estimatedValue?: string;
  placeOfPerformance?: {
    city?: string;
    state?: string;
  };
  naicsCode?: string;
  active: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private readonly baseUrl = environment.apis.sam.baseUrl;
  private readonly apiKey = environment.apis.sam.apiKey;

  // Keep mock data as fallback
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

  constructor(private http: HttpClient) {}

  searchContracts(criteria: SearchCriteria): Observable<Contract[]> {
    // If no API key, fall back to mock data
    if (!this.apiKey) {
      console.warn('No SAM.gov API key configured, using mock data');
      return this.searchMockContracts(criteria);
    }

    return this.searchRealContracts(criteria).pipe(
      catchError((error) => {
        console.error('API call failed, falling back to mock data:', error);
        return this.searchMockContracts(criteria);
      })
    );
  }

  private searchRealContracts(
    criteria: SearchCriteria
  ): Observable<Contract[]> {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('offset', '0');

    // Add search parameters
    if (criteria.keywords) {
      params = params.set('q', criteria.keywords);
    }

    if (criteria.location) {
      params = params.set('psc', criteria.location); // Place of performance
    }

    if (criteria.category) {
      // Map categories to NAICS codes
      const naicsMap: { [key: string]: string } = {
        it: '541511', // Custom Computer Programming Services
        construction: '236220', // Commercial and Institutional Building Construction
        consulting: '541611', // Administrative Management and General Management Consulting Services
        research: '541712', // Research and Development in the Physical, Engineering, and Life Sciences
      };

      if (naicsMap[criteria.category]) {
        params = params.set('naics', naicsMap[criteria.category]);
      }
    }

    return this.http
      .get<{ opportunities: SamOpportunity[] }>(`${this.baseUrl}/search`, {
        params,
      })
      .pipe(map((response) => this.transformSamData(response.opportunities)));
  }

  private transformSamData(opportunities: SamOpportunity[]): Contract[] {
    return opportunities.map((opp) => ({
      id: opp.noticeId,
      title: opp.title,
      agency: opp.department || opp.subTier,
      description: opp.description || 'No description available',
      postedDate: opp.postedDate,
      responseDeadline: opp.responseDeadline,
      estimatedValue: opp.estimatedValue
        ? parseInt(opp.estimatedValue.replace(/[^\d]/g, ''))
        : undefined,
      location: this.formatLocation(opp.placeOfPerformance),
      category: this.mapNaicsToCategory(opp.naicsCode),
      status: opp.active === 'Yes' ? 'open' : 'closed',
    }));
  }

  private formatLocation(placeOfPerformance?: {
    city?: string;
    state?: string;
  }): string {
    if (!placeOfPerformance) return 'Not specified';

    const parts = [];
    if (placeOfPerformance.city) parts.push(placeOfPerformance.city);
    if (placeOfPerformance.state) parts.push(placeOfPerformance.state);

    return parts.length > 0 ? parts.join(', ') : 'Not specified';
  }

  private mapNaicsToCategory(naicsCode?: string): string {
    if (!naicsCode) return 'other';

    // Map NAICS codes back to our categories
    const categoryMap: { [key: string]: string } = {
      '541511': 'it',
      '236220': 'construction',
      '541611': 'consulting',
      '541712': 'research',
    };

    return categoryMap[naicsCode] || 'other';
  }

  private searchMockContracts(
    criteria: SearchCriteria
  ): Observable<Contract[]> {
    let filteredContracts = this.mockContracts;

    if (criteria.keywords) {
      const keywords = criteria.keywords.toLowerCase();
      filteredContracts = filteredContracts.filter(
        (contract) =>
          contract.title.toLowerCase().includes(keywords) ||
          contract.description.toLowerCase().includes(keywords) ||
          contract.agency.toLowerCase().includes(keywords)
      );
    }

    if (criteria.location) {
      const location = criteria.location.toLowerCase();
      filteredContracts = filteredContracts.filter((contract) =>
        contract.location.toLowerCase().includes(location)
      );
    }

    if (criteria.category) {
      filteredContracts = filteredContracts.filter(
        (contract) => contract.category === criteria.category
      );
    }

    return of(filteredContracts);
  }

  getAllContracts(): Observable<Contract[]> {
    return this.searchContracts({ keywords: '' });
  }
}
