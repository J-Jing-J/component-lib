import classNames from 'classnames';
import React, { useState, createContext, Fragment, useEffect } from 'react';
import TabPane, { TabPaneProps } from './tabPane';

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
  renderContent: (children: any) => void;
  deleteTab?: (index: number) => void;
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
  const isEditable: boolean = type === 'editable-card';
  const ContentClasses = classNames('content', {});
  const containerClasses = classNames('TabContainer', {
    'container-vertical': mode === 'vertical',
  });
  const addClasses = classNames('tab-pane', 'add-pane', {});

  const handleClick = (index: number) => {
    // 设置高亮
    setCurrentActive(index);
    // 用户自定义操作
    if (onChange) {
      onChange(index);
    }
  };

  const deleteClick = (index: number) => {
    console.log(index);
    const tempPanes = [...tabPane];
    tempPanes.splice(index, 1);
    setTabPane(tempPanes);
  };

  const [tabContent, setTabContent] = useState();

  // 接收子组件传来的文字，并渲染在content区
  const renderContent = (children: any) => {
    setTabContent(children);
  };

  const passContext: ITabContext = {
    index: currentActive ? currentActive : 0,
    onChange: handleClick,
    renderContent: renderContent,
    deleteTab: deleteClick,
  };

  // 获取index最大值
  const useIndexNum = () => {
    let tempNum = 0;
    React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabPaneProps>;
      const { displayName } = childElement.type;
      if (displayName === 'TabPane') {
        tempNum += 1;
      }
    });
    return tempNum - 1;
  };

  const [paneNum, setPaneNum] = useState(useIndexNum);

  // 筛选出是TabPane的元素渲染，其他元素警告
  const renderTab = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabPaneProps>;
      const { displayName } = childElement.type;
      const tempArr = [];
      if (displayName === 'TabPane') {
        tempArr.push(
          React.cloneElement(childElement, {
            index,
          }),
        );
      } else {
        console.error('Warning: Tab组件中只显示TabPane组件');
      }
      return tempArr;
    });
  };

  // const [paneNum, setPaneNum] = useState(useIndexNum());
  const [tabPane, setTabPane] = useState<any>(renderTab());

  const addClick = () => {
    // const totalNum = useIndexNum();
    setTabPane([
      ...tabPane,
      <TabPane index={paneNum + 1} tab="New">
        New Tab Content
      </TabPane>,
    ]);
    console.log(paneNum + 1);
    setPaneNum((paneNum) => paneNum + 1);
  };

  // useEffect(() => { renderTab() }, [])

  return (
    <div className={containerClasses} style={style}>
      <TabContext.Provider value={passContext}>
        <ul className={TabClasses}>
          {/* {renderTab()} */}
          {/* {children} */}
          {tabPane?.map((item: Element) => item)}
          {isEditable ? (
            <li className={addClasses} onClick={addClick}>
              +
            </li>
          ) : null}
        </ul>
        <div className={ContentClasses}>{tabContent}</div>
      </TabContext.Provider>
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
