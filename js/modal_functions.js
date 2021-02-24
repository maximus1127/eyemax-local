// global ajax setup

// end global ajax setup
var numeral = require('numeral');
var moment = require('moment');

// pt info selection
available_encounters = [];

function ptModal() {

  // $.ajax({
  //   url: "https://eyemax.test/get-active-encounters",
  //   type: "get",
  //   data: {
  //     location: "DS001111"
  //   },
  //   success: function(data) {
  //     $("#ptInfoBody tr").remove();
  //     $(data).each(function(d) {
  //       available_encounters[d] = this;
  //       $("#ptInfoBody").append(`
  //           <tr ondblclick="selectPt(${d})">
  //           <td>${this.pt_name}</td>
  //             <td id="pt_id">${this.pt_id}</td>
  //           </tr>
  //           `);
  //     });
  //   }
  // });
  $(".ptrows").remove();
  var files = fs.readdirSync(store.get('emr_import'));
  if (files.length > 0) {
    $(files).each(function (file) {
      // console.log(!path.basename(store.get('emr_import') + '/' + files[file]).includes('complete'))
      if (!path.basename(store.get('emr_import') + '/' + files[file]).includes('complete') == true) {
        fs.readFile(store.get('emr_import') + '/' + files[file], function (err, data) {
          dataSplit = data.toString().split('\n')
          available_encounters[file] = {}
          available_encounters[file].pt_name = dataSplit[2].split('|')[2].replace('^', ', ')
          available_encounters[file].pt_id = dataSplit[2].split('|')[1]
          available_encounters[file].filename = thisFile = path.basename(store.get('emr_import') + '/' + files[file])

          // console.log(result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OD"][0]['Sphere_OD']);
          $("#ptInfoBody").append(`
           <tr ondblclick="selectPt(${file})" class="ptrows">
           <td>${available_encounters[file].pt_name}</td>
             <td id="pt_id">${available_encounters[file].pt_id}</td>
           </tr>
           `);

        });
      }
    })
  }
  $("#ptInfoModal").modal("show");
}

function selectPt(en) {
  e = available_encounters[en];
  $("#ptInfo").html(`${e.pt_name} <br> ${e.pt_id}`);
  $("#encounter_number").val(`${e.pt_id}`);
  $("#pat-button").removeClass("btn-danger");
  $("#pat-button").addClass("btn-success");
  fs.rename(store.get('emr_import') + '/' + e.filename, store.get('emr_import') + '/complete-' + e.filename, () => {
    $("#ptInfoModal").modal("hide");
  })
  ipc.send('selectedPatient', e.pt_id);
}

function enterManualPt() {
  var pt = prompt("Enter Encounter Number");
  $.ajax({
    url: "https://eyemax.test/api/new-encounter",
    type: "post",
    data: {
      location: "DS001111",
      pt_id: pt,
      pt_name: ""
    },
    success: function () {
      $("#ptInfo").html(`${pt}`);
      $("#encounter_number").val(`${pt}`);
      $("#pat-button").removeClass("btn-danger");
      $("#pat-button").addClass("btn-success");
      $("#ptInfoModal").modal("hide");
    }
  });
}

// end patient info selection

// autorefractor selection

available_ars = [];

