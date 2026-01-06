import type { Prisma } from "@/common/database/infrastructure/prisma-client/client";

import { Company } from "../../domain/entities/company.entity";
import type { ICompanyRepository } from "../../domain/repositories/company.repository";

export class CompanyPrismaRepository implements ICompanyRepository {
	public constructor(private readonly _prisma: Prisma.TransactionClient) {}

	public async getByName(name: string): Promise<Company | null> {
		const company = await this._prisma.company.findUnique({
			where: {
				name,
			},
		});

		if (!company) {
			return null;
		}

		return Company.fromPrimitives(company);
	}

	public async create(input: Company): Promise<void> {
		const primitives = input.toPrimitives();

		await this._prisma.company.create({
			data: {
				id: primitives.id,
				name: primitives.name,
			},
		});
	}
}
