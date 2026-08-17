/**
 * ArrayValueObject class represents a value object that encapsulates an array value.
 */
export class ArrayValueObject<T extends string | number> {
    /**
     * @param value - The array of values to be encapsulated by this value object.
     */
    constructor(protected readonly value: T[]) {}

    /**
     * Creates a new instance of ArrayValueObject with the provided array of values.
     * @param value - The array of values to be encapsulated.
     */
    public static create<T extends string | number>(value: T[]): ArrayValueObject<T> {
        return new ArrayValueObject(value);
    }

    /**
     * @returns The encapsulated array of values.
     */
    public toArray(): T[] {
        return this.value;
    }
}
