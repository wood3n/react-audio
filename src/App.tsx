import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import RCAudio from './components/rc-audio';
import 'antd/dist/reset.css';
import './app.css';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
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
