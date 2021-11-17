import * as signalR from '@microsoft/signalr';

export const setUpSignalRConnection = async serialNumber => {
  console.log('%cCONECTANDO DISPOSITIVO A RT:', 'color:olive', serialNumber);
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://viasatst-api.viasatelematics.com/realtime/realtime')
    .configureLogging(signalR.LogLevel.Warning)
    .build();

  hubConnection.on('ReceiveVehicleRealTime', message => {
    const parsedMessage = JSON.parse(message);
    console.log('%cReceiveVehicleRealTime:', 'color:magenta', parsedMessage);
    return parsedMessage;
  });

  hubConnection.on('ReceiveNotification', message => {
    console.log('%cReceiveNotification:', 'color: white', message);
  });

  // Starts the SignalR connection
  hubConnection.start().then(a => {
    // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    if (hubConnection.connectionId) {
      hubConnection
        .invoke('SubscribeToVehicle', serialNumber.toString())
        .catch(error => console.log('ERROR', error));
    }
  });
};
