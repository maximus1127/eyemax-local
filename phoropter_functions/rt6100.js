var changeAmount = 0.25;
var axisChangeAmount = 1;
var subjectiveData = [];
var staticSubjective = [];
var staticFinal = [];
var finalData = [];
var finalPush = 0;
var numeral = require('numeral');


var specData = [
  "RS" + numeral(refInfo.la01).format("+00.00"),
  "LS" + numeral(refInfo.la05).format("+00.00"),
  "RC" + numeral(refInfo.la02).format("+00.00"),
  "LC" + numeral(refInfo.la06).format("+00.00"),
  "RA" + numeral(refInfo.la03).format("000"),
  "LA" + numeral(refInfo.la07).format("000"),
  "RD" + numeral(refInfo.la04).format("+00.00"),
  "LD" + numeral(refInfo.la08).format("+00.00")
];

var arData = [
  "RS" + numeral(refInfo.ar02).format("+00.00"),
  "LS" + numeral(refInfo.ar05).format("+00.00"),
  "RC" + numeral(refInfo.ar03).format("+00.00"),
  "LC" + numeral(refInfo.ar06).format("+00.00"),
  "RA" + numeral(refInfo.ar04).format("000"),
  "LA" + numeral(refInfo.ar07).format("000")
];
var sphEqOD = 0;
var sphEqOS = 0;
var plano = ["0.00", "0.00", "0.00", "0.00", "000", "000"];
var planoWithPref = [
  "RS+00.00",
  "RC-00.00",
  "RA000",
  "LS+00.00",
  "LC-00.00",
  "LA000"
];
var planoOn = false;
var phorButtons = $(".phorButton");
var curEye = "od";
var axisOD = null;
var axisOS = null;
var jccStatus = 1;
var jccMode = 0;
var addMode = false;
$(document).keydown(function(event) {
  if ($("#odSelect").hasClass("phorEyeActive")) {
    curEye = "od";
  } else if ($("#osSelect").hasClass("phorEyeActive")) {
    curEye = "os";
  } else if ($("#ouSelect").hasClass("phorEyeActive")) {
    curEye = "ou";
  }
  if (event.which == 96) {
    changeAmount = 0.5;
    axisChangeAmount = 5;
  }

  if (
    $("#subjRx").hasClass("ref-data-active") ||
    $("#finRx").hasClass("ref-data-active")
  ) {
    // plus or minus sphere
    if (event.which == 105) {
      if (curEye == "ou") {
        odSph = parseFloat($(phorButtons[3]).html());
        osSph = parseFloat($(phorButtons[5]).html());

        odSph += changeAmount;
        osSph += changeAmount;

        $(phorButtons[3]).html(numeral(odSph).format("+0.00"));
        $(phorButtons[5]).html(numeral(osSph).format("+0.00"));

        $(".ref-data-active .odSphere").html(
          numeral(odSph).format("+0.00")
        );
        $(".ref-data-active .osSphere").html(
          numeral(osSph).format("+0.00")
        );
        dataToSend = [
          "RS" + numeral(odSph).format("+00.00"),
          "LS" + numeral(osSph).format("+00.00")
        ];
        sendData(dataToSend);
      } else {
        dataToSend = "";
        curPow = parseFloat(
          $(".ref-data-active ." + curEye + "Sphere").html()
        );
        curPow += changeAmount;
        $(".ref-data-active ." + curEye + "Sphere").html(
          numeral(curPow).format("+0.00")
        );
        var elems = document.getElementsByClassName(
          "phorEyeActive " + curEye + "Sphere"
        );
        $(elems).html(numeral(curPow).format("+0.00"));

        if (curEye == "od") {
          dataToSend = ["RS" + numeral(curPow).format("+00.00")];
        } else {
          dataToSend = ["LS" + numeral(curPow).format("+00.00")];
        }
        sendData(dataToSend);
      }
    }
    if (event.which == 103) {
      if (curEye == "ou") {
        odSph = parseFloat($(phorButtons[3]).html());
        osSph = parseFloat($(phorButtons[5]).html());

        odSph -= changeAmount;
        osSph -= changeAmount;

        $(phorButtons[3]).html(numeral(odSph).format("+0.00"));
        $(phorButtons[5]).html(numeral(osSph).format("+0.00"));

        $(".ref-data-active .odSphere").html(
          numeral(odSph).format("+0.00")
        );
        $(".ref-data-active .osSphere").html(
          numeral(osSph).format("+0.00")
        );
        dataToSend = [
          "RS" + numeral(odSph).format("+00.00"),
          "LS" + numeral(osSph).format("+00.00")
        ];
        sendData(dataToSend);
      } else {
        org_val = $(".ref-data-active ." + curEye + "Sphere").html();
        trim_val = org_val.replace("+", "");
        curPow = parseFloat(trim_val);
        curPow -= changeAmount;
        $(".ref-data-active ." + curEye + "Sphere").html(
          numeral(curPow).format("+0.00")
        );
        var elems = document.getElementsByClassName(
          "phorEyeActive " + curEye + "Sphere"
        );
        $(elems).html(numeral(curPow).format("+0.00"));
        if (curEye == "od") {
          dataToSend = ["RS" + numeral(curPow).format("+00.00")];
        } else {
          dataToSend = ["LS" + numeral(curPow).format("+00.00")];
        }
        sendData(dataToSend);
      }
    }
    // end plus or minus sphere

    // plus or minus cyl
    if (event.which == 100) {
      curPow = parseFloat(
        $(".ref-data-active ." + curEye + "Cyl").html()
      );
      curPow -= changeAmount;
      //calculate spherical equivalent
      if (curEye == "od") {
        if (Math.abs(sphEqOD - curPow) >= 0.5) {
          sphEqOD = curPow;
          curSph = parseFloat(
            $(".ref-data-active ." + curEye + "Sphere").html()
          );
          curSph += changeAmount;
          $(".ref-data-active ." + curEye + "Sphere").html(
            numeral(curSph).format("+0.00")
          );
          var elems = document.getElementsByClassName(
            "phorEyeActive " + curEye + "Sphere"
          );
          $(elems).html(numeral(curSph).format("+0.00"));

          dataToSend = ["RS" + numeral(curSph).format("+00.00")];
          sendData(dataToSend);
        }
      } else if (curEye == "os") {
        if (Math.abs(sphEqOS - curPow) >= 0.5) {
          sphEqOS = curPow;
          curSph = parseFloat(
            $(".ref-data-active ." + curEye + "Sphere").html()
          );
          curSph += changeAmount;
          $(".ref-data-active ." + curEye + "Sphere").html(
            numeral(curSph).format("+0.00")
          );
          var elems = document.getElementsByClassName(
            "phorEyeActive " + curEye + "Sphere"
          );
          $(elems).html(numeral(curSph).format("+0.00"));
          dataToSend = ["LS" + numeral(curSph).format("+00.00")];
          sendData(dataToSend);
        }
      }
      //end calculate spherical equivalent
      $(".ref-data-active ." + curEye + "Cyl").html(
        numeral(curPow).format("+0.00")
      );
      var elems = document.getElementsByClassName(
        "phorEyeActive " + curEye + "Cyl"
      );
      $(elems).html(numeral(curPow).format("+0.00"));
      if (curEye == "od") {
        dataToSend = ["RC" + numeral(curPow).format("+00.00")];
      } else {
        dataToSend = ["LC" + numeral(curPow).format("+00.00")];
      }
      sendData(dataToSend);
    }
    if (event.which == 102) {
      curPow = parseFloat(
        $(".ref-data-active ." + curEye + "Cyl").html()
      );
      if (curPow != 0) {
        curPow += changeAmount;
      }
      //calculate spherical equivalent
      if (curEye == "od") {
        if (Math.abs(sphEqOD - curPow) >= 0.5) {
          sphEqOD = curPow;
          curSph = parseFloat(
            $(".ref-data-active ." + curEye + "Sphere").html()
          );
          curSph -= changeAmount;
          $(".ref-data-active ." + curEye + "Sphere").html(
            numeral(curSph).format("+0.00")
          );
          var elems = document.getElementsByClassName(
            "phorEyeActive " + curEye + "Sphere"
          );
          $(elems).html(numeral(curSph).format("+0.00"));
          dataToSend = ["RS" + numeral(curSph).format("+00.00")];
          sendData(dataToSend);
        }
      } else if (curEye == "os") {
        if (Math.abs(sphEqOS - curPow) >= 0.5) {
          sphEqOS = curPow;
          curSph = parseFloat(
            $(".ref-data-active ." + curEye + "Sphere").html()
          );
          curSph -= changeAmount;
          $(".ref-data-active ." + curEye + "Sphere").html(
            numeral(curSph).format("+0.00")
          );
          var elems = document.getElementsByClassName(
            "phorEyeActive " + curEye + "Sphere"
          );
          $(elems).html(numeral(curSph).format("+0.00"));
          dataToSend = ["LS" + numeral(curSph).format("+00.00")];
          sendData(dataToSend);
        }
      }
      //end calculate spherical equivalent
      $(".ref-data-active ." + curEye + "Cyl").html(
        numeral(curPow).format("+0.00")
      );
      var elems = document.getElementsByClassName(
        "phorEyeActive " + curEye + "Cyl"
      );
      $(elems).html(numeral(curPow).format("+0.00"));
      if (curEye == "od") {
        dataToSend = ["RC" + numeral(curPow).format("+00.00")];
      } else {
        dataToSend = ["LC" + numeral(curPow).format("+00.00")];
      }
      sendData(dataToSend);
    }
    // end plus or minus cyl

    // plus or minus axis
    if (event.which == 97) {
      curPow = parseFloat(
        $(".ref-data-active ." + curEye + "Axis").html()
      );
      curPow -= axisChangeAmount;

      if (curPow < 0) curPow = 179;
      $(".ref-data-active ." + curEye + "Axis").html(
        numeral(curPow).format("000")
      );
      var elems = document.getElementsByClassName(
        "phorEyeActive " + curEye + "Axis"
      );
      $(elems).html(numeral(curPow).format("000"));
      if (curEye == "od") {
        dataToSend = ["RA" + numeral(curPow).format("000")];
      } else {
        dataToSend = ["LA" + numeral(curPow).format("000")];
      }
      if (curEye == "od") {
        $("#jccOD").css({
          transform: "rotate(" +
            (getRotationAngle(document.getElementById("jccOD")) +
              axisChangeAmount) +
            "deg)"
        });
      } else if (curEye == "os") {
        $("#jccOS").css({
          transform: "rotate(" +
            (getRotationAngle(document.getElementById("jccOS")) +
              axisChangeAmount) +
            "deg)"
        });
      }
      sendData(dataToSend);
    }
    if (event.which == 99) {
      curPow = parseFloat(
        $(".ref-data-active ." + curEye + "Axis").html()
      );
      curPow += axisChangeAmount;
      if (curPow == 180) curPow = 000;
      if (curPow > 180) curPow = 001
      // if(curPow == 180) curPow =
      $(".ref-data-active ." + curEye + "Axis").html(
        numeral(curPow).format("000")
      );
      var elems = document.getElementsByClassName(
        "phorEyeActive " + curEye + "Axis"
      );
      $(elems).html(numeral(curPow).format("000"));
      if (curEye == "od") {
        dataToSend = ["RA" + numeral(curPow).format("000")];
      } else {
        dataToSend = ["LA" + numeral(curPow).format("000")];
      }
      if (curEye == "od") {
        $("#jccOD").css({
          transform: "rotate(" +
            (getRotationAngle(document.getElementById("jccOD")) -
              axisChangeAmount) +
            "deg)"
        });
      } else if (curEye == "os") {
        $("#jccOS").css({
          transform: "rotate(" +
            (getRotationAngle(document.getElementById("jccOS")) -
              axisChangeAmount) +
            "deg)"
        });
      }
      sendData(dataToSend);
    }
    // end plus or minus axis

    // plus or minus add
    if (event.which == 109) {
      curPow = parseFloat($(phorButtons[14]).html());
      curPow -= changeAmount;
      $(".ref-data-active .odAdd").html(numeral(curPow).format("+0.00"));
      $(".ref-data-active .osAdd").html(numeral(curPow).format("+0.00"));
      $(phorButtons[12]).html(numeral(curPow).format("+0.00"));
      $(phorButtons[14]).html(numeral(curPow).format("+0.00"));
      dataToSend = [
        "RD" + numeral(curPow).format("+00.00"),
        "LD" + numeral(curPow).format("+00.00")
      ];
      sendData(dataToSend);
    }
    if (event.which == 107) {
      curPow = parseFloat($(phorButtons[14]).html());
      curPow += changeAmount;
      $(".ref-data-active .odAdd").html(numeral(curPow).format("+0.00"));
      $(".ref-data-active .osAdd").html(numeral(curPow).format("+0.00"));
      $(phorButtons[12]).html(numeral(curPow).format("+0.00"));
      $(phorButtons[14]).html(numeral(curPow).format("+0.00"));
      dataToSend = [
        "RD" + numeral(curPow).format("+00.00"),
        "LD" + numeral(curPow).format("+00.00")
      ];
      sendData(dataToSend);
    }
    // end plus or minus add

    if (event.which == 46) {
      event.preventDefault();
      curEye = "od";
      $("*").removeClass("phorEyeActive");
      $(".odButtons").addClass("phorEyeActive");
      $("#jccOS").css("visibility", "hidden");
      $("#jccOSText").html("");
      $("*").removeClass("cross-cylinder-select");
      jccMode = 0;
      dataToSend = ["RX00", "LX01", "KSR"];
      sendData(dataToSend);
      // setTimeout(sendData(["XC0"]), 250);
    }
    if (event.which == 34) {
      event.preventDefault();
      curEye = "os";
      $("*").removeClass("phorEyeActive");
      $(".osButtons").addClass("phorEyeActive");
      $("#jccOD").css("visibility", "hidden");
      $("#jccODText").html("");
      $("*").removeClass("cross-cylinder-select");
      jccMode = 0;
      dataToSend = ["RX01", "LX00", "KSL"];
      sendData(dataToSend);
      // setTimeout(sendData(["XC0"]), 250);
    }
    if (event.which == 35) {
      event.preventDefault();
      curEye = "ou";
      $("*").removeClass("phorEyeActive");
      $([phorButtons[1], phorButtons[3], phorButtons[5]]).addClass(
        "phorEyeActive"
      );
      $("#jccOS, #jccOD").css("visibility", "hidden");
      $("*").removeClass("cross-cylinder-select");
      jccMode = 0;
      dataToSend = ["RX00", "LX00", "KSB"];
      sendData(dataToSend);
      // setTimeout(sendData(["XC0"]), 250);
    }

    // jcc controls
    if (event.which == 101) {
      //5
      //toggle jcc on correct eye
      var jccCurStat = jccStatus == 1 ? "XC1" : (jccCurStat = "XC2");

      jccMode++;
      if (jccMode == 1) {
        $("#circles").trigger("click");
        $("#cylRow").removeClass("cross-cylinder-select");
        $("#addRow").removeClass("cross-cylinder-select");
        $("#axisRow").addClass("cross-cylinder-select");
        if (curEye == "od") {
          $("#jccOD").css({
            transform: "rotate(-" +
              (parseFloat(
                  $(".ref-data-active ." + curEye + "Axis").html()
                ) -
                45) +
              "deg)",
            visibility: "visible"
          });
          $("#jccODText").html(
            jccStatus == 1 ? "Choice 1 (+)" : "Choice 2 (-)"
          );
          sendData(["KAR", jccCurStat, "XM2"]);
          // $("#jccOD").css("visibility", "visible");
        } else if (curEye == "os") {
          $("#jccOS").css({
            transform: "rotate(-" +
              (parseFloat(
                  $(".ref-data-active ." + curEye + "Axis").html()
                ) -
                45) +
              "deg)",
            visibility: "visible"
          });
          $("#jccOSText").html(
            jccStatus == 1 ? "Choice 1 (+)" : "Choice 2 (-)"
          );
          sendData(["KAL", jccCurStat, "XM2"]);
          // $("#jccOS").css("visibility", "visible");
        }
      } else if (jccMode == 2) {
        rotateAmount = jccStatus == 1 ? -45 : 45
        $("#axisRow").removeClass("cross-cylinder-select");
        $("#addRow").removeClass("cross-cylinder-select");
        $("#cylRow").addClass("cross-cylinder-select");
        if (curEye == "od") {
          $("#jccOD").css({
            transform: "rotate(" +
              (getRotationAngle(
                document.getElementById("jccOD")
              ) + rotateAmount) +
              "deg)"
          });
          $("#jccOD").css("visibility", "visible");
          $("#jccODText").html(
            jccStatus == 1 ? "Choice 1 (+)" : "Choice 2 (-)"
          );
          sendData(["KCR", jccCurStat]);
        } else if (curEye == "os") {
          $("#jccOS").css({
            transform: "rotate(" +
              (getRotationAngle(
                document.getElementById("jccOS")
              ) + rotateAmount) +
              "deg)"
          });
          $("#jccOS").css("visibility", "visible");
          $("#jccOSText").html(
            jccStatus == 1 ? "Choice 1 (+)" : "Choice 2 (-)"
          );
          sendData(["KCL", jccCurStat]);
        }
      } else {
        jccMode = 0;
        $("#cylRow").removeClass("cross-cylinder-select");
        $("#axisRow").removeClass("cross-cylinder-select");
        $("#jccOD").css("visibility", "hidden");
        $("#jccOS").css("visibility", "hidden");
        $("#singleLetter").trigger("click");
        $("#jccODText").html("");
        $("#jccOSText").html("");
        setTimeout(() => $("#twentyFive").trigger("click"), 200);
        sendData(["XC0"]);
      }
    }

    if (event.which == 110) {
      addMode = !addMode;
      if (addMode) {
        $("#cylRow").removeClass("cross-cylinder-select");
        $("#axisRow").removeClass("cross-cylinder-select");
        $("#addRow").addClass("cross-cylinder-select");
        odAdd = numeral(parseFloat($(phorButtons[12]).html()) + parseFloat($(phorButtons[3]).html())).format("+00.00");
        osAdd = numeral(parseFloat($(phorButtons[14]).html()) + parseFloat($(phorButtons[5]).html())).format("+00.00");
        sendData(["RS" + odAdd, "LS" + osAdd])
      } else {
        $("#addRow").removeClass("cross-cylinder-select");
        odAdd = numeral(parseFloat($(phorButtons[3]).html())).format('+00.00');
        osAdd = numeral(parseFloat($(phorButtons[5]).html())).format("+00.00");
        sendData(["RS" + odAdd, "LS" + osAdd])
      }

    }

    if (event.which == 104) {
      // key 8
      if (jccMode == 1) {
        curAxis = curEye == "od" ? (axisOD += 45) : (axisOS += 45);
      } else {
        curAxis = curEye == "od" ? axisOD : axisOS;
      }
      jccStatus == 1 ? (jccStatus = 2) : (jccStatus = 1);

      if (jccStatus == 1) {
        if (curEye == "od") {
          $("#jccOD").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOD")
                        ) + 90}deg)`
          });
          $("#jccODText").html("Choice 1 (+)");
          sendData(["XC1"]);
        } else {
          $("#jccOS").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOS")
                        ) + 90}deg)`
          });
          $("#jccOSText").html("Choice 1 (+)");
          sendData(["XC1"]);
        }
      } else if (jccStatus == 2) {
        if (curEye == "od") {
          $("#jccOD").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOD")
                        ) - 90}deg)`
          });
          $("#jccODText").html("Choice 2 (-)");
          sendData(["XC2"]);
        } else {
          $("#jccOS").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOS")
                        ) - 90}deg)`
          });
          $("#jccOSText").html("Choice 2 (-)");
          sendData(["XC2"]);
        }
      }
    }

    // end jcc controls

    if (event.which == 13) {
      finalPush++;
      if (finalPush == 1) {
        $("#finRxp").html("");
        // console.log(finalData);
        $("#finRxp").html(`
        <p><span class="odSphere">${$(
            "#subjOdSph"
        ).html()}</span><span class="odCyl"> ${$(
                    "#subjOdCyl"
                ).html()}</span> x <span class="odAxis">${$(
                    "#subjOdAxis"
                ).html()}</span> <span style="color: lightsteelblue; float:right" id="odDistVisionFinal"></span></p>
        <p><span class="osSphere">${$(
            "#subjOsSph"
        ).html()}</span><span class="osCyl"> ${$(
                    "#subjOsCyl"
                ).html()}</span> x <span class="osAxis">${$(
                    "#subjOsAxis"
                ).html()}</span> <span style="color: lightsteelblue; float: right" id="osDistVisionFinal"></span></p>
        <p><span style="color: lightsteelblue; float: right" id="ouDistVisionFinal"></span></p><br />
        <p><span style="color: lightsteelblue; float: left">Add: <span class="osAdd">${$(
            "#subjOsAdd"
        ).html()}</span></p>
        `);
        // finalData = []
        $("#finRx").trigger("click");
      } else {
        finalSend();
      }
    }
  }
  buildStaticArrays();
});

