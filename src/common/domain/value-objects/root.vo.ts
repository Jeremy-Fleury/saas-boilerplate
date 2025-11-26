export abstract class RootValueObject<TValue> {
	protected constructor(protected readonly _value: TValue) {}

	public get value(): TValue {
		return this._value;
	}
}
