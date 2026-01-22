import type { Example } from "@/modules/example/domain/entities/example.entity";
import type { ExampleOutputDto } from "@/modules/example/presentation/dto/outputs/example.output-dto";

export class ExampleOutputDtoMappers {
	public static fromEntity(example: Example): ExampleOutputDto {
		return {
			id: example.id.value,
			name: example.name,
			status: example.status.value,
		};
	}
}
