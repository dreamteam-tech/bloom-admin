import { bindConnect } from '../../utils';
import UserTable from './UserTable';
import * as userActions from '../../redux/actions/user';
import * as notificationActions from '../../redux/actions/notifications';

export default bindConnect(state => ({
  loading: Boolean(state.user_list.pending) || !state.user_list.data,
  ...(state.user_list.data || { meta: {}, objects: [] })
}), {
  fetch: userActions.list,
  remove: userActions.remove,
  admin: userActions.admin,
  partner: userActions.partner,
  notification: notificationActions.add
})(UserTable);
