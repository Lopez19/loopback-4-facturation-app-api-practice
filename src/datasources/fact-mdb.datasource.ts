import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'fact_mdb',
  connector: 'mongodb',
  url: 'mongodb://root:root@localhost:27017/fact_mdb?authSource=admin',
  host: 'localhost',
  port: 27017,
  user: 'root',
  password: 'root',
  database: 'fact_mdb',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class FactMdbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'fact_mdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.fact_mdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
