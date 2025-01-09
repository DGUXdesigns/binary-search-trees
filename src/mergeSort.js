export function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	}

	const mid = Math.floor(array.length / 2);
	const left = array.slice(0, mid);
	const right = array.slice(mid);

	return merge(mergeSort(left), mergeSort(right));
}

export function merge(left, right) {
	const mergedArray = [];
	let leftIndex = 0;
	let rightIndex = 0;

	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] < right[rightIndex]) {
			mergedArray.push(left[leftIndex]);
			leftIndex++;
		} else {
			mergedArray.push(right[rightIndex]);
			rightIndex++;
		}
	}

	mergedArray.push(...left.slice(leftIndex));
	mergedArray.push(...right.slice(rightIndex));

	return mergedArray;
}