function autorefractorModal() {
  // $.ajax({
  //     url: "https://eyemax.test/get-unassigned-ar",
  //     type: "get",
  //     data: {
  //         location: "DS001111"
  //     },
  //     success: function(data) {
  //         //            console.log(data)
  //         $("#autorefractorBody tr").remove();
  //         $(data).each(function(d) {
  //             console.log(this);
  //             available_ars[d] = this;
  //             $("#autorefractorBody").append(`
  //                 <tr ondblclick="selectAr(${d})">
  //                   <td>${moment(this.created_at).format("LLL")}</td>
  //                   <td>OD: <span id="ar_sph_od">${numeral(
  //                       this.ar02
  //                   ).format(
  //                       "+0.00"
  //                   )}</span> <span id="ar_cyl_od">${numeral(this.ar03).format("0.00")}</span> x <span id="ar_axis_od">${numeral(this.ar04).format("000")}</span><br>OS: <span id="ar_sph_os">${numeral(this.ar05).format("+0.00")}</span> <span id = "ar_cyl_os">${numeral(this.ar06).format("0.00")}</span> x <span id="ar_axis_os">${numeral(this.ar07).format("000")}</span></td>
  //                 </tr>
  //                 `);
  //         });
  //     }
  // });

  $(".arrows").remove();
  var parser = new xml2js.Parser();
  var files = fs.readdirSync(store.get('xml_path') + '\\new');
  if (files.length > 0) {
    $(files).each(function (file) {

      if (path.basename(store.get('xml_path') + '/new/' + files[file]).includes('ar')) {
        fs.readFile(store.get('xml_path') + '/new/' + files[file], function (err, data) {
          parser.parseString(data, function (err, result) {
            // console.log(result)
            available_ars[file] = {}
            odlm = result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OD"][0] ?? null
            oslm = result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OS"][0] ?? null
            odar = result["MarcoData-XML"]['DataSet'][0]["RM_Data_OD"][0] ?? null
            osar = result["MarcoData-XML"]['DataSet'][0]["RM_Data_OS"][0] ?? null
            odak = result["MarcoData-XML"]['DataSet'][0]["KM_Data_OD"][0] ?? null
            osak = result["MarcoData-XML"]['DataSet'][0]["KM_Data_OS"][0] ?? null
            // if (oslm || odlm) {

            available_ars[file].la01 = odlm['Sphere_OD'][0].replace(' ', '')
            available_ars[file].la02 = odlm['Cylinder_OD'][0].replace(' ', '')
            available_ars[file].la03 = odlm['Axis_OD'][0].replace(' ', '')
            available_ars[file].la04 = odlm['Add_OD'][0].replace(' ', '')
            available_ars[file].la05 = oslm['Sphere_OS'][0].replace(' ', '')
            available_ars[file].la06 = oslm['Cylinder_OS'][0].replace(' ', '')
            available_ars[file].la07 = oslm['Axis_OS'][0].replace(' ', '')
            available_ars[file].la08 = oslm['Add_OS'][0].replace(' ', '')
            // }
            // if (osar || odar) {

            available_ars[file].ar02 = odar['Sphere_OD'][0].replace(' ', '')
            available_ars[file].ar03 = odar['Cylinder_OD'][0].replace(' ', '')
            available_ars[file].ar04 = odar['Axis_OD'][0].replace(' ', '')
            available_ars[file].ar05 = osar['Sphere_OS'][0].replace(' ', '')
            available_ars[file].ar06 = osar['Cylinder_OS'][0].replace(' ', '')
            available_ars[file].ar07 = osar['Axis_OS'][0].replace(' ', '')
            // }
            // if (osak || odak) {

            available_ars[file].ar08 = odak['KM_Diopt_R1_OD'][0].replace(' ', '')
            available_ars[file].ar09 = odak['KM_mm_FlatAXS_OD'][0].replace(' ', '')
            available_ars[file].ar12 = odak['KM_Diopt_R2_OD'][0].replace(' ', '')
            available_ars[file].ar13 = odak['KM_mm_SteepAXIS_OD'][0].replace(' ', '')
            available_ars[file].ar10 = osak['KM_Diopt_R1_OS'][0].replace(' ', '')
            available_ars[file].ar11 = osak['KM_mm_FlatAXS_OS'][0].replace(' ', '')
            available_ars[file].ar14 = osak['KM_Diopt_R2_OS'][0].replace(' ', '')
            available_ars[file].ar15 = osak['KM_mm_SteepAXIS_OS'][0].replace(' ', '')
            available_ars[file].filename = thisFile = path.basename(store.get('xml_path') + '/new/' + files[file]);

            // }
            // console.log(result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OD"][0]['Sphere_OD']);
            $("#autorefractorBody").append(`
            <tr ondblclick="selectAr(${file})" class="arrows">
                          <td>Coming Soon</td>
                           <td>OD: <span id="ar_sph_od">${numeral(available_ars[file].ar02).format("+0.00")}</span> <span id="ar_cyl_od">${numeral(available_ars[file].ar03).format("0.00")}</span> x <span id="ar_axis_od">${numeral(available_ars[file].ar04).format("000")}</span><br>OS: <span id="ar_sph_os">${numeral(available_ars[file].ar05).format("+0.00")}</span> <span id = "ar_cyl_os">${numeral(available_ars[file].ar06).format("0.00")}</span> x <span id="ar_axis_os">${numeral(available_ars[file].ar07).format("000")}</span></td>
                         </tr>
                                  `);
          });
        });
      }
    })
  }
  $("#autorefractorModal").modal("show");

}

