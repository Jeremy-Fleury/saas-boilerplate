import { ApiProperty } from "@nestjs/swagger";

export class CompanyOutputDto {
	@ApiProperty({
		description: "Unique identifier of the company",
		example: "019ad951-368a-7de5-b7ba-add19cfd187b",
	})
	public id!: string;

	@ApiProperty({
		description: "Name of the company",
		example: "ACME Corp",
	})
	public name!: string;
}
