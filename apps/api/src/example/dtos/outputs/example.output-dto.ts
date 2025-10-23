import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ExampleOutputDto {
	@ApiProperty({
		description: "The id of the example",
		example: "123",
		required: true,
		type: String,
	})
	@IsString()
	public id: string;

	@ApiProperty({
		description: "The name of the example",
		example: "Example",
		required: true,
		type: String,
	})
	@IsString()
	public name: string;

	@ApiProperty({
		description: "The description of the example",
		example: "Description",
		required: true,
		type: String,
	})
	@IsString()
	public description: string;
}
