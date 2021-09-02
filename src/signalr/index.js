import {HubConnectionBuilder} from '@microsoft/signalr';

export const openSignalRConnection = () => {
  const connect = new HubConnectionBuilder()
    .withUrl('https://spredocker.viasatelematics.com/realtime-api/realtime')
    .withAutomaticReconnect()
    .build();

  connect
    .start()
    .then(() => {
      console.log('CONECTADO');
    })
    .catch(error => {
      return console.error(error);
    });

  connect.on('SendNotification', function (notification) {
    console.log(notification);
  });
};
