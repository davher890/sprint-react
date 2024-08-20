import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './app/App';
import store from "./app/redux/reducers/index";

import Seo from "./app/components/seo"
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';

ReactDOM.render(
  <Provider store={store}>
    <Seo
        title="Gestor de Clubes Deportivos"
        description="La solución definitiva para gestionar atletas, entrenadores, grupos y recibos."
        keywords="club deportivo, gestión, atletas, entrenadores, grupos, recibos"
    />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
