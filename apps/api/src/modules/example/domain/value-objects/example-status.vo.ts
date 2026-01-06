import { RootValueObject } from "@/common/root/domain/value-objects/root.vo";

export type TExampleStatus = "draft" | "active" | "archived";

export class ExampleStatus extends RootValueObject<TExampleStatus> {
	private constructor(value: TExampleStatus) {
		super(value);
	}

	public static draft(): ExampleStatus {
		return new ExampleStatus("draft");
	}

	public static fromPrimitive(raw: string): ExampleStatus {
		if (raw !== "draft" && raw !== "active" && raw !== "archived") {
			throw new Error(`Invalid ExampleStatus: ${raw}`);
		}
		return new ExampleStatus(raw);
	}

	public transitionTo(next: TExampleStatus): ExampleStatus {
		const nextStatus = new ExampleStatus(next);

		if (!this._canTransitionTo(nextStatus)) {
			throw new Error(`Cannot transition from ${this._value} to ${nextStatus._value}`);
		}

		return nextStatus;
	}

	private _canTransitionTo(next: ExampleStatus): boolean {
		const from = this._value;
		const to = next._value;

		if (from === to) return true;

		const allowed: Record<TExampleStatus, TExampleStatus[]> = {
			active: ["archived"],
			archived: [],
			draft: ["active", "archived"],
		};

		return allowed[from].includes(to);
	}
}
