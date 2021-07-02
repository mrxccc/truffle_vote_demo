pragma solidity >=0.4.22 <0.7.0;

contract Hello {

	function print() public pure returns(string memory) {
		return "Hello World";
	}

	function add(uint n1, uint n2) public pure returns(uint) {
		return n1 + n2;
	}
}