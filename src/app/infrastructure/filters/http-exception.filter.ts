import { Catch, HttpStatus } from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import type { FastifyReply } from "fastify";

import { ApplicationError } from "@/common/errors/domain/application.error";
import { DomainError } from "@/common/errors/domain/domain.error";
import { InfrastructureError } from "@/common/errors/domain/infrastructure.error";
import { PresentationError } from "@/common/errors/domain/presentation.error";
import { errorHttpStatusByBase, errorHttpStatusByError } from "@/common/errors/infrastructure/mappers/errors.mapper";

type THttpErrorBody = {
	statusCode: number;
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

		const message = typeof exception === "string" ? exception : "Internal server error";

		return this._buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "InternalServerError", message, {});
	}

	private _getStatusForError(error: Error): number | null {
		for (const [errorType, status] of errorHttpStatusByError.entries()) {
			if (error instanceof errorType) {
				return status;
			}
		}

		for (const [errorType, status] of errorHttpStatusByBase.entries()) {
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
				statusCode: status,
			},
			status,
		};
	}
}
