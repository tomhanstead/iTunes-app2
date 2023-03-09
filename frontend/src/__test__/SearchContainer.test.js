import renderer from 'react-test-renderer';
import SearchContainer from '../components/search-section/SearchContainer';

test('should match SearchContainer snapshot', () => { 
   const tree = renderer.create(<SearchContainer/>).toJSON();

   expect(tree).toMatchSnapshot();
 })