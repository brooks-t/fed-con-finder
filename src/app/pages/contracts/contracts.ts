import { Component } from '@angular/core';
import {
  SearchForm,
  SearchCriteria,
} from '../../shared/search-form/search-form';

@Component({
  selector: 'app-contracts',
  imports: [SearchForm],
  templateUrl: './contracts.html',
  styleUrl: './contracts.scss',
})
export class Contracts {
  onSearchSubmitted(criteria: SearchCriteria) {
    console.log('Contract search criteria:', criteria);
    // TODO: Implement actual search logic
  }
}
