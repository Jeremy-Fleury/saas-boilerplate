import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import JwksRsa from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { ConfigService } from "@nestjs/config";

type TAuth0JwtPayload = Record<string, unknown>;

@Injectable()
export class Auth0JwtStrategy extends PassportStrategy(Strategy) {
	public constructor(configService: ConfigService) {
		const issuer = configService.get<string>("AUTH0_ISSUER_URL");
		const audience = configService.get<string>("AUTH0_AUDIENCE");
		const nodeEnv = configService.get<string>("NODE_ENV");

		if (!issuer || !audience) {
			if (nodeEnv === "openapi") {
				super({
					algorithms: ["RS256"],
					audience: "openapi",
					issuer: "https://example.com/",
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					secretOrKeyProvider: JwksRsa.passportJwtSecret({
						cache: true,
						jwksRequestsPerMinute: 5,
						jwksUri: "https://example.com/.well-known/jwks.json",
						rateLimit: true,
					}),
				});
				return;
			}

			throw new Error("AUTH0_ISSUER_URL and AUTH0_AUDIENCE must be configured.");
		}

		const normalizedIssuer = issuer.endsWith("/") ? issuer : `${issuer}/`;

		super({
			algorithms: ["RS256"],
			audience,
			issuer: normalizedIssuer,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKeyProvider: JwksRsa.passportJwtSecret({
				cache: true,
				jwksRequestsPerMinute: 5,
				jwksUri: `${normalizedIssuer}.well-known/jwks.json`,
				rateLimit: true,
			}),
		});
	}

	public validate(payload: TAuth0JwtPayload): TAuth0JwtPayload {
		return payload;
	}
}
