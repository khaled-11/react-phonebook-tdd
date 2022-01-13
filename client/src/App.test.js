import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const wrapper = shallow(<App />)

describe('app testing', () =>{
  test('heading', () => {
    expect(wrapper.find('h1').text()).toContain("PhoneBook Tutorial")
  })
  test('table', () => {
    expect(wrapper.find('table').text()).toContain("PhoneBook Tutorial")
  })
})
