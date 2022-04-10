import './App.css';
import FormExample from './form/FormExample';
import UseFormikForm from './form/useFormikForm';
import MUIDemo from './mui/MUIDemo'
import MuiCheckbox from './mui/MuiCheckbox';
import MuiTab from './mui/MuiTab';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiTab />
      <ReactQueryDevtools />
    </QueryClientProvider>

  );
}

export default App;
