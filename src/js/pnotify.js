import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

function notification(text) {
  info({
    title: 'Запрос не точен',
    text: `${text}`,
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close(500);
              },
            },
          ],
        },
      ],
    ]),
  });
}


export default notification;