$(document).keyup(function(event) {
  if (event.which == 96) {
    changeAmount = 0.25;
    axisChangeAmount = 1;
  }
});

$(document).ready(function() {
  //for some reason, the phoropter does not like it when the line below assigning the class is active. tech will have to manually select OD/OS first.
  // $(".odButtons").addClass("phorEyeActive");
  buildStaticArrays();
  createSubjectiveDataArray();
  sphEqOD = parseFloat($(phorButtons[6]).html());
  sphEqOS = parseFloat($(phorButtons[8]).html());
  axisOD = parseFloat($(phorButtons[9]).html());
  axisOS = parseFloat($(phorButtons[11]).html());
  setTimeout(sendData(["RX00", "LX01", "PD" + refInfo.ar01]), 5000);
});

$(".ref-data").click(function(d) {
  rx = $(this).attr("id");
  if (rx == "subjRx") {
    $(phorButtons[3]).html(staticSubjective[0]);
    $(phorButtons[6]).html(staticSubjective[2]);
    $(phorButtons[9]).html(staticSubjective[4]);
    $(phorButtons[12]).html(staticSubjective[6]);
    $(phorButtons[5]).html(staticSubjective[1]);
    $(phorButtons[8]).html(staticSubjective[3]);
    $(phorButtons[11]).html(staticSubjective[5]);
    $(phorButtons[14]).html(staticSubjective[7]);
    createSubjectiveDataArray();
  }
  if (rx == "arRx") {
    $(phorButtons[3]).html(arData[0].substring(2));
    $(phorButtons[6]).html(arData[2].substring(2));
    $(phorButtons[9]).html(arData[4].substring(2));
    $(phorButtons[5]).html(arData[1].substring(2));
    $(phorButtons[8]).html(arData[3].substring(2));
    $(phorButtons[11]).html(arData[5].substring(2));
    sendData(arData);
  }
  if (rx == "specRx") {
    $(phorButtons[3]).html(specData[0].substring(2));
    $(phorButtons[6]).html(specData[2].substring(2));
    $(phorButtons[9]).html(specData[4].substring(2));
    $(phorButtons[12]).html(specData[6].substring(2));
    $(phorButtons[5]).html(specData[1].substring(2));
    $(phorButtons[8]).html(specData[3].substring(2));
    $(phorButtons[11]).html(specData[5].substring(2));
    $(phorButtons[14]).html(specData[7].substring(2));
    sendData(specData);
  }

  if (rx == "finRx") {
    $(phorButtons[3]).html(staticFinal[0]);
    $(phorButtons[6]).html(staticFinal[2]);
    $(phorButtons[9]).html(staticFinal[4]);
    $(phorButtons[12]).html(staticFinal[6]);
    $(phorButtons[5]).html(staticFinal[1]);
    $(phorButtons[8]).html(staticFinal[3]);
    $(phorButtons[11]).html(staticFinal[5]);
    $(phorButtons[14]).html(staticFinal[7]);
    createFinalDataArray();
  }

  $("*").removeClass("ref-data-active");
  $(this).toggleClass("ref-data-active");
});

