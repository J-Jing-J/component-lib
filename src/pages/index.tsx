import styles from './index.less';
import '../styles/index.scss'
import Button, { ButtonType, ButtonSize } from '@/components/Button/button';

export default function IndexPage() {
  return (
    <div>


      <Button disabled>Hello</Button>
      <Button btnType={'primary'} size={'lg'}>Hello</Button>
      <Button btnType={'link'} href="www.baidu.com">Hello</Button>
    </div>
  );
}
