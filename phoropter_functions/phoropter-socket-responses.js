// const Pusher = require('pusher-js');
const fs = require('fs');
var ipcRenderer = require('electron').ipcRenderer;

function ascii_to_hexa(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push("%" + hex);
  }
  return arr1.join("");
}




function masterMarcoPhoropter(data) {
  send_to_phor = "";
  converted_hex = "";

  for (const [key, value] of Object.entries(data.refInfo)) {
    if (value != null) {
      converted_hex += ascii_to_hexa(value) + "%0d";
    }
  }

  send_to_phor = "%01%44%52%54%02" + converted_hex + "%04";

  console.log(data.refInfo);
  // console.log(converted_hex);
  // console.log(send_to_phor);
  // serialDevices[1].write(decodeURIComponent(send_to_phor));
  ipcRenderer.send('phoropterChange', decodeURIComponent(send_to_phor));
}



//
//   channel.bind('App\\Events\\AddEncounter', function(data) {
//         // console.log("fired encounter event: " + data);
//         for (i = 0; i < 43; i++) {
//             if (data.finalInfo[i] == null) {
//                 data.finalInfo[i] = "\t\t";
//             } else {
//                 data.finalInfo[i] += "\t";
//             }
//         }
//         // console.log(data.finalInfo);
//
//         $.ajax({
//             url: "https://eyemax.test/encounter-complete",
//             type: "POST",
//             data: {
//                 encounter: data.encounter,
//                 finalInfo: data.finalInfo
//             },
//             success: function(returnedData) {
//                 console.log(returnedData);
//                 if (returnedData == "saved") {
//                   fs.writeFile('C:\\Users\\lines\\OneDrive\\Desktop\\c-DS001111-'+data.encounter+'.txt', data.finalInfo, function (err) {
//                     if (err) return console.log(err);
//                     console.log('written');
//                   });
//
//                     $("#lmInfo, #kmInfo, #arInfo, #ptInfo").html(
//                         "No Data Selected"
//                     );
//                     $("#pat-button, #ar-button, #lm-button, #km-button")
//                         .removeClass("btn-success")
//                         .addClass("btn-danger");
//                     $("#pt_id").val("");
//                 } else {
//                     alert("Could not save encounter");
//                 }
//             },
//             error: function() {
//                 alert("Could not save encounter");
//             }
//         });
//     }
// );