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
		// Find smallest node
		const findMin = (node) => {
			while (node.left !== null) {
				node = node.left;
			}
			return node;
		};

		const deleteRecursive = (node, value) => {
			if (node === null) {
				return null;
			}

			if (value < node.data) {
				node.left = deleteRecursive(node.left, value);
			} else if (value > node.data) {
				node.right = deleteRecursive(node.right, value);
			} else {
				// Case 1: No child or one child
				if (node.left === null) return node.right;
				if (node.right === null) return node.left;

				// Case 2: Two children
				const successor = findMin(node.right);
				node.data = successor.data;
				node.right = deleteRecursive(node.right, successor.data);
			}

			return node;
		};

		this.root = deleteRecursive(this.root, value);
	}

	find(value) {
		const findRecursive = (node, value) => {
			if (!node || node.data === value) {
				return node;
			}

			return node.data > value
				? findRecursive(node.left, value)
				: findRecursive(node.right, value);
		};

		return findRecursive(this.root, value);
	}

	levelOrder(callback) {
		if (typeof callback !== 'function') {
			throw new Error('A callback function is required.');
		}

		let queue = [];
		queue.push(this.root);

		while (queue.length > 0) {
			const currentNode = queue.shift();
			callback(currentNode);

			if (currentNode.left) {
				queue.push(currentNode.left);
			}

			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}
	}

	preOrder(callback) {
		if (typeof callback !== 'function') {
			throw new Error('A callback function is required.');
		}

		const stack = [];
		stack.push(this.root);

		while (stack.length > 0) {
			const currentNode = stack.pop(); // Process the node
			callback(currentNode);

			// Push right child first so left child is processed first
			if (currentNode.right) {
				stack.push(currentNode.right);
			}
			if (currentNode.left) {
				stack.push(currentNode.left);
			}
		}
	}

	inOrder(callback) {
		if (typeof callback !== 'function') {
			throw new Error('A callback function is required.');
		}

		const stack = [];
		let currentNode = this.root;

		while (stack.length > 0 || currentNode !== null) {
			// Traverse to the leftmost node
			while (currentNode !== null) {
				stack.push(currentNode);
				currentNode = currentNode.left;
			}

			// Process the node
			currentNode = stack.pop();
			callback(currentNode);

			// Process the right subtree
			currentNode = currentNode.right;
		}
	}

	postOrder(callback) {
		if (typeof callback !== 'function') {
			throw new Error('A callback function is required.');
		}

		const stack1 = [];
		const stack2 = [];
		let currentNode = this.root;

		if (currentNode !== null) {
			stack1.push(currentNode);

			while (stack1.length > 0) {
				currentNode = stack1.pop();
				stack2.push(currentNode);

				// Push left and right children to stack1
				if (currentNode.left !== null) {
					stack1.push(currentNode.left);
				}

				if (currentNode.right !== null) {
					stack1.push(currentNode.right);
				}
			}
		}

		// Process nodes from stack2 (post-order: left, right, node)
		while (stack2.length > 0) {
			currentNode = stack2.pop();
			callback(currentNode);
		}
	}

	height(node) {
		if (node === null) {
			return -1;
		}

		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);

		return Math.max(leftHeight, rightHeight) + 1;
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
