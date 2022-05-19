import classNames from 'classnames';
import React, { createContext, useState } from 'react';
import { MenuItemPrps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number; //默认被高亮的
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}
// 创建要传给子组件的context默认值
export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classNames('menu', className, {
    'memu-vertical': mode === 'vertical',
  });

  const handleClick = (index: number) => {
    // 设置高亮
    setCurrentActive(index);
    // 用户自定义的操作
    if (onSelect) {
      onSelect(index);
    }
  };

  // 传给子组件数据
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 为了拿到displayName需要进行类型断言
      const ChildElement =
        child as React.FunctionComponentElement<MenuItemPrps>;
      const { displayName } = ChildElement.type;
      if (displayName === 'MenuItem') {
        // React.cloneElement为child配置属性
        return React.cloneElement(ChildElement, {
          index,
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem Component',
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {/* {children} */}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
