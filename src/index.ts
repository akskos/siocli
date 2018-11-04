import container from './container';
import Main from './Main';
import Config from './Config';

(async () => {
  try {
    const siocli = container.resolve<Main>('main');
    await siocli.start();
  } catch (error) {
    if (error.message === 'invalid usage') {
      container.resolve<Config>('config').printUsage();
    } else {
      console.error(error);
    }
  }
})();