$("#plano_button").click(function() {
  $("*").removeClass("ref-data-active");
  $(phorButtons[3]).html(plano[0]);
  $(phorButtons[6]).html(plano[1]);
  $(phorButtons[9]).html(plano[2]);
  $(phorButtons[12]).html(subjectiveData[7]);
  $(phorButtons[5]).html(plano[0]);
  $(phorButtons[8]).html(plano[1]);
  $(phorButtons[11]).html(plano[2]);
  $(phorButtons[14]).html(subjectiveData[8]);
  sendData(planoWithPref);
});

function createSubjectiveDataArray() {
  subjectiveData = [];
  //cycle through all button values and create an array based on button html
  $(".phorButton").each(function(e) {
    if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
      if (e != 9 && e != 11) {
        subjectiveData.push(
          $(this).data("prefix") +
          numeral($(this).html()).format("+00.00")
        );
      } else {
        subjectiveData.push(
          $(this).data("prefix") +
          numeral($(this).html() == "180" ? "000" : $(this).html()).format("000")
        );
      }
    }
  });

  sendData(subjectiveData);
}

function createFinalDataArray() {
  finalData = [];
  $(".phorButton").each(function(e) {
    if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
      if (e != 9 && e != 11) {
        finalData.push(
          $(this).data("prefix") +
          numeral($(this).html()).format("+00.00")
        );
      } else {
        finalData.push(
          $(this).data("prefix") +
          numeral($(this).html()).format("000")
        );
      }
    }
  });
  // finalData.unshift(curEye);
  finalData.push("XC0");
  sendData(finalData);
}

