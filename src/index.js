import { Tree, prettyPrint } from './binarySearchTree.js';

function generateRandomNumbers(amount) {
	const randomNumbers = [];

	for (let i = 0; i < amount; i++) {
		randomNumbers.push(Math.floor(Math.random() * 100));
	}

	return randomNumbers;
}

const randomNumbers = generateRandomNumbers(50);
const tree = new Tree(randomNumbers);

console.log(tree.isBalanced());

console.log('Pre Order Traversal');
tree.preOrder((node) => console.log(node.data));

console.log('In Order Traversal');
tree.inOrder((node) => console.log(node.data));

console.log('Post Order Traversal');
tree.postOrder((node) => console.log(node.data));

const unbalancedNumbers = [150, 333, 176, 122, 555, 422];
unbalancedNumbers.forEach((number) => tree.insert(number));

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log('Pre Order Traversal');
tree.preOrder((node) => console.log(node.data));

console.log('In Order Traversal');
tree.inOrder((node) => console.log(node.data));

console.log('Post Order Traversal');
tree.postOrder((node) => console.log(node.data));

prettyPrint(tree.root);
