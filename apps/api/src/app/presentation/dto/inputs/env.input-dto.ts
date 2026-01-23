import { IsIn, IsNumber, IsString, Max, Min } from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

export class EnvironmentVariablesInputDto {
	@IsString()
	@IsIn(["local", "development", "production"])
	public NODE_ENV!: "local" | "development" | "production" | "test";

	@IsNumber()
	@Min(MIN_PORT)
	@Max(MAX_PORT)
	public PORT!: number;
}