function selectAr(ar) {
  e = available_ars[ar];
  $("#arInfo").html(
    `OD: <span id="ar_sph_od">${numeral(e.ar02).format(
            "+0.00"
        )}</span> <span id="ar_cyl_od">${numeral(e.ar03).format(
            "0.00"
        )}</span> x <span id="ar_axis_od">${numeral(e.ar04).format(
            "000"
        )}</span>
        <br>
        OS: <span id="ar_sph_os">${numeral(e.ar05).format(
            "+0.00"
        )}</span> <span id = "ar_cyl_os">${numeral(e.ar06).format(
            "0.00"
        )}</span> x <span id="ar_axis_os">${numeral(e.ar07).format(
            "000"
        )}</span>`
  );
  $("#ar-button").removeClass("btn-danger");
  $("#ar-button").addClass("btn-success");

  if (e.la01 || e.la05 || e.la04 || e.la08) {
    $("#lmInfo").html(
      `OD: <span id="lm_sph_od">${numeral(e.la01).format(
                "+0.00"
            )}</span> <span id="lm_cyl_od">${numeral(e.la02).format(
                "0.00"
            )}</span> x <span id="lm_axis_od">${numeral(e.la03).format(
                "000"
            )}</span>
        <br>
        <span id="lm_add_od">Add: ${numeral(e.la04).format("+0.00")}</span>
        <br>
        OS: <span id="ar_sph_os">${numeral(e.la05).format(
            "+0.00"
        )}</span> <span id = "ar_cyl_os">${numeral(e.la06).format(
                "0.00"
            )}</span> x <span id="ar_axis_os">${numeral(e.la07).format(
                "000"
            )}</span>
        <br>
        <span id="lm_add_os">Add: ${numeral(e.la08).format("+0.00")}</span>`
    );

    $("#lm-button").removeClass("btn-danger");
    $("#lm-button").addClass("btn-success");
  }

  if (e.ar08 || e.ar10) {
    $("#kmInfo").html(
      `OD: <span id="km_flat_od">${numeral(e.ar08).format(
                "00.00"
            )}</span> x <span id="km_flat_axis_od">${numeral(e.ar09).format(
                "000"
            )}</span> / <span id="km_steep_od">${numeral(e.ar12).format(
                "00.00"
            )}</span> x <span id="km_steep_axis_od">${numeral(e.ar13).format(
                "000"
            )}</span>
            <br>
            OS: <span id="km_flat_os">${numeral(e.ar10).format(
                "00.00"
            )}</span> x <span id="km_flat_axis_os">${numeral(e.ar11).format(
                "000"
            )}</span> / <span id="km_steep_os">${numeral(e.ar14).format(
                "00.00"
            )}</span> x <span id="km_steep_axis_os">${numeral(e.ar15).format(
                "000"
            )}</span>
      `
    );

    $("#km-button").removeClass("btn-danger");
    $("#km-button").addClass("btn-success");
  }
    if(ar != "man"){
    fs.rename(store.get('xml_path') + '/new/' + e.filename, store.get('xml_path') + '/' + e.filename, () => {
      ipc.send('updateAR', available_ars[ar]);
      $("#autorefractorModal").modal("hide");
    })
  }
  console.log(e);
  // $.ajax({
  //     url: "https://eyemax.test/assign-ar",
  //     type: "post",
  //     data: {
  //         ar: e,
  //         patient: $("#encounter_number").val()
  //     },
  //     success: function() {
  //         // console.log("accepted manual ar");
  //         $("#ar-button").removeClass("btn-danger");
  //         $("#ar-button").addClass("btn-success");
  //         $("#autorefractorModal").modal("hide");
  //     }
  // });
}

function enterManualAr() {
  if ($(".manualAr").length == 0) {
    $("#autorefractorBody").append(`
      <tr class="manualAr">
        <td></td>
        <td>
          OD: ${sphereSelect("manual_ar_sphere_od")} -${cylSelect(
            "manual_ar_cyl_od"
        )} x ${axisSelect("manual_ar_axis_od")}
          <br><br>
          OS: ${sphereSelect("manual_ar_sphere_os")} -${cylSelect(
            "manual_ar_cyl_os"
        )} x ${axisSelect("manual_ar_axis_os")}
        </td>
      </tr>
      `);
  }
}

