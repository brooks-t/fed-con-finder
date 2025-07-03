import { Component } from '@angular/core';
import {
  SearchForm,
  SearchCriteria,
} from '../../shared/search-form/search-form';

@Component({
  selector: 'app-grants',
  imports: [SearchForm],
  templateUrl: './grants.html',
  styleUrl: './grants.scss',
})
export class Grants {
  onSearchSubmitted(criteria: SearchCriteria) {
    console.log('Grant search criteria:', criteria);
    // TODO: Implement actual search logic
  }
}
