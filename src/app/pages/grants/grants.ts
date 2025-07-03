import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SearchForm,
  SearchCriteria,
} from '../../shared/search-form/search-form';
import { GrantService } from '../../services/grant';
import { Grant } from '../../models/grant';

@Component({
  selector: 'app-grants',
  imports: [SearchForm, CommonModule],
  templateUrl: './grants.html',
  styleUrl: './grants.scss',
})
export class Grants {
  grants: Grant[] = [];
  isLoading = false;
  hasSearched = false;

  constructor(private grantService: GrantService) {}

  onSearchSubmitted(criteria: SearchCriteria) {
    this.isLoading = true;
    this.hasSearched = true;

    this.grantService.searchGrants(criteria).subscribe({
      next: (results) => {
        this.grants = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching grants:', error);
        this.isLoading = false;
      },
    });
  }
}
