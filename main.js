// "use strict";

const {
  app,
  nativeImage,
  Tray,
  Menu,
  BrowserWindow
} = require("electron");
const path = require('path');
var ipcMain = require('electron').ipcMain;
const Store = require('electron-store');
const FormData = require('form-data');
const store = new Store();
const hextoascii = require('hex2ascii')
const fs = require('fs');
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
var builder = require('xmlbuilder');
const numeral = require('numeral')
const https = require('https');
const vx55 = require('./phoropter_functions/vx_send_calc.js')
var ks = require('node-key-sender');
// const Buffer = require('buffer');
// const Buffer = new buffer();

let config = {};

var ref = "";
var phor = "";
var lm = "";
var processLensometer;
var processAK;

app.once("ready", ev => {
  config.win = new BrowserWindow({
    width: 1900,
    height: 950,
    center: true,
    minimizable: true,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      // sandbox: true,
    },
  });
  config.win.setMenuBarVisibility(false)
  config.win.loadFile("home.html");

  config.win2 = new BrowserWindow({
    width: 1600,
    height: 950,
    center: true,
    minimizable: true,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      // sandbox: true,
    },
  });
  config.win2.setMenuBarVisibility(false)
  config.win2.loadFile("./pages/patient.html");



  config.win.on("close", ev => {
    // ev.sender.hide();
    // ev.preventDefault();
    app.quit()
  });

  config.tray = new Tray(path.join(__dirname, 'asset', 'img', 'spongebob.png'));
  const menu = Menu.buildFromTemplate([{
      label: "ShowApp",
      click: (item, window, event) => {
        config.win.show();
      }
    },

    {
      type: "separator"
    },
    {
      role: "quit"
    },
  ]);

  config.tray.setToolTip("");
  config.tray.setTitle("EyeMax"); // macOS only
  config.tray.setContextMenu(menu);

  config.win.on('minimize', e => {
    // config.win.hide()
    // scanning();
  })
  config.win.on('hide', e => {
    // config.win.hide()
    // scanning();
  })
  // console.log(app.getPath('userData'))
  // sleep(1000)
  // config.win.hide()
  // scanning()



  // splitUrl = store.get('api_address').split('/')

  // https.request(
  //     {
  //       hostname: splitUrl[0],
  //       port: 443,
  //       path: '/'+ splitUrl[1] +'/'+ splitUrl[2] + '?api_token=' + store.get('api_token'),
  //       rejectUnauthorized: false,
  //       method: "GET",
  //       agent: false
  //     },
  //     res => {
  //       let data = ""
  //
  //       res.on("data", d => {
  //
  //         data += d
  //       })
  //       res.on("end", () => {
  //         ar = JSON.parse(data)
  //         // console.log(ar)
  //         ref = ar.ref
  //         phor = ar.phor
  //         lm = ar.lens
  //
  //         processLensometer = new Function("hextoascii","SerialPort", "Readline", "store", "numeral", "builder", "fs", lm)
  //         processLensometer(hextoascii, SerialPort, Readline, store, numeral, builder, fs)
  //         processAK = new Function("hextoascii","SerialPort", "Readline", "store", "numeral", "builder", "fs", ref)
  //         processAK(hextoascii, SerialPort, Readline, store, numeral, builder, fs)
  //       })
  //     }
  //   )
  //   .end()
  if (lmModel = store.get('lm_model')) {
    processLensometer = new Function("hextoascii", "SerialPort", "Readline", "store", "numeral", "builder", "fs", fs.readFileSync(path.join(__dirname, 'peripheral_functions', lmModel + '.js')))
    processLensometer(hextoascii, SerialPort, Readline, store, numeral, builder, fs)
  }

  if (arModel = store.get('ar_model')) {
    processAK = new Function("hextoascii", "SerialPort", "Readline", "store", "numeral", "builder", "fs", fs.readFileSync(path.join(__dirname, 'peripheral_functions', arModel + '.js')))
    processAK(hextoascii, SerialPort, Readline, store, numeral, builder, fs)
  }
  if (phorcom = store.get('phor_com')) {
    if (phorcom.includes(";")) {
      phorSplit = phorcom.split(';')
      phoropter = new SerialPort(phorSplit[0], {
        autoOpen: true,
        baudRate: parseInt(phorSplit[1]),
        dataBits: parseInt(phorSplit[2]),
        stopBits: parseInt(phorSplit[3]),
        parity: phorSplit[4]
      })
    } else {
      phoropter = new SerialPort(phorcom, {
        autoOpen: true
      })
      // var buffer = [0x01, 0x00, 0x2B, 0x01]
      // buffer[0] = 0xAA
      // buffer[1] = 0x01
      // buffer[2] = 0x00
      // buffer[3] = 0x2B
      // buffer[4] = 0x01
      // buffer[5] = 0x2B

      // console.log(buffer)
      // var xor;
      // for (i = 0; i < buffer.length; i++) {
      //   xor ^= parseInt(buffer[i])
      // }
      // console.log(vx55.xor(buffer))
      // phoropter.write(buffer)
    }
  }
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


