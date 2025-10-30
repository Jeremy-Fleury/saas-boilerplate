export interface IDomainEvent {
	readonly type: string;
	readonly aggregateId: string;
	readonly occurredAt: Date;
	readonly payload: Record<string, unknown>;
}
