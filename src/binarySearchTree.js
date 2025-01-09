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
		this.array = this.createUniqueArray(array);
		this.root = this.buildTree(this.array);
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

		const mid = Math.floor(array.length / 2);

		const root = new Node(array[mid]);

		root.left = this.buildTree(array.slice(0, mid));
		root.right = this.buildTree(array.slice(mid + 1));

		return root;
	}

	// TODO: complete functions to delete and insert a given value
	insert(value) {
		const insertRecursive = (node, value) => {
			if (node === null) {
				return new Node(value);
			}

			// Ensure no duplicates
			if (node.data === value) {
				return node;
			}

			if (value < node.data) {
				node.left = insertRecursive(node.left, value);
			} else {
				node.right = insertRecursive(node.right, value);
			}

			return node;
		};

		this.root = insertRecursive(this.root, value);
	}

	deleteItem(value, root) {}
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