function acceptManualAr() {
  available_ars["man"] = {};
  available_ars["man"] = {
    ar02: $("#manual_ar_sphere_od").val(),
    ar03: $("#manual_ar_cyl_od").val(),
    ar04: $("#manual_ar_axis_od").val(),
    ar05: $("#manual_ar_sphere_os").val(),
    ar06: $("#manual_ar_cyl_os").val(),
    ar07: $("#manual_ar_axis_os").val()
  };

  console.log(available_ars['man'])
  selectAr("man");
  ipc.send('updateAR', available_ars['man']);
  $("#autorefractorModal").modal("hide");
}

// end auto refractor selections

//lensometer section

available_lms = [];

function autolensometerModal() {
  // $.ajax({
  //   url: "https://eyemax.test/get-unassigned-lm",
  //   type: "get",
  //   data: {
  //     location: "DS001111"
  //   },
  //   success: function(data) {
  //     //            console.log(data)
  //     $("#autolensometerBody tr").remove();
  //     $(data).each(function(d) {
  //       console.log(this);
  //       available_lms[d] = this;
  //       $("#autolensometerBody").append(`
  //                       <tr ondblclick="selectLm(${d})">
  //                         <td>${moment(this.created_at).format("LLL")}</td>
  //                         <td>OD: <span id="lm_sph_od">${numeral(
  //                             this.la01
  //                         ).format(
  //                             "+0.00"
  //                         )}</span> <span id="lm_cyl_od">${numeral(this.la02).format("0.00")}</span> x <span id="lm_axis_od">${numeral(this.la03).format("000")}</span> <span id="lm_add_od"> Add: ${numeral(this.la04).format("+0.00")}</span><br>OS: <span id="lm_sph_os">${numeral(this.la05).format("+0.00")}</span> <span id = "lm_cyl_os">${numeral(this.la06).format("0.00")}</span> x <span id="lm_axis_os">${numeral(this.la07).format("000")}</span><span id="lm_add_os"> Add: ${numeral(this.la08).format("+0.00")}</span></td>
  //                       </tr>
  //                       `);
  //     });
  //   }
  // });
  $(".lmrows").remove();
  var parser = new xml2js.Parser();
  var files = fs.readdirSync(store.get('xml_path') + '\\new');
  if (files.length > 0) {

    $(files).each(function (file) {

      if (path.basename(store.get('xml_path') + '/new/' + files[file]).includes('lm')) {
        fs.readFile(store.get('xml_path') + '/new/' + files[file], function (err, data) {
          parser.parseString(data, function (err, result) {
            od = result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OD"][0]
            os = result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OS"][0]
            available_lms[file] = {}
            available_lms[file].la01 = od['Sphere_OD'][0]
            available_lms[file].la02 = od['Cylinder_OD'][0]
            available_lms[file].la03 = od['Axis_OD'][0]
            available_lms[file].la04 = od['Add_OD'][0]
            available_lms[file].la05 = os['Sphere_OS'][0]
            available_lms[file].la06 = os['Cylinder_OS'][0]
            available_lms[file].la07 = os['Axis_OS'][0]
            available_lms[file].la08 = os['Add_OS'][0]
            available_lms[file].filename = thisFile = path.basename(store.get('xml_path') + '/new/' + files[file])

            // console.log(result["MarcoData-XML"]['DataSet'][0]["Presenting_Data_OD"][0]['Sphere_OD']);
            $("#autolensometerBody").append(`
                                  <tr ondblclick="selectLm(${file})" class="lmrows">
                                    <td>${thisFile}</td>
                                    <td>OD: <span id="lm_sph_od">${numeral(
                                        available_lms[file].la01
                                    ).format(
                                        "+0.00"
                                    )}</span> <span id="lm_cyl_od">${numeral(available_lms[file].la02).format("0.00")}</span> x <span id="lm_axis_od">${numeral(available_lms[file].la03).format("000")}</span> <span id="lm_add_od">
                                    Add: ${numeral(available_lms[file].la04).format("+0.00")}</span><br>OS: <span id="lm_sph_os">${numeral(available_lms[file].la05).format("+0.00")}</span> <span id = "lm_cyl_os">${numeral(available_lms[file].la06).format("0.00")}</span> x <span id="lm_axis_os">${numeral(available_lms[file].la07).format("000")}
                                    </span><span id="lm_add_os"> Add: ${numeral(available_lms[file].la08).format("+0.00")}</span></td>
                                  </tr>
                                  `);
          });
        });
      }
    })
  }
  $("#autolensometerModal").modal("show");
}

