import { bindConnect } from '../../utils';
import UserSelect from './UserSelect';
import * as userActions from '../../redux/actions/user';

export default bindConnect(state => ({
  objects: state.user_options.data,
  loading: Boolean(state.user_options.pending) || !state.user_options.data
}), {
  fetch: userActions.options
})(UserSelect);
