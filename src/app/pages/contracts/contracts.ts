import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SearchForm,
  SearchCriteria,
} from '../../shared/search-form/search-form';
import { ContractService } from '../../services/contract';
import { Contract } from '../../models/contract';

@Component({
  selector: 'app-contracts',
  imports: [SearchForm, CommonModule],
  templateUrl: './contracts.html',
  styleUrl: './contracts.scss',
})
export class Contracts {
  contracts: Contract[] = [];
  isLoading = false;
  hasSearched = false;

  constructor(private contractService: ContractService) {}

  onSearchSubmitted(criteria: SearchCriteria) {
    this.isLoading = true;
    this.hasSearched = true;

    this.contractService.searchContracts(criteria).subscribe({
      next: (results) => {
        this.contracts = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching contracts:', error);
        this.isLoading = false;
      },
    });
  }
}
