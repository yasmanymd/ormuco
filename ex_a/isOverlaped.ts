function isOverlaped(x1: number, x2: number, x3: number, x4: number): boolean {
    if (typeof x1 !== 'number' || typeof x2 !== 'number' || typeof x3 !== 'number' || typeof x4 !== 'number') {
        throw new Error('All arguments must be numbers');
    }

    if (Math.max(x1, x2) < Math.min(x3, x4) || Math.min(x1, x2) > Math.max(x3, x4)) {
        return false;
    }
    return true;
}

export default isOverlaped;
