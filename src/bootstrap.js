import 'regenerator-runtime/runtime';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ru';

moment.locale('ru');

// if (process.env.NODE_ENV === 'production') {
//     Raven
//         .config('https://f7c9960b5b054a67911819d2b6bde6bf@sentry.io/1216064', {
//             release: require('../package').version,
//             environment: process.env.NODE_ENV,
//         })
//         .install();
// }
