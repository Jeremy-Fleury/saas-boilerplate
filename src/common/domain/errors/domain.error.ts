export abstract class DomainError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class InvalidTransitionError extends DomainError {}
export class ValidationError extends DomainError {}
