import classNames from 'classnames';
import { ReactNode, useContext, useEffect } from 'react';
import { TabContext } from './tab';

export interface TabPaneProps {
  index: number; //用来与defaultIndex比较高亮
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  tab?: string; //选项卡头显示文字
}

const TabPane: React.FC<TabPaneProps> = (props) => {
  const { index, disabled, className, style, tab, children } = props;
  const context = useContext(TabContext);
  const paneClasses = classNames('tab-pane', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });
  const deleteClasses = classNames('deleteBtn', {});

  const addHandleClick = () => {
    if (context.onChange && !disabled && typeof index === 'number') {
      context.onChange(index);
      console.log('index', index);
      context.renderContent(children);
    }
  };

  const deleteHandleClick = () => {
    if (context.deleteTab) {
      context.deleteTab(index);
    }
  };

  // 首次加载时渲染content
  useEffect(() => {
    if (index === 0) {
      context.renderContent(children);
    }
  }, []);

  return (
    <li style={style} className={paneClasses} onClick={addHandleClick}>
      {tab}
      <button className={deleteClasses} onClick={deleteHandleClick}>
        ×
      </button>
    </li>
  );
};

TabPane.displayName = 'TabPane';
export default TabPane;
