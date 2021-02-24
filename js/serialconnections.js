var serialDevices = [];

function serialConnect(id, but) {
    serialDevices[id] = new SerialLEDController();
    serialDevices[id].init(but);
    console.log(serialDevices);
}
