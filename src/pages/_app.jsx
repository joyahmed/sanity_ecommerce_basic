import { AppProvider } from '@/context/AppContext';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../screens';

export default function App({ Component, pageProps }) {
	return (
		<AppProvider>
			<Layout>
				<Toaster />
				<Component {...pageProps} />
			</Layout>
		</AppProvider>
	);
}
