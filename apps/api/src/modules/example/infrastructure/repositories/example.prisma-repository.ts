import type { Prisma } from "@/common/database/infrastructure/prisma-client/client";

import { Example } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";

export class ExamplePrismaRepository implements IExampleRepository {
	public constructor(private readonly _prisma: Prisma.TransactionClient) {}

	public async getById(id: string): Promise<Example | null> {
		const example = await this._prisma.example.findUnique({
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
				companyId: input.companyId,
				description: input.description,
				id: input.id.value,
				name: input.name,
				status: input.status.value,
			},
		});
	}
}
