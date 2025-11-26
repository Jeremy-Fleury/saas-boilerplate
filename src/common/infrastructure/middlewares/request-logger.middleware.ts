import { Injectable, Logger } from "@nestjs/common";
import type { NestMiddleware } from "@nestjs/common";

type TRequestLike = {
	method: string;
	url: string;
	body?: unknown;
	query?: unknown;
	params?: unknown;
	route?: {
		path?: string;
	};
	routerPath?: string;
};

type TResponseLike = {
	statusCode?: number;
	raw?: {
		statusCode?: number;
		on?: (event: string, listener: () => void) => void;
	};
	on?: (event: string, listener: () => void) => void;
};

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private readonly _logger = new Logger(RequestLoggerMiddleware.name);

	public use(req: TRequestLike, res: unknown, next: () => void): void {
		const startedAt = Date.now();
		const { method, url } = req;

		const route = req.route?.path ?? req.routerPath ?? url;

		this._logger.debug(
			[
				"\n▶ Incoming request",
				`  - method: ${method}`,
				`  - url: ${url}`,
				`  - route: ${route}`,
				`  - query: ${this._safeStringify(req.query)}`,
				`  - params: ${this._safeStringify(req.params)}`,
				`  - body: ${this._safeStringify(req.body)}`,
			].join("\n"),
		);

		const response = res as TResponseLike;

		const logResponse = (): void => {
			const durationMs = Date.now() - startedAt;

			let statusCode: number | undefined;

			if (typeof response.statusCode === "number") {
				statusCode = response.statusCode;
			} else if (typeof response.raw?.statusCode === "number") {
				statusCode = response.raw.statusCode;
			}

			this._logger.debug(
				[
					"\n◀ Outgoing response",
					`  - method: ${method}`,
					`  - url: ${url}`,
					statusCode !== undefined ? `  - status: ${statusCode}` : "  - status: unknown",
					`  - durationMs: ${durationMs}`,
				].join("\n"),
			);
		};

		if (typeof response.on === "function") {
			response.on("finish", logResponse);
		} else if (response.raw && typeof response.raw.on === "function") {
			response.raw.on("finish", logResponse);
		}

		next();
	}

	private _safeStringify(value: unknown): string {
		if (value === undefined) {
			return "undefined";
		}

		if (typeof value === "string") {
			return value;
		}

		try {
			return JSON.stringify(value);
		} catch {
			return "[unserializable]";
		}
	}
}