function selectLm(lm) {
  e = available_lms[lm];
  $("#lmInfo").html(
    `OD: <span id="lm_sph_od">${numeral(e.la01).format(
            "+0.00"
        )}</span> <span id="lm_cyl_od">${numeral(e.la02).format(
            "0.00"
        )}</span> x <span id="lm_axis_od">${numeral(e.la03).format(
            "000"
        )}</span>
        <br>
        <span id="lm_add_od">Add: ${numeral(e.la04).format("+0.00")}</span>
        <br>
        OS: <span id="ar_sph_os">${numeral(e.la05).format(
            "+0.00"
        )}</span> <span id = "ar_cyl_os">${numeral(e.la06).format(
            "0.00"
        )}</span> x <span id="ar_axis_os">${numeral(e.la07).format(
            "000"
        )}</span>
        <br>
        <span id="lm_add_os">Add: ${numeral(e.la08).format("+0.00")}</span>`
  );

  $("#lm-button").removeClass("btn-danger");
  $("#lm-button").addClass("btn-success");
  fs.rename(store.get('xml_path') + '/new/' + e.filename, store.get('xml_path') + '/' + e.filename, () => {
    ipc.send('updateLM', available_lms[lm]);
    $("#autolensometerModal").modal("hide");
  })

}

function enterManualLm() {
  if ($(".manualLm").length == 0) {
    $("#autolensometerBody").append(`
      <tr class="manualLm">
        <td></td>
        <td>
          OD: ${sphereSelect("manual_lm_sphere_od")} -${cylSelect(
            "manual_lm_cyl_od"
        )} x ${axisSelect("manual_lm_axis_od")} Add: ${addSelect(
            "manual_lm_add_od"
        )}
          <br><br>
          OS: ${sphereSelect("manual_lm_sphere_os")} -${cylSelect(
            "manual_lm_cyl_os"
        )} x ${axisSelect("manual_lm_axis_os")} Add: ${addSelect(
            "manual_lm_add_os"
        )}
        </td>
      </tr>
      `);
  }
}

function acceptManualLm() {
  available_lms["man"] = {};
  available_lms["man"] = {
    la01: $("#manual_lm_sphere_od").val(),
    la02: $("#manual_lm_cyl_od").val(),
    la03: $("#manual_lm_axis_od").val(),
    la04: $("#manual_lm_add_od").val(),
    la05: $("#manual_lm_sphere_os").val(),
    la06: $("#manual_lm_cyl_os").val(),
    la07: $("#manual_lm_axis_os").val(),
    la08: $("#manual_lm_add_os").val(),
    id: $("#pt_id").html()
  };
  selectLm("man");
}

// end lensometer functions

//keratometer functions

available_kms = [];

function autokeratometerModal() {
  $("#autokeratometerModal").modal("show");
}

function selectKm(km) {
  e = available_kms[km];

  $("#kmInfo").html(
    `OD: <span id="km_flat_od">${numeral(e.ar08).format(
            "00.00"
        )}</span> x <span id="km_flat_axis_od">${numeral(e.ar09).format(
            "000"
        )}</span> / <span id="km_steep_od">${numeral(e.ar12).format(
            "00.00"
        )}</span> x <span id="km_steep_axis_od">${numeral(e.ar13).format(
            "000"
        )}</span>
            <br>
            OS: <span id="km_flat_os">${numeral(e.ar10).format(
                "00.00"
            )}</span> x <span id="km_flat_axis_os">${numeral(e.ar11).format(
            "000"
        )}</span> / <span id="km_steep_os">${numeral(e.ar14).format(
            "00.00"
        )}</span> x <span id="km_steep_axis_os">${numeral(e.ar15).format(
            "000"
        )}</span>
      `
  );

  $("#km-button").removeClass("btn-danger");
  $("#km-button").addClass("btn-success");
  ipc.send('updateKM', available_kms[km]);
  $("#autokeratometerModal").modal("hide");


  // $.ajax({
  //   url: "https://eyemax.test/assign-ar",
  //   type: "post",
  //   data: {
  //     ar: e,
  //     patient: $("#encounter_number").val()
  //   },
  //   success: function() {
  //     $("#km-button").removeClass("btn-danger");
  //     $("#km-button").addClass("btn-success");
  //     $("#autokeratometerModal").modal("hide");
  //   }
  // });
}

