pragma solidity >=0.4.22 <0.7.0;

import "../contracts/Hello.sol";
import "truffle/Assert.sol";

contract TestHello {

	function testAdd() public {
		Hello hello = new Hello();
		uint result = hello.add(1, 20);
		Assert.equal(result, 21, "TestAdd");
	}

	function testPrint() public {
		Hello hello = new Hello();
	    string memory result = hello.print();
		Assert.equal(result, "Hello World", "TestPrint");
	}
}