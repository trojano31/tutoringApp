export class CannotEditReservedAdvertException extends Error {
    constructor(message: string) {
        super(message);
    }
}