app.on("before-quit", ev => {
  config.win.removeAllListeners("close");
  config = null;
});




//allow delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//check the designated folder and stop the loop while showing the app window from the tray
// async function scanning() {
//   while (true) {
//     console.log('scanning')
//     let formData = new FormData();
//     endPoint = store.get('api_address').split('/')
//     console.log('endpoint: ' + endPoint)
//     if (store.get('xml_path') != null) {
//       var files = fs.readdirSync(store.get('xml_path'));
//       //   if(files.length > 0){
//       //     fs.rename(store.get('xml_path') + "/" + files[0], store.get('xml_path') + "/encounter.xml", err => {
//       //     if (err) {
//       //       console.error(err)
//       //       return
//       //     }
//       //     })
//       //
//       //
//       //     formData.append("marco", fs.createReadStream(store.get('xml_path') + "/encounter.xml"));
//       //     var req = https.request(
//       //       {
//       //         hostname: endPoint[0],
//       //         port: 443,
//       //         path: '/'+ endPoint[1] +'/receive-marco-ar?api_token=' + store.get('api_token'),
//       //         rejectUnauthorized: false,
//       //         method: "POST",
//       //         agent: false,
//       //         headers: formData.getHeaders(),
//       //     },
//       //     response => {
//       //       console.log(response.statusCode); // 200
//       //     }
//       //   );
//       //
//       //   formData.pipe(req);
//       // }
//     }
//     await sleep(7000)
//   }
// }

subjectiveRX = {}
//start the scanning funciton again when the signal is received
ipcMain.on('phoropterChange', function (event, data) {
  phoropter.write(data)
  console.log(data)
});

finalRX = {}
ipcMain.on('finalRx', function (event, data) {
  if (currentPatient != "") {
    fs.writeFile(store.get('emr_export') + "/" + 'c-' + store.get('store_id') + "-" + currentPatient + "-" + Date.now() + '.txt', data.join(''), () => {
      console.log("done")
    })
  }
  // console.log(data)
  globalPeripheralData = {}
  currentPatient = ""
});

var currentPatient = ""
ipcMain.on('selectedPatient', function (event, data) {
  currentPatient = data
  console.log(currentPatient)
});

ipcMain.on('vision-change', function (event, status) {
  console.log(status)
  data = {
    numbers: randomIntFromInterval(0, 9),
    size: status.size,
    numbers2: randomIntFromInterval(0, 9),
    numbers3: randomIntFromInterval(0, 9),
    numbers4: randomIntFromInterval(0, 9),
    numbers5: randomIntFromInterval(0, 9),
    numbers6: randomIntFromInterval(0, 9)
  }
  // data = {
  //   size: status.size
  // }
  // switch (status.size.toString()) {
  //   case "10":
  //     data = {
  //       numbers: "TEN",
  //       refInfo: "CH09D",
  //       size: status.size
  //     }
  //     break;
  //   case "15":
  //     data = {
  //       numbers: "FIFTEEN",
  //       refInfo: "CH09C",
  //       size: status.size
  //     }
  //     break;
  //   case "20":
  //     data = {
  //       numbers: "TWENTY",
  //       refInfo: "CH09B",
  //       size: status.size
  //     }
  //     break;
  //   case "25":
  //     data = {
  //       numbers: "TWENTYFIVE",
  //       refInfo: "CH09A",
  //       size: status.size
  //     }
  //     break;
  //   case "30":
  //     data = {
  //       numbers: "THIRTY",
  //       refInfo: "CH099",
  //       size: status.size
  //     }
  //     break;
  //   case "40":
  //     data = {
  //       numbers: "FORTY",
  //       refInfo: "CH098",
  //       size: status.size
  //     }
  //     break;
  //   case "50":
  //     data = {
  //       numbers: "FIFTY",
  //       refInfo: "CH097",
  //       size: status.size
  //     }
  //     break;
  //   case "60":
  //     data = {
  //       numbers: "SIXTY",
  //       refInfo: "CH096",
  //       size: status.size
  //     }
  //     break;
  //   case "70":
  //     data = {
  //       numbers: "SEVENTY",
  //       refInfo: "CH095",
  //       size: status.size
  //     }
  //     break;
  //   case "80":
  //     data = {
  //       numbers: "EIGHTY",
  //       refInfo: "CH094",
  //       size: status.size
  //     }
  //     break;
  //   case "100":
  //     data = {
  //       numbers: "HUNDRED",
  //       refInfo: "CH093",
  //       size: status.size
  //     }
  //     break;
  //   case "200":
  //     data = {
  //       numbers: "TWO",
  //       refInfo: "CH092",
  //       size: status.size
  //     }
  //     break;
  //   case "300":
  //     data = {
  //       numbers: "THREE",
  //       refInfo: "CH091",
  //       size: status.size
  //     }
  //     break;
  //   case "400":
  //     data = {
  //       numbers: "FOUR",
  //       refInfo: "CH090",
  //       size: status.size
  //     }
  //     break;
  // }
  // console.log(data)
  config.win.webContents.send('vision-changed', data);
  config.win2.webContents.send('vision-changed', data);
});

