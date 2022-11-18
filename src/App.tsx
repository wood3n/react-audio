import { LocaleProvider } from './store/Locale';
import RCAudio from './components/rc-audio';
import 'antd/dist/reset.css';
import './app.css';

interface Props {
  locale?: any;
}

function App({
  locale
}: Props) {
  return (
    <LocaleProvider locale={locale} >
      <RCAudio />
    </LocaleProvider>
  );
}

export default App;
