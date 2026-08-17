/**
 * Base mapper for converting between a domain entity and its DTO representation.
 * @template D - The domain entity type.
 * @template M - The DTO (data transfer object) type.
 */
export abstract class MapperRoot<D, M> {
    /**
     * Creates a domain entity from a DTO.
     * @param dto - The DTO to convert.
     * @returns The resulting domain entity.
     */
    public abstract create(dto: M): D;

    /**
     * Normalizes a domain entity into its DTO representation.
     * @param domain - The domain entity to convert.
     * @returns The resulting DTO.
     */
    public abstract normalize(domain: D): M;
}
