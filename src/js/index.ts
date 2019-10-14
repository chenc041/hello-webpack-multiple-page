// @ts-ignore
import '../style/index.less';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('file-loader!../index.html');
}
