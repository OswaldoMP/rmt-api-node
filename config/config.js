// PORT
process.env.PORT = process.env.PORT || 4000;

// CREDENTIAL DATABASE
process.env.DB_USERNAME = process.env.DB_USERNAME || 'mopa';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'mopa251946';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'rmt-dev';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '5432';
process.env.DB_DIALECT = process.env.DB_DIALECT || 'postgres';

// SEED JWT
process.env.SEED = process.env.SEED || 'secret';

// LIFE TOKEN
process.env.LIFE_TOKEN = '24h';

// ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';