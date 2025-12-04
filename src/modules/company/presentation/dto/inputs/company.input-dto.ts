import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CompanyInputDto {
	@ApiProperty({
		description: "Name of the company",
		example: "ACME Corp",
		required: true,
		type: String,
	})
	@IsString()
	public name: string;
}
