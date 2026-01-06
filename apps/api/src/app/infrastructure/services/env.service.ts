import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import { EnvironmentVariablesInputDto } from "@/app/presentation/dto/inputs/env.input-dto";

export function envValidationService(config: Record<string, unknown>): EnvironmentVariablesInputDto {
	const validatedConfig = plainToInstance(EnvironmentVariablesInputDto, config, { enableImplicitConversion: true });

	const errors = validateSync(validatedConfig, { skipMissingProperties: false });

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return validatedConfig;
}
