import { Logger } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import type { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";

import { PrismaClient } from "@/common/database/infrastructure/prisma-client/client";
import type { Prisma } from "@/common/database/infrastructure/prisma-client/client";

type TPrismaEventClient = {
	$on: (
		eventType: "query" | "error" | "warn",
		callback: (event: Prisma.QueryEvent | Prisma.LogEvent) => void,
	) => void;
};

export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly _logger = new Logger(PrismaService.name);

	public constructor(configService: ConfigService) {
		super({
			adapter: new PrismaPg({ connectionString: configService.get<string>("DATABASE_URL") }),
			log: [
				{ emit: "event", level: "query" },
				{ emit: "event", level: "error" },
				{ emit: "event", level: "warn" },
			],
		});

		const prismaWithEvents = this as unknown as TPrismaEventClient;

		prismaWithEvents.$on("query", (event) => {
			const queryEvent = event as Prisma.QueryEvent;

			this._logger.debug(
				[
					"\n▶ Prisma query",
					`  - duration  : ${queryEvent.duration} ms`,
					`  - params    : ${this._formatParams(queryEvent.params)}`,
					`  - query     : ${queryEvent.query}`,
				].join("\n"),
			);
		});

		prismaWithEvents.$on("error", (event) => {
			const logEvent = event as Prisma.LogEvent;
			this._logger.error(`Prisma error: ${logEvent.message}`);
		});

		prismaWithEvents.$on("warn", (event) => {
			const logEvent = event as Prisma.LogEvent;
			this._logger.warn(`Prisma warn: ${logEvent.message}`);
		});
	}

	public async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	public async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}

	private _formatParams(params: string): string {
		if (!params) {
			return "[]";
		}

		return params;
	}
}
