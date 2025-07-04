// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apis: {
    sam: {
      baseUrl: 'https://api.sam.gov/opportunities/v2',
      apiKey: '', // Production API key
    },
    grants: {
      baseUrl: 'https://www.grants.gov/grantsws/rest',
    },
  },
};
