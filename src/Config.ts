import nconf from 'nconf';

export default class Config {
  get url() {
    return nconf.get('url');
  }
}
