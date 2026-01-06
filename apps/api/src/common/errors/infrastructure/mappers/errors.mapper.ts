import { HttpStatus } from "@nestjs/common";

import { ApplicationError, RessourceAlreadyExistsApplicationError } from "@/common/errors/domain/application.error";
import { DomainError, InvalidTransitionDomainError, ValidationDomainError } from "@/common/errors/domain/domain.error";
import {
	InfrastructureError,
	InfrastructureValidationInfrastructureError,
} from "@/common/errors/domain/infrastructure.error";

import { DtoValidationPresentationError } from "../../domain/presentation.error";

type TErrorConstructor = abstract new (...args: readonly unknown[]) => Error;

export const errorHttpStatusByBase: Map<TErrorConstructor, HttpStatus> = new Map([
	[DomainError, HttpStatus.BAD_REQUEST],
	[ApplicationError, HttpStatus.UNPROCESSABLE_ENTITY],
	[InfrastructureError, HttpStatus.INTERNAL_SERVER_ERROR],
]);

export const errorHttpStatusByError: Map<TErrorConstructor, HttpStatus> = new Map([
	[ValidationDomainError, HttpStatus.BAD_REQUEST],
	[InvalidTransitionDomainError, HttpStatus.CONFLICT],
	[RessourceAlreadyExistsApplicationError, HttpStatus.CONFLICT],
	[InfrastructureValidationInfrastructureError, HttpStatus.INTERNAL_SERVER_ERROR],
	[DtoValidationPresentationError, HttpStatus.BAD_REQUEST],
]);
