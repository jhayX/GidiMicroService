import { config } from 'dotenv';

config();

const development = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
}
};

const test = {
  use_env_variable: 'DB_URL_TEST',
  dialect: 'postgres'
};

// const production = {
//   use_env_variable: 'DATABASE_URL',
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: true
//   }
// };

export { development, test };
