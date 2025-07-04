// src/environments/environment.ts
export const environment = {
  production: false,
  apis: {
    sam: {
      baseUrl: 'https://api.sam.gov/opportunities/v2',
      // Get your free API key from: https://open.gsa.gov/api/opportunities-api/
      apiKey: localStorage.getItem('sam_api_key') || '',
    },
    grants: {
      baseUrl: 'https://www.grants.gov/grantsws/rest',
    },
  },
};
