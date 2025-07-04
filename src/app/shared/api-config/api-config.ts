import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-config',
  imports: [FormsModule, CommonModule],
  templateUrl: './api-config.html',
  styleUrl: './api-config.scss',
})
export class ApiConfig {
  samApiKey: string = localStorage.getItem('sam_api_key') || '';
  showConfig: boolean = !this.samApiKey;

  saveApiKey() {
    if (this.samApiKey) {
      localStorage.setItem('sam_api_key', this.samApiKey);
      this.showConfig = false;
      // Reload to use new API key
      window.location.reload();
    }
  }

  toggleConfig() {
    this.showConfig = !this.showConfig;
  }
}
