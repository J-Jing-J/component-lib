import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './menu';

export interface MenuItemPrps {
  index?: number; //用来与defaultIndex比较高亮
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemPrps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'number') {
      context.onSelect(index);
    }
  };

  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

// displayName是react内置的静态属性，帮助判断类型
MenuItem.displayName = 'MenuItem';
export default MenuItem;
