import { InvalidTransitionError, ValidationError } from "@/common/domain/errors/domain.error";

import type { TExampleStatus } from "../types/example-status.type";

export function assertExampleStatus(x: unknown): asserts x is TExampleStatus {
	if (x !== "draft" && x !== "active" && x !== "archived") {
		throw new ValidationError(`Invalid status: ${String(x)}`);
	}
}

function canTransitionExampleStatus(from: TExampleStatus, to: TExampleStatus): boolean {
	if (from === to) {
		return true;
	}
	if (from === "draft" && (to === "active" || to === "archived")) {
		return true;
	}
	if (from === "active" && to === "archived") {
		return true;
	}
	return false;
}

export function assertCanTransitionExampleStatus(from: TExampleStatus, to: TExampleStatus): void {
	if (!canTransitionExampleStatus(from, to)) {
		throw new InvalidTransitionError(`Cannot transition from ${from} to ${to}`);
	}
}
