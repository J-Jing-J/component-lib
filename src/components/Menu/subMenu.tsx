import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './menu';

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-actice': context.index === index,
  });
  return (
    <li key={index} className={classes}>
      <div className="submenu-title"></div>
    </li>
  );
};
