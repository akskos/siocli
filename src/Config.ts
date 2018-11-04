import nconf, { Provider } from 'nconf';

export default class Config {
  private provider: Provider;
  constructor() {
    this.provider = nconf.env().argv();
  }

  get url() {
    return this.provider.get('url');
  }
}
