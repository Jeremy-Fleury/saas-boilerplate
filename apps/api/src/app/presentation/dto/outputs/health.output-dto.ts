import { ApiProperty } from "@nestjs/swagger";

interface IHealthOutputDtoProps {
	status: "ok";
}

export class HealthOutputDto implements IHealthOutputDtoProps {
	public constructor(props: IHealthOutputDtoProps) {
		this.status = props.status;
	}

	@ApiProperty({
		description: "The status of the health check",
		example: "ok",
		required: true,
		type: String,
	})
	public status: "ok";
}
