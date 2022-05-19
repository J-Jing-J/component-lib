import styles from './index.less';
import '../styles/index.scss';
import Button, { ButtonType, ButtonSize } from '@/components/Button/button';
import Menu from '@/components/Menu/menu';
import MenuItem from '@/components/Menu/menuItem';
import TabPane from '@/components/Tab/tabPane';
import Tab from '@/components/Tab/tab';

export default function IndexPage() {
  return (
    <div>
      <Tab mode="vertical">
        <TabPane tab={'tab 1'}>tab1 content</TabPane>
        <TabPane tab={'tab 2'}>tab2 content</TabPane>
        <TabPane tab={'tab 3'}>tab3 content</TabPane>
      </Tab>

      <Menu>
        <MenuItem>link</MenuItem>
        <MenuItem>link</MenuItem>
        <MenuItem>link</MenuItem>
      </Menu>

      <Button disabled>Hello</Button>
      <Button btnType={'primary'} size={'lg'}>
        Hello
      </Button>
      <Button btnType={'link'} href="www.baidu.com">
        Hello
      </Button>
    </div>
  );
}
