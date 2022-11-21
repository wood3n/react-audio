import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';
import RCAudio from './components/rc-audio';
import 'antd/dist/reset.css';
import './app.css';

dayjs.extend(durationPlugin);
dayjs.locale('zh-cn');

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#00B96B',
          borderRadius: 16
        }
      }}
    >
      <RCAudio />
    </ConfigProvider>
  );
}

export default App;
