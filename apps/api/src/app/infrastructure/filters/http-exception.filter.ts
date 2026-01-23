import { Catch, HttpStatus, Logger } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { FastifyReply } from "fastify";

import { ApplicationError } from "@/common/errors/domain/application.error";
import { DomainError } from "@/common/errors/domain/domain.error";
import { InfrastructureError } from "@/common/errors/domain/infrastructure.error";
import { PresentationError } from "@/common/errors/domain/presentation.error";
import { errorHttpStatusByError } from "@/common/errors/infrastructure/mappers/errors.mapper";

type THttpErrorBody = {
	error: string;
	message: string;
	payload: Record<string, unknown>;
};

type THttpErrorResponse = {
	status: number;
	body: THttpErrorBody;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly _logger = new Logger(HttpExceptionFilter.name);

	public catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();

		const { status, body } = this._mapExceptionToHttpResponse(exception);

		response.status(status).send(body);
	}

	private _mapExceptionToHttpResponse(exception: unknown): THttpErrorResponse {
		if (
			exception instanceof DomainError ||
			exception instanceof ApplicationError ||
			exception instanceof InfrastructureError ||
			exception instanceof PresentationError
		) {
			const status = this._getStatusForError(exception) ?? HttpStatus.INTERNAL_SERVER_ERROR;
			return this._buildResponse(status, exception.name, exception.message, exception.payload);
		}

		this._logger.error(exception);

		return this._buildResponse(
			HttpStatus.INTERNAL_SERVER_ERROR,
			"InternalServerError",
			"This error is not handled by the application",
			{},
		);
	}

	private _getStatusForError(error: Error): number | null {
		for (const [errorType, status] of errorHttpStatusByError.entries()) {
			if (error instanceof errorType) {
				return status;
			}
		}
		return null;
	}

	private _buildResponse(
		status: number,
		error: string,
		message: string,
		payload: Record<string, unknown>,
	): THttpErrorResponse {
		return {
			body: {
				error,
				message,
				payload,
			},
			status,
		};
	}
}
