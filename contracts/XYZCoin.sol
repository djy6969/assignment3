pragma solidity ^0.5.1;
import "./ERC20.sol";
import "./safemath.sol";
contract XYZCoin is ERC20Interface{
    using SafeMath for uint256;
    string _name;
    string _symbol;
    uint8 _decimal = 0;
    uint256 public _totalSupply = 1000;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    function totalSupply() public view returns (uint256) {
    return _totalSupply;
    }
    function balanceOf(address account) public view returns (uint256) {
    return balances[account];
    }

    function allowance(address owner, address spender) public view returns (uint256) {
    return allowed[owner][spender];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
    _transfer(msg.sender, recipient, amount);
    return true; }

    function approve(address spender, uint256 value) public returns (bool) {
    _approve(msg.sender, spender, value);
    return true; }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
    _transfer(sender, recipient, amount);
    _approve(sender, msg.sender, allowed[sender][msg.sender].sub(amount));
    return true; }

    function _transfer(address sender, address recipient, uint256 amount) internal {
    require(sender != address(0), "ERC20: transfer from the zero address");
    require(recipient != address(0), "ERC20: transfer to the zero address");
    balances[sender] = balances[sender].sub(amount);
    balances[recipient] = balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
    }

    function _approve(address owner, address spender, uint256 value) internal {
    require(owner != address(0), "ERC20: approve from the zero address");
    require(spender != address(0), "ERC20: approve to the zero address");
    allowed[owner][spender] = value;
    emit Approval(owner, spender, value);
    }
}
