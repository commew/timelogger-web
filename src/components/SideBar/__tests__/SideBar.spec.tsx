import { render } from '@testing-library/react';
import { SideBar } from '@/components';

// まだ参照しているデータがmockなので、一旦、テストケースをskipしてます。
// 確認したい観点だけ定義してます。
describe('src/components/SideBar/SideBar.tsx TestCases', () => {
  it.skip('should display the link label', () => {
    render(<SideBar />);
  });
  it.skip('toggles group categories on click', () => {
    render(<SideBar />);
  });
});
