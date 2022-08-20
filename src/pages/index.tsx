import styles from './index.less';
import '../styles/index.scss';
import Button, { ButtonType, ButtonSize } from '@/components/Button/button';
import Menu from '@/components/Menu/menu';
import MenuItem from '@/components/Menu/menuItem';
import SubMenu from '@/components/Menu/subMenu';
import TabPane from '@/components/Tab/tabPane';
import Tab from '@/components/Tab/tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IndexPage() {
  return (
    <div>
      {/* <Tab type={'editable-card'}>
        <TabPane tab={'tab 1'}>tab1 content</TabPane>
        <TabPane disabled tab={'tab 2'}>
          tab2 content
        </TabPane>
        <TabPane tab={'tab 3'}>tab3 content</TabPane>
      </Tab>

      <Tab style={{ marginTop: '5rem' }} mode="vertical">
        <TabPane tab={'tab 1'}>tab1 content</TabPane>
        <TabPane tab={'tab 2'}>tab2 content</TabPane>
        <TabPane tab={'tab 3'}>tab3 content</TabPane>
      </Tab> */}

      <Menu mode="vertical">
        <MenuItem>link</MenuItem>
        <MenuItem>link</MenuItem>
        <MenuItem>link</MenuItem>
        <SubMenu title="shahks">
          <MenuItem>link</MenuItem>
          <MenuItem>link</MenuItem>
          <MenuItem>link</MenuItem>
        </SubMenu>
      </Menu>

      {/* <Button disabled>Hello</Button>
      <Button btnType={'primary'} size={'lg'}>
        Hello
      </Button>
      <Button btnType={'link'} href="www.baidu.com">
        Hello
      </Button> */}
    </div>
  );
}
