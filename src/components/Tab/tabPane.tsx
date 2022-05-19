import classNames from 'classnames';
import { ReactNode, useContext, useEffect } from 'react';
import { TabContext } from './tab';

export interface TabPaneProps {
  index?: number; //用来与defaultIndex比较高亮
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  tab?: string; //选项卡头显示文字
}

const TabPane: React.FC<TabPaneProps> = (props) => {
  const { index, disabled, className, style, tab, children } = props;
  const context = useContext(TabContext);
  const classes = classNames('tab-pane', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });

  const handleClick = () => {
    if (context.onChange && !disabled && typeof index === 'number') {
      context.onChange(index);
      context.renderContent(children);
    }
  };

  useEffect(() => {
    if (index === 0) {
      context.renderContent(children);
    }
  }, []);

  return (
    <li style={style} className={classes} onClick={handleClick}>
      {tab}
    </li>
  );
};

TabPane.displayName = 'TabPane';
export default TabPane;
