import { Menu } from 'antd';
// import 'antd/es/menu/style/css';
const { SubMenu } = Menu;

const StrategyNodeContextMenu = ({ x = -300, y = 0, onClickFunc }) => {
  return (
    <Menu
      style={{ width: 256, position: 'absolute', left: x, top: y }}
      mode="vertical"
      onClick={onClickFunc}
    >
      <Menu.Item key="addNode">add node</Menu.Item>
      <Menu.Item key="deleteNode">delete node</Menu.Item>
    </Menu>
  );
};

export default StrategyNodeContextMenu;
