'use client'
import { store } from '@/redux';
import { Provider } from 'react-redux';

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
  }
