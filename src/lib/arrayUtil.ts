
export const countDuplicate = <T>(array: T[], target: T): number => {
    let count: number = 0
    for (const val of array) {
        if (val == target) {
            count++
        }
    }
    return count
}

export const removeDuplicate = <T>(array: T[]): T[] => {
    return Array.from(new Set(array))
}

export const splitArray = <T>(array: T[], eachSize: number): T[][] => {
    const length = Math.ceil(array.length / eachSize)
    return new Array(length).fill().map((_, i) =>
        array.slice(i * eachSize, (i + 1) * eachSize)
    )

}
