import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { Auth0JwtStrategy } from "@/common/auth/infrastructure/strategies/auth0.strategy";

@Module({
	exports: [PassportModule],
	imports: [PassportModule.register({ defaultStrategy: "jwt" })],
	providers: [Auth0JwtStrategy],
})
export class AuthModule {}
