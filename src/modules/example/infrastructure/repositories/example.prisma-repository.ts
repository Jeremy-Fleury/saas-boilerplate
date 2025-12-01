import type { Example as ExamplePrisma, Prisma } from "@/common/database/infrastructure/prisma-client/client";
import type { PrismaService } from "@/common/database/infrastructure/services/prisma.service";

import { Example } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";

export class ExamplePrismaRepository implements IExampleRepository {
	public constructor(private readonly _prisma: Prisma.TransactionClient | PrismaService) {}

	public async getById(id: string): Promise<Example | null> {
		const example: ExamplePrisma | null = await this._prisma.example.findUnique({
			where: {
				id,
			},
		});

		if (!example) {
			return null;
		}

		return Example.fromPrimitives(example);
	}

	public async create(input: Example): Promise<void> {
		await this._prisma.example.create({
			data: {
				description: input.description,
				id: input.id.value,
				name: input.name,
				status: input.status.value,
			},
		});
	}
}
