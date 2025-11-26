import type { PrismaService } from "@/modules/database/infrastructure/services/prisma.service";

import { ExampleEntity } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";

export class ExamplePrismaRepository implements IExampleRepository {
	public constructor(private readonly _prismaService: PrismaService) {}

	public async getById(id: string): Promise<ExampleEntity | null> {
		const example = await this._prismaService.example.findUnique({
			where: { id },
		});

		return example ? ExampleEntity.fromPrimitives(example) : null;
	}

	public async create(input: ExampleEntity): Promise<void> {}
}
