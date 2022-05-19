import classNames from 'classnames';
import React, { useState, createContext } from 'react';
import { TabPaneProps } from './tabPane';

type TabMode = 'horizontal' | 'vertical';
type TabType = 'line' | 'card' | 'editable-card';
type TabSize = 'large' | 'default' | 'small';
type ChangeCallback = (changeIndex: number) => void;

export interface TabProps {
  defaultIndex?: number; //默认被高亮的
  className?: string;
  centered?: boolean; //标签居中展示
  size?: TabSize;
  mode?: TabMode;
  type?: TabType;
  style?: React.CSSProperties;
  onChange?: ChangeCallback;
}

interface ITabContext {
  index: number;
  onChange?: ChangeCallback;
  // children?: React.ReactNode,
  renderContent: (children: any) => void;
}

export const TabContext = createContext<ITabContext>({
  index: 0,
  renderContent: (children: any) => {},
});

const Tab: React.FC<TabProps> = (props) => {
  const {
    className,
    centered,
    mode,
    style,
    children,
    defaultIndex,
    onChange,
    type,
  } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const TabClasses = classNames('tab', className, {
    // 默认的mode为horizontal 和 line
    'is-vertical': mode === 'vertical',
    'is-card': type === 'card',
    'is-editable-card': type === 'editable-card',
  });
  const ContentClasses = classNames('content', {});
  const containerClasses = classNames('TabContainer', {});
  const handleClick = (index: number) => {
    // 设置高亮
    setCurrentActive(index);
    // 用户自定义操作
    if (onChange) {
      onChange(index);
    }
  };

  const [tabContent, setTabContent] = useState();
  const renderContent = (children: any) => {
    setTabContent(children);
  };

  const passContext: ITabContext = {
    index: currentActive ? currentActive : 0,
    onChange: handleClick,
    // children: children ? children : 'New Tab Content',
    renderContent: renderContent,
  };

  const renderTab = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabPaneProps>;
      const { displayName } = childElement.type;
      if (displayName === 'TabPane') {
        // 为TabPane添加index属性
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error(
          'Warning: Tab has a child which is not a TabPane Component',
        );
      }
    });
  };

  return (
    <div className={containerClasses}>
      <ul className={TabClasses} style={style}>
        <TabContext.Provider value={passContext}>
          {/* {children} */}
          {renderTab()}
        </TabContext.Provider>
      </ul>
      <div className={ContentClasses}>{tabContent}</div>
    </div>
  );
};

Tab.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  type: 'line',
  size: 'default',
};

export default Tab;
