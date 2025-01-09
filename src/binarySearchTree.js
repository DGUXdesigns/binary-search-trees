import { mergeSort } from './mergeSort.js';

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor(array) {
		this.root = this.buildTree(array);
	}

	createUniqueArray(array) {
		let noDuplicates = new Set(array);
		let uniqueArray = [...noDuplicates];

		const sortedArray = mergeSort(uniqueArray);

		return sortedArray;
	}

	buildTree(array) {
		if (array.length === 0) {
			return null;
		}

		const sortedArray = this.createUniqueArray(array);
		const mid = Math.floor(sortedArray.length / 2);

		const root = new Node(sortedArray[mid]);

		root.left = this.buildTree(sortedArray.slice(0, mid));
		root.right = this.buildTree(sortedArray.slice(mid + 1));

		return root;
	}
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};
