import { ApiProperty } from "@nestjs/swagger";

export class HealthOutputDto {
	@ApiProperty({
		description: "The status of the health check",
		example: "ok",
		required: true,
		type: String,
	})
	public status: "ok";
}
