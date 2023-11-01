import isOverlaped from '../ex_a/isOverlaped';

function testIsOverlapped(description: string, x1: number, x2: number, x3: number, x4: number, expectedResult: boolean) {
    test(description, () => {
        expect(isOverlaped(x1, x2, x3, x4)).toBe(expectedResult);
    });
}

function testIsOverlappedError(description: string, x1: any, x2: any, x3: any, x4: any) {
    test(description, () => {
        expect(() => isOverlaped(x1, x2, x3, x4)).toThrow('All arguments must be numbers');
    });
}

testIsOverlapped('(1,3) does not overlap (4,8)', 1, 3, 4, 8, false);
testIsOverlapped('(1,4) overlaps (4,8)', 1, 4, 4, 8, true);
testIsOverlapped('(1,5) overlaps (4,8)', 1, 5, 4, 8, true);
testIsOverlapped('(1,8) overlaps (4,8)', 1, 8, 4, 8, true);
testIsOverlapped('(1,10) overlaps (4,8)', 1, 10, 4, 8, true);
testIsOverlapped('(4,5) overlaps (4,8)', 4, 5, 4, 8, true);
testIsOverlapped('(4,8) overlaps (4,8)', 4, 8, 4, 8, true);
testIsOverlapped('(4,10) overlaps (4,8)', 4, 10, 4, 8, true);
testIsOverlapped('(5,8) overlaps (4,8)', 5, 8, 4, 8, true);
testIsOverlapped('(5,10) overlaps (4,8)', 5, 10, 4, 8, true);
testIsOverlapped('(8,10) overlaps (4,8)', 8, 10, 4, 8, true);
testIsOverlapped('(10,12) does not overlap (4,8)', 10, 12, 4, 8, false);

testIsOverlapped('(3,1) does not overlap (4,8)', 3, 1, 4, 8, false);
testIsOverlapped('(4,1) overlaps (4,8)', 4, 1, 4, 8, true);
testIsOverlapped('(5,1) overlaps (4,8)', 5, 1, 4, 8, true);
testIsOverlapped('(8,1) overlaps (4,8)', 8, 1, 4, 8, true);
testIsOverlapped('(10,1) overlaps (4,8)', 10, 1, 4, 8, true);
testIsOverlapped('(5,4) overlaps (4,8)', 5, 4, 4, 8, true);
testIsOverlapped('(8,4) overlaps (4,8)', 8, 4, 4, 8, true);
testIsOverlapped('(10,4) overlaps (4,8)', 10, 4, 4, 8, true);
testIsOverlapped('(8,5) overlaps (4,8)', 8, 5, 4, 8, true);
testIsOverlapped('(10,5) overlaps (4,8)', 10, 5, 4, 8, true);
testIsOverlapped('(10,8) overlaps (4,8)', 10, 8, 4, 8, true);
testIsOverlapped('(12,10) does not overlap (4,8)', 12, 10, 4, 8, false);

testIsOverlapped('(1,3) does not overlap (8,4)', 1, 3, 8, 4, false);
testIsOverlapped('(1,4) overlaps (8,4)', 1, 4, 8, 4, true);
testIsOverlapped('(1,5) overlaps (8,4)', 1, 5, 8, 4, true);
testIsOverlapped('(1,8) overlaps (8,4)', 1, 8, 8, 4, true);
testIsOverlapped('(1,10) overlaps (8,4)', 1, 10, 8, 4, true);
testIsOverlapped('(4,5) overlaps (8,4)', 4, 5, 8, 4, true);
testIsOverlapped('(4,8) overlaps (8,4)', 4, 8, 8, 4, true);
testIsOverlapped('(4,10) overlaps (8,4)', 4, 10, 8, 4, true);
testIsOverlapped('(5,8) overlaps (8,4)', 5, 8, 8, 4, true);
testIsOverlapped('(5,10) overlaps (8,4)', 5, 10, 8, 4, true);
testIsOverlapped('(8,10) overlaps (8,4)', 8, 10, 8, 4, true);
testIsOverlapped('(10,12) does not overlap (8,4)', 10, 12, 8, 4, false);

testIsOverlapped('(3,1) does not overlap (8,4)', 3, 1, 8, 4, false);
testIsOverlapped('(4,1) overlaps (8,4)', 4, 1, 8, 4, true);
testIsOverlapped('(5,1) overlaps (8,4)', 5, 1, 8, 4, true);
testIsOverlapped('(8,1) overlaps (8,4)', 8, 1, 8, 4, true);
testIsOverlapped('(10,1) overlaps (8,4)', 10, 1, 8, 4, true);
testIsOverlapped('(5,4) overlaps (8,4)', 5, 4, 8, 4, true);
testIsOverlapped('(8,4) overlaps (8,4)', 8, 4, 8, 4, true);
testIsOverlapped('(10,4) overlaps (8,4)', 10, 4, 8, 4, true);
testIsOverlapped('(8,5) overlaps (8,4)', 8, 5, 8, 4, true);
testIsOverlapped('(10,5) overlaps (8,4)', 10, 5, 8, 4, true);
testIsOverlapped('(10,8) overlaps (8,4)', 10, 8, 8, 4, true);
testIsOverlapped('(12,10) does not overlap (8,4)', 12, 10, 8, 4, false);

testIsOverlappedError('All arguments must be numbers exception due to x1', 'a', 10, 8, 4);
testIsOverlappedError('All arguments must be numbers exception due to x2', 12, 'b', 8, 4);
testIsOverlappedError('All arguments must be numbers exception due to x3', 12, 10, 'c', 4);
testIsOverlappedError('All arguments must be numbers exception due to x4', 12, 10, 8, 'd');