function enterManualKm() {
  if ($(".manualKm").length == 0) {
    $("#autokeratometerBody").append(`
      <tr class="manualKm">
        <td></td>
        <td>
          OD: <input id="manual_km_flat_od"> x <input id="manual_km_flat_axis_od"> / <input id="manual_km_steep_od"> x <input id="manual_km_steep_axis_od">
          <br><br>
          OS: <input id="manual_km_flat_os"> x <input id="manual_km_flat_axis_os"> / <input id="manual_km_steep_os"> x <input id="manual_km_steep_axis_os">
        </td>
      </tr>
      `);
  }
}

function acceptManualKm() {
  available_kms["man"] = {};
  available_kms["man"] = {
    ar08: numeral($("#manual_km_flat_od").val()).format("00.00"),
    ar09: numeral($("#manual_km_flat_axis_od").val()).format("000"),
    ar12: numeral($("#manual_km_steep_od").val()).format("00.00"),
    ar13: numeral($("#manual_km_steep_axis_od").val()).format("000"),
    ar10: numeral($("#manual_km_flat_os").val()).format("00.00"),
    ar11: numeral($("#manual_km_flat_axis_os").val()).format("000"),
    ar14: numeral($("#manual_km_steep_os").val()).format("00.00"),
    ar15: numeral($("#manual_km_steep_axis_os").val()).format("000"),
    id: $("#pt_id").html()
  };
  selectKm("man");
}

// end keratometer functions

//select dropdowns

function sphereSelect(name) {
  return `<select id="${name}">
<option value="+13.00">+13.00</option>
<option value="+12.75">+12.75</option>
<option value="+12.50">+12.50</option>
<option value="+12.25">+12.25</option>
<option value="+12.00">+12.00</option>
<option value="+11.75">+11.75</option>
<option value="+11.50">+11.50</option>
<option value="+11.25">+11.25</option>
<option value="+11.00">+11.00</option>
<option value="+10.75">+10.75</option>
<option value="+10.50">+10.50</option>
<option value="+10.25">+10.25</option>
<option value="+10.00">+10.00</option>
<option value="+9.75">+9.75</option>
<option value="+9.50">+9.50</option>
<option value="+9.25">+9.25</option>
<option value="+9.00">+9.00</option>
<option value="+8.75">+8.75</option>
<option value="+8.50">+8.50</option>
<option value="+8.25">+8.25</option>
<option value="+8.00">+8.00</option>
<option value="+7.75">+7.75</option>
<option value="+7.50">+7.50</option>
<option value="+7.25">+7.25</option>
<option value="+7.00">+7.00</option>
<option value="+6.75">+6.75</option>
<option value="+6.50">+6.50</option>
<option value="+6.25">+6.25</option>
<option value="+6.00">+6.00</option>
<option value="+5.75">+5.75</option>
<option value="+5.50">+5.50</option>
<option value="+5.25">+5.25</option>
<option value="+5.00">+5.00</option>
<option value="+4.75">+4.75</option>
<option value="+4.50">+4.50</option>
<option value="+4.25">+4.25</option>
<option value="+4.00">+4.00</option>
<option value="+3.75">+3.75</option>
<option value="+3.50">+3.50</option>
<option value="+3.25">+3.25</option>
<option value="+3.00">+3.00</option>
<option value="+2.75">+2.75</option>
<option value="+2.50">+2.50</option>
<option value="+2.25">+2.25</option>
<option value="+2.00">+2.00</option>
<option value="+1.75">+1.75</option>
<option value="+1.50">+1.50</option>
<option value="+1.25">+1.25</option>
<option value="+1.00">+1.00</option>
<option value="+0.75">+0.75</option>
<option value="+0.50">+0.50</option>
<option value="+0.25">+0.25</option>
<option value="" selected>+0.00</option>
<option value="-0.25">-0.25</option>
<option value="-0.50">-0.50</option>
<option value="-0.75">-0.75</option>
<option value="-1.00">-1.00</option>
<option value="-1.25">-1.25</option>
<option value="-1.50">-1.50</option>
<option value="-1.75">-1.75</option>
<option value="-2.00">-2.00</option>
<option value="-2.25">-2.25</option>
<option value="-2.50">-2.50</option>
<option value="-2.75">-2.75</option>
<option value="-3.00">-3.00</option>
<option value="-3.25">-3.25</option>
<option value="-3.50">-3.50</option>
<option value="-3.75">-3.75</option>
<option value="-4.00">-4.00</option>
<option value="-4.25">-4.25</option>
<option value="-4.50">-4.50</option>
<option value="-4.75">-4.75</option>
<option value="-5.00">-5.00</option>
<option value="-5.25">-5.25</option>
<option value="-5.50">-5.50</option>
<option value="-5.75">-5.75</option>
<option value="-6.00">-6.00</option>
<option value="-6.25">-6.25</option>
<option value="-6.50">-6.50</option>
<option value="-6.75">-6.75</option>
<option value="-7.00">-7.00</option>
<option value="-7.25">-7.25</option>
<option value="-7.50">-7.50</option>
<option value="-7.75">-7.75</option>
<option value="-8.00">-8.00</option>
<option value="-8.25">-8.25</option>
<option value="-8.50">-8.50</option>
<option value="-8.75">-8.75</option>
<option value="-9.00">-9.00</option>
<option value="-9.25">-9.25</option>
<option value="-9.50">-9.50</option>
<option value="-9.75">-9.75</option>
<option value="-10.00">-10.00</option>
<option value="-10.25">-10.25</option>
<option value="-10.50">-10.50</option>
<option value="-10.75">-10.75</option>
<option value="-11.00">-11.00</option>
<option value="-11.25">-11.25</option>
<option value="-11.50">-11.50</option>
<option value="-11.75">-11.75</option>
<option value="-12.00">-12.00</option>
<option value="-12.25">-12.25</option>
<option value="-12.50">-12.50</option>
<option value="-12.75">-12.75</option>
<option value="-13.00">-13.00</option>
<option value="-13.25">-13.25</option>
<option value="-13.50">-13.50</option>
<option value="-13.75">-13.75</option>
</select>`;
}

