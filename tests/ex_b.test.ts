import compareVersions from '../ex_b/compareVersions';

function testCompareVersions(description: string, v1: string, v2: string, expectedResult: number): void {
    test(description, () => {
        expect(compareVersions(v1, v2)).toBe(expectedResult);
    });
}

function testCompareVersionsError(description: string, v1: string, v2: string): void {
    test(description, () => {
        expect(() => compareVersions(v1, v2)).toThrow('Invalid version format');
    });
}

testCompareVersions('1.2 is greater than 1.1', '1.2', '1.1', 1);
testCompareVersions('1.1 is less than 1.2', '1.1', '1.2', -1);
testCompareVersions('1.1.1 is greater than 1.1', '1.1.1', '1.1', 1);
testCompareVersions('1.2 is greater than 1.1.1', '1.2', '1.1.1', 1);
testCompareVersions('2.0.0 is greater than 1.9', '2.0.0', '1.9', 1);
testCompareVersions('1.9 is less than 2.0.0', '1.9', '2.0.0', -1);
testCompareVersions('1.10 is greater than 1.9', '1.10', '1.9', 1);
testCompareVersions('3 is greater than 2.5', '3', '2.5', 1);
testCompareVersions('2.5 is less than 3', '2.5', '3', -1);
testCompareVersions('1.0.0 is equal to 1.0', '1.0.0', '1.0', 0);
testCompareVersions('1.0 is equal to 1.0.0', '1.0', '1.0.0', 0);
testCompareVersions('1.2.3 is equal to 1.2.3', '1.2.3', '1.2.3', 0);
testCompareVersions('2.0 is greater than 1', '2.0', '1', 1);
testCompareVersions('1 is less than 2.0', '1', '2.0', -1);
testCompareVersions('1.0 is equal to 1.0.0', '1.0', '1.0.0', 0);
testCompareVersions('2.1.0 is greater than 2.0', '2.1.0', '2.0', 1);
testCompareVersions('2.0 is less than 2.1.0', '2.0', '2.1.0', -1);
testCompareVersions('1.10 is equal to 1.10.0', '1.10', '1.10.0', 0);
testCompareVersions('2 is equal to 2.0', '2', '2.0', 0);

testCompareVersionsError('Invalid version format for version1', '1.a', '1.2');
testCompareVersionsError('Invalid version format for version2', '1.2', '2.b');
testCompareVersionsError('Invalid version format for version1 or version2', '1.a', '2.b');
