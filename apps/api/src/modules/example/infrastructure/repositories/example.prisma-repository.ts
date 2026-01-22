import { Example } from "@/modules/example/domain/entities/example.entity";
import type { Prisma } from "@/common/database/infrastructure/prisma-client/client";
import type { IExampleRepository } from "@/modules/example/domain/repositories/example.repository";

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
				companyId: input.companyId.value,
				description: input.description,
				id: input.id.value,
				name: input.name,
				status: input.status.value,
			},
		});
	}
}
