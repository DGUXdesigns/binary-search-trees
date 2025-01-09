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

	deleteItem(value) {
		const deleteRecursive = (node, value) => {
			// Base case
			if (node === null) {
				return node;
			}

			if (node.data > value) {
				node.left = deleteRecursive(node.left, value);
			} else if (node.data < value) {
				node.right = deleteRecursive(node.right, value);
			} else {
				// Node with 0 or 1 child
				if (node.left === null) {
					return node.right;
				}

				if (node.right === null) {
					return node.left;
				}

				// Node with 2 children
				let findMin = (currentNode) => {
					while (currentNode.left !== null) {
						currentNode = currentNode.left;
					}

					return currentNode;
				};

				const successor = findMin(node.right);

				node.data = successor.data;
				node.right = deleteRecursive(node.right, successor.data);
			}

			return node;
		};

		this.root = deleteRecursive(this.root, value);
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
