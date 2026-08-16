/**
 * DateValueObject class represents a date value object.
 */
export class DateValueObject {
    /**
     * @param value - The date value to be encapsulated by this value object.
     */
    constructor(protected readonly value: Date) {}

    /**
     * Creates a new instance of DateValueObject with the provided date value.
     * @param value - The date value to be encapsulated.
     */
    public static create(value: Date): DateValueObject {
        return new DateValueObject(value);
    }

    /**
     * Returns the encapsulated date value.
     * @return The encapsulated date value as a Date object.
     */
    public toDate(): Date {
        return this.value;
    }

    /**
     * Returns the encapsulated date value as a string.
     * @return The encapsulated date value as a string.
     */
    public toIsoString(): string {
        return this.value.toISOString();
    }
}
