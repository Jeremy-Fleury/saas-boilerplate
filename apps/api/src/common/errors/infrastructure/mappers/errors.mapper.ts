import { HttpStatus } from "@nestjs/common";

import {
	RessourceAlreadyExistsApplicationError,
	RessourceNotFoundApplicationError,
} from "@/common/errors/domain/application.error";
import { InvalidTransitionDomainError, ValidationDomainError } from "@/common/errors/domain/domain.error";
import { InfrastructureValidationInfrastructureError } from "@/common/errors/domain/infrastructure.error";
import { DtoValidationPresentationError } from "@/common/errors/domain/presentation.error";

type TErrorConstructor = abstract new (message: string, payload?: Record<string, unknown>) => Error;

const errorHttpStatusByDomainError: Map<TErrorConstructor, HttpStatus> = new Map([
	[ValidationDomainError, HttpStatus.BAD_REQUEST],
	[InvalidTransitionDomainError, HttpStatus.CONFLICT],
]);

const errorHttpStatusByApplicationError: Map<TErrorConstructor, HttpStatus> = new Map([
	[RessourceNotFoundApplicationError, HttpStatus.NOT_FOUND],
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
