export class PaginatedResult<T> {
    // tslint:disable-next-line:variable-name
    private readonly _result: T[];
    // tslint:disable-next-line:variable-name
    private readonly _count: number;
    // tslint:disable-next-line:variable-name
    private readonly _hasNext: boolean;
    // tslint:disable-next-line:variable-name
    private readonly _hasPrev: boolean;

    get hasPrev(): boolean {
        return this._hasPrev;
    }

    get hasNext(): boolean {
        return this._hasNext;
    }

    get count(): number {
        return this._count;
    }

    get result(): T[] {
        return this._result;
    }

    constructor(result, count, hasNext, hasPrev) {
        this._result = result;
        this._count = count;
        this._hasNext = hasNext;
        this._hasPrev = hasPrev;
    }
}
