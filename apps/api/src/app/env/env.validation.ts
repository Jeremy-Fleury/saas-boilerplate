import { plainToInstance } from "class-transformer";
import { IsIn, IsNumber, IsString, Max, Min, validateSync } from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentVariables {
	@IsString()
	@IsIn(["local", "development", "production"])
	public NODE_ENV: "local" | "development" | "production" | "test";

	@IsNumber()
	@Min(MIN_PORT)
	@Max(MAX_PORT)
	public PORT: number;
}

export function envValidate(config: Record<string, unknown>): EnvironmentVariables {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });

	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}
