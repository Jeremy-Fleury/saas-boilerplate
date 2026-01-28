import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { setAccessTokenProvider } from "@org/api-client/http/custom-instance";
import { useEffect } from "react";
import type { JSX, PropsWithChildren } from "react";

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Audience = import.meta.env.VITE_AUTH0_AUDIENCE;

function AuthTokenBridge(): JSX.Element | null {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	useEffect(() => {
		setAccessTokenProvider(async () => {
			if (!isAuthenticated) {
				return null;
			}

			try {
				return await getAccessTokenSilently(
					auth0Audience
						? {
								authorizationParams: {
									audience: auth0Audience,
								},
							}
						: undefined,
				);
			} catch {
				return null;
			}
		});

		return () => setAccessTokenProvider(null);
	}, [getAccessTokenSilently, isAuthenticated]);

	return null;
}

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
	if (!auth0Domain || !auth0ClientId) {
		throw new Error("Auth0 configuration missing. Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID.");
	}

	return (
		<Auth0Provider
			authorizationParams={{
				audience: auth0Audience || undefined,
				// biome-ignore lint/style/useNamingConvention: Auth0 parameter
				redirect_uri: window.location.origin,
			}}
			cacheLocation="localstorage"
			clientId={auth0ClientId}
			domain={auth0Domain}
			useRefreshTokens
		>
			<AuthTokenBridge />
			{children}
		</Auth0Provider>
	);
}
