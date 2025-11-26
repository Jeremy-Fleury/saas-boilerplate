import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString } from "class-validator";

import type { ExampleEntity } from "@/modules/example/domain/entities/example.entity";
import type { TExampleStatus } from "@/modules/example/domain/types/example-status.type";

export class ExampleOutputDto {
	@ApiProperty({
		description: "The id of the example",
		example: "019ad951-368a-7de5-b7ba-add19cfd187b",
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
		description: "The status of the example",
		example: "draft",
		required: true,
		type: String,
	})
	@IsString()
	@IsIn(["draft", "active", "archived"])
	public status: TExampleStatus;

	public static fromEntity(entity: ExampleEntity): ExampleOutputDto {
		return {
			id: entity.id,
			name: entity.name.value,
			status: entity.status,
		};
	}
}
