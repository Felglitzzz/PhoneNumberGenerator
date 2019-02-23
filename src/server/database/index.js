import dotenv from 'dotenv';
import Repository from '../repositories';
import url from '../../config/url';

dotenv.config();

const { stagingDatabaseUrl, productionDatabaseUrl, fixturesUrl } = url;

console.log('NODE_ENVIRONMENT', process.env.NODE_ENV);

const environmentMapper = {
  test: fixturesUrl,
  development: stagingDatabaseUrl,
  production: productionDatabaseUrl,
};

const instance = new Repository(environmentMapper[process.env.NODE_ENV]);

const RepositoryInstance = instance;

export default RepositoryInstance;
