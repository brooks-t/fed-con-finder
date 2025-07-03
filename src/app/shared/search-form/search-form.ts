import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SearchCriteria {
  keywords: string;
  location?: string;
  category?: string;
}

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
})
export class SearchForm {
  @Input() placeholder: string = 'Enter search keywords...';
  @Input() searchType: 'contracts' | 'grants' = 'contracts';
  @Output() searchSubmitted = new EventEmitter<SearchCriteria>();

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      keywords: [''],
      location: [''],
      category: [''],
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchCriteria: SearchCriteria = this.searchForm.value;
      this.searchSubmitted.emit(searchCriteria);
    }
  }
}