function buildStaticArrays() {
  if ($("#subjRx").hasClass("ref-data-active")) {
    staticSubjective = [];
    $(".phorButton").each(function(e) {
      if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
        staticSubjective.push($(this).html());
      }
    });
  } else if ($("#finRx").hasClass("ref-data-active")) {
    staticFinal = [];
    $(".phorButton").each(function(e) {
      if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
        staticFinal.push($(this).html());
      }
    });
  }
}

function sendData(data) {
  console.log(data);
  // ipc.send('phoropterChange', data)
  masterMarcoPhoropter(data)
  // $.ajax({
  //     url: "/phoropter-sequence",
  //     type: "post",
  //     data: {
  //         refractive_info: data,
  //         location: refInfo.store_location_id
  //     }
  // });
}

function getRotationAngle(target) {
  const obj = window.getComputedStyle(target, null);
  const matrix =
    obj.getPropertyValue("-webkit-transform") ||
    obj.getPropertyValue("-moz-transform") ||
    obj.getPropertyValue("-ms-transform") ||
    obj.getPropertyValue("-o-transform") ||
    obj.getPropertyValue("transform");

  let angle = 0;

  if (matrix !== "none") {
    const values = matrix
      .split("(")[1]
      .split(")")[0]
      .split(",");
    const a = values[0];
    const b = values[1];
    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }

  return angle < 0 ? (angle += 360) : angle;
}

