import type { Example, Prisma } from "@/database/infrastructure/prisma-client/client";
import type { PrismaService } from "@/database/infrastructure/services/prisma.service";

import { ExampleEntity } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";

export class ExamplePrismaRepository implements IExampleRepository {
	public constructor(private readonly _prisma: Prisma.TransactionClient | PrismaService) {}

	public async getById(id: string): Promise<ExampleEntity | null> {
		const example: Example | null = await this._prisma.example.findUnique({
			where: {
				id,
			},
		});

		if (!example) {
			return null;
		}

		return ExampleEntity.fromPrimitives(example);
	}

	public async create(input: ExampleEntity): Promise<void> {
		await this._prisma.example.create({
			data: {
				description: input.description.value,
				id: input.id,
				name: input.name.value,
				status: input.status,
			},
		});
	}
}
