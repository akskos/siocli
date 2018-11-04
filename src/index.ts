import container from './container';
import Main from './Main';

const printUsage = () => {
  console.error('Usage: siocli hostname[:port]');
};

debugger;

(async () => {
  try {
    const siocli = container.resolve<Main>('main');
    await siocli.start();
  } catch (error) {
    if (error.message === 'invalid usage') {
      printUsage();
    } else {
      console.error(error);
    }
  }
})();