function finalSend() {
  emrArray = [];
  emrArray[0] = refInfo.ar01 == null ? "\t\t" : refInfo.ar01 + "\t";
  emrArray[1] = refInfo.la01 == null ? "\t\t" : refInfo.la01 + "\t";
  emrArray[2] = refInfo.la02 == null ? "\t\t" : refInfo.la02 + "\t";
  emrArray[3] = refInfo.la03 == null ? "\t\t" : refInfo.la03 + "\t";
  emrArray[4] = refInfo.la04 == null ? "\t\t" : refInfo.la04 + "\t";
  emrArray[5] = refInfo.la05 == null ? "\t\t" : refInfo.la05 + "\t";
  emrArray[6] = refInfo.la06 == null ? "\t\t" : refInfo.la06 + "\t";
  emrArray[7] = refInfo.la07 == null ? "\t\t" : refInfo.la07 + "\t";
  emrArray[8] = refInfo.la08 == null ? "\t\t" : refInfo.la08 + "\t";
  emrArray[9] = refInfo.ar02 == null ? "\t\t" : refInfo.ar02 + "\t";
  emrArray[10] = refInfo.ar03 == null ? "\t\t" : refInfo.ar03 + "\t";
  emrArray[11] = refInfo.ar04 == null ? "\t\t" : refInfo.ar04 + "\t";
  emrArray[12] = refInfo.ar05 == null ? "\t\t" : refInfo.ar05 + "\t";
  emrArray[13] = refInfo.ar06 == null ? "\t\t" : refInfo.ar06 + "\t";
  emrArray[14] = refInfo.ar07 == null ? "\t\t" : refInfo.ar07 + "\t";

  emrArray[15] =
    staticSubjective[0] == null ? "\t\t" : staticSubjective[0] + "\t";
  emrArray[16] =
    staticSubjective[2] == null ? "\t\t" : staticSubjective[2] + "\t";
  emrArray[17] =
    staticSubjective[4] == null ? "\t\t" : staticSubjective[4] + "\t";
  emrArray[18] =
    staticSubjective[6] == null ? "\t\t" : staticSubjective[6] + "\t";
  emrArray[19] =
    staticSubjective[1] == null ? "\t\t" : staticSubjective[1] + "\t";
  emrArray[20] =
    staticSubjective[3] == null ? "\t\t" : staticSubjective[3] + "\t";
  emrArray[21] =
    staticSubjective[5] == null ? "\t\t" : staticSubjective[5] + "\t";
  emrArray[22] =
    staticSubjective[7] == null ? "\t\t" : staticSubjective[7] + "\t";
  emrArray[23] =
    $("#odDistVisionSubj")
    .html()
    .substring(3) + "\t";
  emrArray[24] = $("#osDistVisionSubj")
    .html()
    .substring(3);
  emrArray[25] = staticFinal[0] == null ? "\t\t" : staticFinal[0] + "\t";
  emrArray[26] = staticFinal[2] == null ? "\t\t" : staticFinal[2] + "\t";
  emrArray[27] = staticFinal[4] == null ? "\t\t" : staticFinal[4] + "\t";
  emrArray[28] = staticFinal[6] == null ? "\t\t" : staticFinal[6] + "\t";
  emrArray[29] = staticFinal[1] == null ? "\t\t" : staticFinal[1] + "\t";
  emrArray[30] = staticFinal[3] == null ? "\t\t" : staticFinal[3] + "\t";
  emrArray[31] = staticFinal[5] == null ? "\t\t" : staticFinal[5] + "\t";
  emrArray[32] = staticFinal[7] == null ? "\t\t" : staticFinal[7] + "\t";
  emrArray[33] =
    $("#odDistVisionFinal")
    .html()
    .substring(3) + "\t";
  emrArray[34] = $("#odDistVisionFinal")
    .html()
    .substring(3);

  emrArray[35] = refInfo.ar08 == null ? "\t\t" : refInfo.ar08 + "\t";
  emrArray[36] = refInfo.ar09 == null ? "\t\t" : refInfo.ar09 + "\t";
  emrArray[37] = refInfo.ar10 == null ? "\t\t" : refInfo.ar10 + "\t";
  emrArray[38] = refInfo.ar11 == null ? "\t\t" : refInfo.ar11 + "\t";
  emrArray[39] = refInfo.ar12 == null ? "\t\t" : refInfo.ar12 + "\t";
  emrArray[40] = refInfo.ar13 == null ? "\t\t" : refInfo.ar13 + "\t";
  emrArray[41] = refInfo.ar14 == null ? "\t\t" : refInfo.ar14 + "\t";
  emrArray[42] = refInfo.ar15 == null ? "\t\t" : refInfo.ar15 + "\t";
  emrArray[43] = "*!";


  ipc.send('finalRx', emrArray)
  // $.ajax({
  //     url: "/final-send",
  //     type: "post",
  //     data: {
  //         finalInfo: emrArray,
  //         encounter: refInfo.pt_id,
  //         location: refInfo.store_location_id
  //     },
  //     success: data => {
  //         alert("Successfully submitted.");
  //         window.location.href = "/tech-home";
  //     },
  //     error: data => alert("Could not submit")
  // });
  window.location.href = "../home.html"
}

function ascii_to_hexa(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push("%" + hex);
  }
  return arr1.join("");
}




function masterMarcoPhoropter(data) {
  // console.log(data)
  send_to_phor = "";
  converted_hex = "";

  for (const [key, value] of Object.entries(data)) {
    if (value != null) {
      converted_hex += ascii_to_hexa(value) + "%0d";
    }
  }

  send_to_phor = "%01%44%52%54%02" + converted_hex + "%04";

  console.log(data.refInfo);
  // console.log(converted_hex);
  // console.log(send_to_phor);
  // serialDevices[1].write(decodeURIComponent(send_to_phor));
  ipc.send('phoropterChange', decodeURIComponent(send_to_phor));
}