import * as notificationActions from '../../../redux/actions/notifications';
import { bindConnect } from '../../../utils';
import Notifications from './Notifications';

export default bindConnect(state => ({
  notifications: state.notifications
}), {
  remove: notificationActions.remove
})(Notifications);