function cylSelect(name) {
  return `<select id="${name}">
<option value="" selected>0.00</option>
<option value="-0.25">0.25</option>
<option value="-0.50">0.50</option>
<option value="-0.75">0.75</option>
<option value="-1.00">1.00</option>
<option value="-1.25">1.25</option>
<option value="-1.50">1.50</option>
<option value="-1.75">1.75</option>
<option value="-2.00">2.00</option>
<option value="-2.25">2.25</option>
<option value="-2.50">2.50</option>
<option value="-2.75">2.75</option>
<option value="-3.00">3.00</option>
<option value="-3.25">3.25</option>
<option value="-3.50">3.50</option>
<option value="-3.75">3.75</option>
<option value="-4.00">4.00</option>
<option value="-4.25">4.25</option>
<option value="-4.50">4.50</option>
<option value="-4.75">4.75</option>
<option value="-5.00">5.00</option>
<option value="-5.25">5.25</option>
<option value="-5.50">5.50</option>
<option value="-5.75">5.75</option>
<option value="-6.00">6.00</option>
</select>`;
}

function axisSelect(name) {
  return `<select id='${name}'>
  <option value="180">180</option>
  <option value="179">179</option>
  <option value="178">178</option>
  <option value="177">177</option>
  <option value="176">176</option>
  <option value="175">175</option>
  <option value="174">174</option>
  <option value="173">173</option>
  <option value="172">172</option>
  <option value="171">171</option>
  <option value="170">170</option>
  <option value="169">169</option>
  <option value="168">168</option>
  <option value="167">167</option>
  <option value="166">166</option>
  <option value="165">165</option>
  <option value="164">164</option>
  <option value="163">163</option>
  <option value="162">162</option>
  <option value="161">161</option>
  <option value="160">160</option>
  <option value="159">159</option>
  <option value="158">158</option>
  <option value="157">157</option>
  <option value="156">156</option>
  <option value="155">155</option>
  <option value="154">154</option>
  <option value="153">153</option>
  <option value="152">152</option>
  <option value="151">151</option>
  <option value="150">150</option>
  <option value="149">149</option>
  <option value="148">148</option>
  <option value="147">147</option>
  <option value="146">146</option>
  <option value="145">145</option>
  <option value="143">143</option>
  <option value="142">142</option>
  <option value="141">141</option>
  <option value="140">140</option>
  <option value="139">139</option>
  <option value="138">138</option>
  <option value="137">137</option>
  <option value="136">136</option>
  <option value="135">135</option>
  <option value="134">134</option>
  <option value="133">133</option>
  <option value="132">132</option>
  <option value="131">131</option>
  <option value="130">130</option>
  <option value="129">129</option>
  <option value="128">128</option>
  <option value="127">127</option>
  <option value="126">126</option>
  <option value="125">125</option>
  <option value="124">124</option>
  <option value="123">123</option>
  <option value="122">122</option>
  <option value="121">121</option>
  <option value="120">120</option>
  <option value="119">119</option>
  <option value="118">118</option>
  <option value="117">117</option>
  <option value="116">116</option>
  <option value="115">115</option>
  <option value="114">114</option>
  <option value="113">113</option>
  <option value="112">112</option>
  <option value="111">111</option>
  <option value="110">110</option>
  <option value="109">109</option>
  <option value="108">108</option>
  <option value="107">107</option>
  <option value="106">106</option>
  <option value="105">105</option>
  <option value="104">104</option>
  <option value="103">103</option>
  <option value="102">102</option>
  <option value="101">101</option>
  <option value="100">100</option>
  <option value="099">99</option>
  <option value="098">98</option>
  <option value="097">97</option>
  <option value="096">96</option>
  <option value="095">95</option>
  <option value="094">94</option>
  <option value="093">93</option>
  <option value="092">92</option>
  <option value="091">91</option>
  <option value="" selected></option>
  <option value="090" >90</option>
  <option value="089">89</option>
  <option value="088">88</option>
  <option value="087">87</option>
  <option value="086">86</option>
  <option value="085">85</option>
  <option value="084">84</option>
  <option value="083">83</option>
  <option value="082">82</option>
  <option value="081">81</option>
  <option value="080">80</option>
  <option value="079">79</option>
  <option value="078">78</option>
  <option value="077">77</option>
  <option value="076">76</option>
  <option value="075">75</option>
  <option value="074">74</option>
  <option value="073">73</option>
  <option value="072">72</option>
  <option value="071">71</option>
  <option value="070">70</option>
  <option value="069">69</option>
  <option value="068">68</option>
  <option value="067">67</option>
  <option value="066">66</option>
  <option value="065">65</option>
  <option value="064">64</option>
  <option value="063">63</option>
  <option value="062">62</option>
  <option value="061">61</option>
  <option value="060">60</option>
  <option value="059">59</option>
  <option value="058">58</option>
  <option value="057">57</option>
  <option value="056">56</option>
  <option value="055">55</option>
  <option value="054">54</option>
  <option value="053">53</option>
  <option value="052">52</option>
  <option value="051">51</option>
  <option value="050">50</option>
  <option value="049">49</option>
  <option value="048">48</option>
  <option value="047">47</option>
  <option value="046">46</option>
  <option value="045">45</option>
  <option value="044">44</option>
  <option value="043">43</option>
  <option value="042">42</option>
  <option value="041">41</option>
  <option value="040">40</option>
  <option value="039">39</option>
  <option value="038">38</option>
  <option value="037">37</option>
  <option value="036">36</option>
  <option value="035">35</option>
  <option value="034">34</option>
  <option value="033">33</option>
  <option value="032">32</option>
  <option value="031">31</option>
  <option value="030">30</option>
  <option value="029">29</option>
  <option value="028">28</option>
  <option value="027">27</option>
  <option value="026">26</option>
  <option value="025">25</option>
  <option value="024">24</option>
  <option value="023">23</option>
  <option value="022">22</option>
  <option value="021">21</option>
  <option value="020">20</option>
  <option value="019">19</option>
  <option value="018">18</option>
  <option value="017">17</option>
  <option value="016">16</option>
  <option value="015">15</option>
  <option value="014">14</option>
  <option value="013">13</option>
  <option value="012">12</option>
  <option value="011">11</option>
  <option value="010">10</option>
  <option value="009">09</option>
  <option value="008">08</option>
  <option value="007">07</option>
  <option value="006">06</option>
  <option value="005">05</option>
  <option value="004">04</option>
  <option value="003">03</option>
  <option value="002">02</option>
  <option value="001">01</option>
</select>`;
}

function addSelect(name) {
  return `<select id="${name}">
<option value="" selected>0.00</option>
<option value="+0.25">0.25</option>
<option value="+0.50">0.50</option>
<option value="+0.75">0.75</option>
<option value="+1.00">1.00</option>
<option value="+1.25">1.25</option>
<option value="+1.50">1.50</option>
<option value="+1.75">1.75</option>
<option value="+2.00">2.00</option>
<option value="+2.25">2.25</option>
<option value="+2.50">2.50</option>
<option value="+2.75">2.75</option>
<option value="+3.00">3.00</option>
<option value="+3.25">3.25</option>
<option value="+3.50">3.50</option>
<option value="+3.75">3.75</option>
<option value="+4.00">4.00</option>
</select>`;
}