// ipcMain.on('processInput', function(event, status) {
//   shouldScan = true
//   config.win.minimize()
//   // scanning()
// });

function randomIntFromInterval(min, max) { // min and max included
  var numbers = []
  while (numbers.length < 5) {
    cur = Math.floor(Math.random() * (max - min + 1) + min);
    if (!numbers.includes(cur)) {
      numbers.push(cur)
    }
  }
  return numbers;
}

globalPeripheralData = {}
ipcMain.on('updateLM', function (event, status) {
  globalPeripheralData.la01 = numeral(status.la01).format('+0.00')
  globalPeripheralData.la02 = numeral(status.la02).format('+0.00')
  globalPeripheralData.la03 = numeral(status.la03).format('000')
  globalPeripheralData.la04 = numeral(status.la04).format('+0.00')
  globalPeripheralData.la05 = numeral(status.la05).format('+0.00')
  globalPeripheralData.la06 = numeral(status.la06).format('+0.00')
  globalPeripheralData.la07 = numeral(status.la07).format('000')
  globalPeripheralData.la08 = numeral(status.la08).format('+0.00')
  console.log(globalPeripheralData)

  if ((globalPeripheralData.ar02 === null || globalPeripheralData.ar02 === undefined) || (globalPeripheralData.ar05 === null || globalPeripheralData.ar05 === undefined)) {
    globalPeripheralData.ar02 = numeral(status.ar02).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.ar03 = numeral(status.ar03).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.ar04 = numeral(status.ar04).format('000') ?? numeral("+0.00").format('000')
    globalPeripheralData.ar05 = numeral(status.ar05).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.ar06 = numeral(status.ar06).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.ar07 = numeral(status.ar07).format('000') ?? numeral("+0.00").format('000')
  }
});


ipcMain.on('updateAR', function (event, status) {
  globalPeripheralData.ar01 = numeral(status.ar01).format('00') ?? numeral("64").format('00')
  globalPeripheralData.ar02 = numeral(status.ar02).format('+0.00') ?? numeral("+0.00").format('+0.00')
  globalPeripheralData.ar03 = numeral(status.ar03).format('+0.00') ?? numeral("+0.00").format('+0.00')
  globalPeripheralData.ar04 = numeral(status.ar04).format('000') ?? numeral("+0.00").format('000')
  globalPeripheralData.ar05 = numeral(status.ar05).format('+0.00') ?? numeral("+0.00").format('+0.00')
  globalPeripheralData.ar06 = numeral(status.ar06).format('+0.00') ?? numeral("+0.00").format('+0.00')
  globalPeripheralData.ar07 = numeral(status.ar07).format('000') ?? numeral("+0.00").format('000')

  if ((globalPeripheralData.la01 === null || globalPeripheralData.la01 === undefined) || (globalPeripheralData.la04 === null || globalPeripheralData.la04 === undefined)) {
    globalPeripheralData.la01 = numeral(status.la01).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.la02 = numeral(status.la02).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.la03 = numeral(status.la03).format('000') ?? numeral("+0.00").format('000')
    globalPeripheralData.la04 = numeral(status.la04).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.la05 = numeral(status.la05).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.la06 = numeral(status.la06).format('+0.00') ?? numeral("+0.00").format('+0.00')
    globalPeripheralData.la07 = numeral(status.la07).format('000') ?? numeral("+0.00").format('000')
    globalPeripheralData.la08 = numeral(status.la08).format('+0.00') ?? numeral("+0.00").format('+0.00')
  }

  if (status.ar08 != null || status.ar10 != null) {
    globalPeripheralData.ar08 = status.ar08
    globalPeripheralData.ar09 = status.ar09
    globalPeripheralData.ar12 = status.ar12
    globalPeripheralData.ar13 = status.ar13
    globalPeripheralData.ar10 = status.ar10
    globalPeripheralData.ar11 = status.ar11
    globalPeripheralData.ar14 = status.ar14
    globalPeripheralData.ar15 = status.ar15
  }
  console.log(globalPeripheralData)
});
ipcMain.on('updateKM', function (event, status) {
  if (status.la01 != null || status.la05 != null) {
    globalPeripheralData.ar08 = status.ar08
    globalPeripheralData.ar09 = status.ar09
    globalPeripheralData.ar12 = status.ar12
    globalPeripheralData.ar13 = status.ar13
    globalPeripheralData.ar10 = status.ar10
    globalPeripheralData.ar11 = status.ar11
    globalPeripheralData.ar14 = status.ar14
    globalPeripheralData.ar15 = status.ar15
  }
  console.log(globalPeripheralData)
});

ipcMain.on('getGlobalPeripheral', () => {
  // console.log(status)
  config.win.webContents.send('globalRequestResponse', globalPeripheralData);
})

ipcMain.on('sendKeyPress', function(event, data){
  console.log(data)
  config.win.webContents.sendInputEvent({type : 'keyDown', keyCode : data});
})