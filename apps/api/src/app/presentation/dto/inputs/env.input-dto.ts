import { IsIn, IsNumber, IsString, Max, Min } from "class-validator";

const MIN_PORT = 0;
const MAX_PORT = 65535;

interface IEnvironmentVariablesInputDtoProps {
	NODE_ENV: "local" | "development" | "production" | "test";
	PORT: number;
}

export class EnvironmentVariablesInputDto implements IEnvironmentVariablesInputDtoProps {
	public constructor(props: IEnvironmentVariablesInputDtoProps) {
		this.NODE_ENV = props.NODE_ENV;
		this.PORT = props.PORT;
	}

	@IsString()
	@IsIn(["local", "development", "production"])
	public NODE_ENV: "local" | "development" | "production" | "test";

	@IsNumber()
	@Min(MIN_PORT)
	@Max(MAX_PORT)
	public PORT: number;
}
