import Head from 'next/head';
import { withTRPC } from '@trpc/next';
import { ReactQueryDevtools } from 'react-query/devtools';

import type { AppProps } from 'next/app';
import type { AppRouter } from '@router';

import '@styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Will Do</title>
				<meta name="title" content="Will Do" />
				<meta name="description" content="Todo List Application" />

				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>

			<Component {...pageProps} />
			<ReactQueryDevtools position="bottom-right" />
		</>
	);
}

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return '';
	}
	// Reference for vercel.com
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}

	// Reference for render.com
	if (process.env.RENDER_INTERNAL_HOSTNAME) {
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
	}

	// Assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
	config() {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		return {
			url: `${getBaseUrl()}/api/trpc`,
			queryClientConfig: {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 1000 * 60 * 5
					}
				}
			}
		};
	},
	ssr: true
})(MyApp);
