import { HttpStatus } from "@nestjs/common";

import { ApplicationError, RessourceAlreadyExistsApplicationError } from "@/common/errors/domain/application.error";
import { DomainError, InvalidTransitionDomainError, ValidationDomainError } from "@/common/errors/domain/domain.error";
import {
	InfrastructureError,
	InfrastructureValidationInfrastructureError,
} from "@/common/errors/domain/infrastructure.error";
import { DtoValidationPresentationError } from "@/common/errors/domain/presentation.error";

type TErrorConstructor = abstract new (message: string, payload?: Record<string, unknown>) => Error;

export const errorHttpStatusByBase: Map<TErrorConstructor, HttpStatus> = new Map([
	[DomainError, HttpStatus.BAD_REQUEST],
	[ApplicationError, HttpStatus.UNPROCESSABLE_ENTITY],
	[InfrastructureError, HttpStatus.INTERNAL_SERVER_ERROR],
]);

const errorHttpStatusByDomainError: Map<TErrorConstructor, HttpStatus> = new Map([
	[ValidationDomainError, HttpStatus.BAD_REQUEST],
	[InvalidTransitionDomainError, HttpStatus.CONFLICT],
]);

const errorHttpStatusByApplicationError: Map<TErrorConstructor, HttpStatus> = new Map([
	[RessourceAlreadyExistsApplicationError, HttpStatus.CONFLICT],
]);

const errorHttpStatusByInfrastructureError: Map<TErrorConstructor, HttpStatus> = new Map([
	[InfrastructureValidationInfrastructureError, HttpStatus.INTERNAL_SERVER_ERROR],
]);

const errorHttpStatusByPresentationError: Map<TErrorConstructor, HttpStatus> = new Map([
	[DtoValidationPresentationError, HttpStatus.BAD_REQUEST],
]);

export const errorHttpStatusByError: Map<TErrorConstructor, HttpStatus> = new Map([
	...errorHttpStatusByDomainError.entries(),
	...errorHttpStatusByApplicationError.entries(),
	...errorHttpStatusByInfrastructureError.entries(),
	...errorHttpStatusByPresentationError.entries(),
]);
