import Sidebar from '@/components/Sidebar';
import { AuthUser } from '@/model/user';
import { render } from '@testing-library/react';

describe('Component Test', () => {
  const user: AuthUser = {
    username: 'test',
    email: 'test@gmail.com',
    name: 'test',
    id: '1234',
    image: undefined,
  };
  it('Sidebar render test', () => {
    const { container } = render(<Sidebar user={user} />);
    expect(container).toMatchSnapshot();
  });
});
