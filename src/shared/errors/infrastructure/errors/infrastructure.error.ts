export abstract class InfrastructureError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class InfrastructureValidationError extends InfrastructureError {}
