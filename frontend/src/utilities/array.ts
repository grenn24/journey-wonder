// Returns a new array with the element at the specified index removed
export function removeFromArray(array: any[], indexToRemove: number) {
	const filteredArray = array.filter((_, index) => index !== indexToRemove);
	return filteredArray;
}

export function removeElementFromArray(array: any[], target: any) {
	const filteredArray = array.filter((value, _) => value !== target);
	return filteredArray;
}

export function arrayContains<T>(
	array: T[],
	target: T,
	predicate: (element: T, target: T) => boolean
) {
	for (const element of array) {
		if (predicate(element, target)) {
			return true;
		}
	}
	return false;
}
