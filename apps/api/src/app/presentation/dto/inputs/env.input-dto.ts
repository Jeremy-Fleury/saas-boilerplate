import { IsIn, IsNumber, IsString, Max, Min } from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

export class EnvironmentVariablesInputDto {
	@IsString()
	@IsIn(["local", "development", "production", "test", "openapi"])
	public NODE_ENV!: "local" | "development" | "production" | "test" | "openapi";

	@IsNumber()
	@Min(MIN_PORT)
	@Max(MAX_PORT)
	public PORT!: number;

	@IsString()
	public AUTH0_ISSUER_URL!: string;

	@IsString()
	public AUTH0_AUDIENCE!: string;
}
