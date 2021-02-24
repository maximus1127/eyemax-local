var changeAmount = 0.25;
var axisChangeAmount = 1;
var subjectiveData = [];
var staticSubjective = [];
var staticFinal = [];
var finalData = [];
var finalPush = 0;
var numeral = require('numeral');

// reset command: [0x01, 0x00, 0x2B, 0x01]

var specData = [
  numeral(refInfo.la01).format("+0.00") * 100,
  numeral(refInfo.la05).format("+0.00") * 100,
  numeral(refInfo.la02).format("+0.00") * 100,
  numeral(refInfo.la06).format("+0.00") * 100,
  numeral(refInfo.la03).format("000"),
  numeral(refInfo.la07).format("000"),
  numeral(refInfo.la04).format("+0.00") * 100,
  numeral(refInfo.la08).format("+0.00") * 100
];

var arData = [
  numeral(refInfo.ar02).format("+0.00") * 100,
  numeral(refInfo.ar05).format("+0.00") * 100,
  numeral(refInfo.ar03).format("+0.00") * 100,
  numeral(refInfo.ar06).format("+0.00") * 100,
  numeral(refInfo.ar04).format("000"),
  numeral(refInfo.ar07).format("000")
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
var curEye = "";
var axisOD = null;
var axisOS = null;
var jccStatus = 1;
var jccMode = 0;
var addMode = false;
$(document).keydown(function (event) {
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
        odByte = byteData[numeral(odSph).format("+0.00") * 100];
        osByte = byteData[numeral(osSph).format("+0.00") * 100];


        dataToSend = [0x04, 0x00, 0x40, odByte.hb, odByte.lb, osByte.hb, osByte.lb];
        masterMarcoPhoropter([dataToSend]);
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

        thisByte = byteData[numeral(curPow).format("+0.00") * 100]
        if (curEye == "od") {
          thisByte.numBytes == 0x02 ? dataToSend = [0x02, 0x00, 0x40, thisByte.hb, thisByte.lb] : dataToSend = [0x01, 0x00, 0x40, thisByte.hb]
        } else {
          thisByte.numBytes == 0x02 ? dataToSend = [0x02, 0x00, 0x42, thisByte.hb, thisByte.lb] : dataToSend = [0x01, 0x00, 0x42, thisByte.hb]
        }
        masterMarcoPhoropter([dataToSend]);
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
        odByte = byteData[numeral(odSph).format("+0.00") * 100];
        osByte = byteData[numeral(osSph).format("+0.00") * 100];
        dataToSend = [0x04, 0x00, 0x40, odByte.hb, odByte.lb, osByte.hb, osByte.lb];
        masterMarcoPhoropter([dataToSend]);
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
        thisByte = byteData[numeral(curPow).format("+0.00") * 100]
        if (curEye == "od") {
          thisByte.numBytes == 0x02 ? dataToSend = [0x02, 0x00, 0x40, thisByte.hb, thisByte.lb] : dataToSend = [0x01, 0x00, 0x40, thisByte.hb]
        } else {
          thisByte.numBytes == 0x02 ? dataToSend = [0x02, 0x00, 0x42, thisByte.hb, thisByte.lb] : dataToSend = [0x01, 0x00, 0x42, thisByte.hb]
        }
        masterMarcoPhoropter([dataToSend]);
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

          // dataToSend = ["RS" + numeral(curSph).format("+00.00")];
          thisByte = byteData[numeral(curSph).format("+0.00") * 100]
          dataToSend = [0x02, 0x00, 0x40, thisByte.hb, thisByte.lb]
          masterMarcoPhoropter([dataToSend]);
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
          thisByte = byteData[numeral(curSph).format("+0.00") * 100]
          dataToSend = [0x02, 0x00, 0x42, thisByte.hb, thisByte.lb]
          masterMarcoPhoropter([dataToSend]);
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
      thisByte = byteData[numeral(curPow).format("+0.00") * 100]
      if (curEye == "od") {
        dataToSend = [0x02, 0x00, 0x44, thisByte.hb, thisByte.lb]
      } else {
        dataToSend = [0x02, 0x00, 0x46, thisByte.hb, thisByte.lb]
      }
      masterMarcoPhoropter([dataToSend]);
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
          thisByte = byteData[numeral(curSph).format("+0.00") * 100]
          dataToSend = [0x02, 0x00, 0x40, thisByte.hb, thisByte.lb]
          masterMarcoPhoropter([dataToSend]);
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
          thisByte = byteData[numeral(curSph).format("+0.00") * 100]
          dataToSend = [0x02, 0x00, 0x42, thisByte.hb, thisByte.lb]
          masterMarcoPhoropter([dataToSend]);
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
      thisByte = byteData[numeral(curPow).format("+0.00") * 100]
      if (curEye == "od") {
        dataToSend = [0x02, 0x00, 0x44, thisByte.hb, thisByte.lb]
      } else {
        dataToSend = [0x02, 0x00, 0x46, thisByte.hb, thisByte.lb]
      }
      masterMarcoPhoropter([dataToSend]);
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
        dataToSend = [0x01, 0x00, 0x48, parseInt("0x" + numeral(curPow).format("000"))]
        // dataToSend = ["RA" + numeral(curPow).format("000")];
      } else {
        dataToSend = [0x01, 0x00, 0x49, parseInt("0x" + numeral(curPow).format("000"))]
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
      masterMarcoPhoropter([dataToSend]);
      // dataToSend = [0x01, 0x00, 0x40, thisByte.hb]

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
        dataToSend = [0x01, 0x00, 0x48, parseInt("0x" + numeral(curPow).format("000"))]
        // dataToSend = ["RA" + numeral(curPow).format("000")];
      } else {
        dataToSend = [0x01, 0x00, 0x49, parseInt("0x" + numeral(curPow).format("000"))]
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
      masterMarcoPhoropter([dataToSend]);
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
      odAdd = numeral(parseFloat($(phorButtons[12]).html()) + parseFloat($(phorButtons[3]).html())).format("+0.00") * 100;
      osAdd = numeral(parseFloat($(phorButtons[14]).html()) + parseFloat($(phorButtons[5]).html())).format("+0.00") * 100;
      if (addMode) {
        masterMarcoPhoropter([
          [0x04, 0x00, 0x40, byteData[odAdd].hb, byteData[odAdd].lb, byteData[osAdd].hb, byteData[osAdd].lb]
        ])
      }
    }
    if (event.which == 107) {
      curPow = parseFloat($(phorButtons[14]).html());
      curPow += changeAmount;
      $(".ref-data-active .odAdd").html(numeral(curPow).format("+0.00"));
      $(".ref-data-active .osAdd").html(numeral(curPow).format("+0.00"));
      $(phorButtons[12]).html(numeral(curPow).format("+0.00"));
      $(phorButtons[14]).html(numeral(curPow).format("+0.00"));
      odAdd = numeral(parseFloat($(phorButtons[12]).html()) + parseFloat($(phorButtons[3]).html())).format("+0.00") * 100;
      osAdd = numeral(parseFloat($(phorButtons[14]).html()) + parseFloat($(phorButtons[5]).html())).format("+0.00") * 100;
      if (addMode) {
        masterMarcoPhoropter([
          [0x04, 0x00, 0x40, byteData[odAdd].hb, byteData[odAdd].lb, byteData[osAdd].hb, byteData[osAdd].lb]
        ])
      }
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
      masterMarcoPhoropter([
        [0x01, 0x00, 0x28, 0x01]
      ]);
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
      // sendData(dataToSend);
      // setTimeout(sendData(["XC0"]), 250);
      masterMarcoPhoropter([
        [0x01, 0x00, 0x28, 0x02]
      ]);
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
      // dataToSend = ["RX00", "LX00", "KSB"];
      // sendData(dataToSend);
      masterMarcoPhoropter([
        [0x01, 0x00, 0x28, 0x00]
      ]);
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
          // sendData(["KAR", jccCurStat, "XM2"]);
          curSide = jccStatus == 1 ? crossCylinderCodes["odSideOne"] : crossCylinderCodes["odSideTwo"]
          masterMarcoPhoropter([
            [0x01, 0x00, 0x28, curSide]
          ])
          masterMarcoPhoropter([
            [0x01, 0x00, 0x2B, 0x00]
          ])
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
          curSide = jccStatus == 1 ? crossCylinderCodes["osSideOne"] : crossCylinderCodes["osSideTwo"]
          masterMarcoPhoropter([
            [0x01, 0x00, 0x28, curSide]
          ])
          masterMarcoPhoropter([
            [0x01, 0x00, 0x2B, 0x00]
          ])
          // $("#jccOS").css("visibility", "visible");
        }
      } else if (jccMode == 2) {
        rotateAmount = jccStatus == 1 ? -45 : 45
        $("#axisRow").removeClass("cross-cylinder-select");
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
          curSide = jccStatus == 1 ? crossCylinderCodes["odSideOne"] : crossCylinderCodes["odSideTwo"]
          masterMarcoPhoropter([
            [0x01, 0x00, 0x28, curSide]
          ])
          masterMarcoPhoropter([
            [0x01, 0x00, 0x2B, 0x40]
          ])
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
          curSide = jccStatus == 1 ? crossCylinderCodes["osSideOne"] : crossCylinderCodes["osSideTwo"]
          masterMarcoPhoropter([
            [0x01, 0x00, 0x28, curSide]
          ])
          masterMarcoPhoropter([
            [0x01, 0x00, 0x2B, 0x40]
          ])
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
        // sendData(["XC0"]);
        if (curEye == "od") {
          masterMarcoPhoropter([
            [0x01, 0x00, 0x28, 0x01]
          ])
        } else if (curEye == "os") {
          masterMarcoPhoropter([
            [0x01, 0x00, 0x28, 0x02]
          ])
        }
      }
    }

    if (event.which == 110) {
      addMode = !addMode;
      if (addMode) {
        $("#cylRow").removeClass("cross-cylinder-select");
        $("#axisRow").removeClass("cross-cylinder-select");
        $("#addRow").addClass("cross-cylinder-select");
        odAdd = numeral(parseFloat($(phorButtons[12]).html()) + parseFloat($(phorButtons[3]).html())).format("+0.00") * 100;
        osAdd = numeral(parseFloat($(phorButtons[14]).html()) + parseFloat($(phorButtons[5]).html())).format("+0.00") * 100;
        masterMarcoPhoropter([
          [0x04, 0x00, 0x40, byteData[odAdd].hb, byteData[odAdd].lb, byteData[osAdd].hb, byteData[osAdd].lb]
        ])
      } else {
        $("#addRow").removeClass("cross-cylinder-select");
        odAdd = numeral(parseFloat($(phorButtons[3]).html())).format('+0.00') * 100;
        osAdd = numeral(parseFloat($(phorButtons[5]).html())).format("+0.00") * 100;
        masterMarcoPhoropter([
          [0x04, 0x00, 0x40, byteData[odAdd].hb, byteData[odAdd].lb, byteData[osAdd].hb, byteData[osAdd].lb]
        ])
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
          // sendData(["XC1"]);
          masterMarcoPhoropter([

            [0x01, 0x00, 0x28, crossCylinderCodes["odSideOne"]]

          ])
        } else {
          $("#jccOS").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOS")
                        ) + 90}deg)`
          });
          $("#jccOSText").html("Choice 1 (+)");
          // sendData(["XC1"]);
          masterMarcoPhoropter([

            [0x01, 0x00, 0x28, crossCylinderCodes["osSideOne"]]

          ])
        }
      } else if (jccStatus == 2) {
        if (curEye == "od") {
          $("#jccOD").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOD")
                        ) - 90}deg)`
          });
          $("#jccODText").html("Choice 2 (-)");
          // sendData(["XC2"]);
          masterMarcoPhoropter([

            [0x01, 0x00, 0x28, crossCylinderCodes["odSideTwo"]]

          ])
        } else {
          $("#jccOS").css({
            transform: `rotate(${getRotationAngle(
                            document.getElementById("jccOS")
                        ) - 90}deg)`
          });
          $("#jccOSText").html("Choice 2 (-)");
          // sendData(["XC2"]);
          masterMarcoPhoropter([

            [0x01, 0x00, 0x28, crossCylinderCodes["osSideTwo"]]

          ])
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

$(document).keyup(function (event) {
  if (event.which == 96) {
    changeAmount = 0.25;
    axisChangeAmount = 1;
  }
});

$(document).ready(function () {
  //for some reason, the phoropter does not like it when the line below assigning the class is active. tech will have to manually select OD/OS first.
  // $(".odButtons").addClass("phorEyeActive");
  buildStaticArrays();
  createSubjectiveDataArray();
  sphEqOD = parseFloat($(phorButtons[6]).html());
  sphEqOS = parseFloat($(phorButtons[8]).html());
  axisOD = parseFloat($(phorButtons[9]).html());
  axisOS = parseFloat($(phorButtons[11]).html());
  // setTimeout(sendData(["RX00", "LX01", "PD" + refInfo.ar01]), 5000);
});

$(".ref-data").click(function (d) {
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
    $(phorButtons[3]).html(numeral(arData[0] / 100).format('+0.00'));
    $(phorButtons[6]).html(numeral(arData[2] / 100).format('+0.00'));
    $(phorButtons[9]).html(arData[4]);
    $(phorButtons[5]).html(numeral(arData[1] / 100).format('+0.00'));
    $(phorButtons[8]).html(numeral(arData[3] / 100).format('+0.00'));
    $(phorButtons[11]).html(arData[5]);
    firstHalfOfFullRX = [0x08, 0x00, 0x40, byteData[arData[0]].hb, byteData[arData[0]].lb, byteData[arData[1]].hb, byteData[arData[1]].lb, byteData[arData[2]].hb, byteData[arData[2]].lb, byteData[arData[3]].hb, byteData[arData[3]].lb]
    secondHalfOfFullRX = [0x02, 0x00, 0x48, parseInt("0x" + arData[4]), parseInt("0x" + arData[5])]

    masterMarcoPhoropter([firstHalfOfFullRX, secondHalfOfFullRX]);
  }
  if (rx == "specRx") {
    $(phorButtons[3]).html(numeral(specData[0] / 100).format('+0.00'));
    $(phorButtons[6]).html(numeral(specData[2] / 100).format('+0.00'));
    $(phorButtons[9]).html(specData[4]);
    $(phorButtons[12]).html(numeral(specData[6] / 100).format('+0.00'));
    $(phorButtons[5]).html(numeral(specData[1] / 100).format('+0.00'));
    $(phorButtons[8]).html(numeral(specData[3] / 100).format('+0.00'));
    $(phorButtons[11]).html(specData[5]);
    $(phorButtons[14]).html(numeral(specData[7] / 100).format('+0.00'));
    firstHalfOfFullRX = [0x08, 0x00, 0x40, byteData[specData[0]].hb, byteData[specData[0]].lb, byteData[specData[1]].hb, byteData[specData[1]].lb, byteData[specData[2]].hb, byteData[specData[2]].lb, byteData[specData[3]].hb, byteData[specData[3]].lb]
    secondHalfOfFullRX = [0x02, 0x00, 0x48, parseInt("0x" + specData[4]), parseInt("0x" + specData[5])]

    masterMarcoPhoropter([firstHalfOfFullRX, secondHalfOfFullRX]);
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

$("#plano_button").click(function () {
  $("*").removeClass("ref-data-active");
  $(phorButtons[3]).html(plano[0]);
  $(phorButtons[6]).html(plano[1]);
  $(phorButtons[9]).html(plano[2]);
  $(phorButtons[12]).html(subjectiveData[7]);
  $(phorButtons[5]).html(plano[0]);
  $(phorButtons[8]).html(plano[1]);
  $(phorButtons[11]).html(plano[2]);
  $(phorButtons[14]).html(subjectiveData[8]);
  masterMarcoPhoropter([0x08, 0x00, 0x40, byteData["0"].hb, byteData["0"].lb, byteData["0"].hb, byteData["0"].lb, byteData["0"].hb, byteData["0"].lb, byteData["0"].hb, byteData["0"].lb]);
});

function createSubjectiveDataArray() {
  subjectiveData = [];
  //cycle through all button values and create an array based on button html
  $(".phorButton").each(function (e) {
    if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
      if (e != 9 && e != 11) {
        subjectiveData.push(
          numeral($(this).html()).format("+0.00")
        );
      } else {
        subjectiveData.push(
          numeral($(this).html() == "180" ? "000" : $(this).html()).format("000")
        );
      }
    }
  });
  tempOdSph = numeral($('.phorButton').eq(3).html()).format("+0.00") * 100;
  tempOsSph = numeral($('.phorButton').eq(5).html()).format("+0.00") * 100;
  tempOdCyl = numeral($('.phorButton').eq(6).html()).format("+0.00") * 100;
  tempOsCyl = numeral($('.phorButton').eq(8).html()).format("+0.00") * 100;
  tempOdAxis = numeral($('.phorButton').eq(9).html()).format("000");
  tempOsAxis = numeral($('.phorButton').eq(11).html()).format("000");
  tempOdCyl = numeral($('.phorButton').eq(12).html()).format("+0.00") * 100;
  tempOsCyl = numeral($('.phorButton').eq(13).html()).format("+0.00") * 100;
  firstHalfOfFullRX = [0x08, 0x00, 0x40, byteData[tempOdSph].hb, byteData[tempOdSph].lb, byteData[tempOsSph].hb, byteData[tempOsSph].lb, byteData[tempOdCyl].hb, byteData[tempOdCyl].lb, byteData[tempOsCyl].hb, byteData[tempOsCyl].lb]
  secondHalfOfFullRX = [0x02, 0x00, 0x48, parseInt("0x" + tempOdAxis), parseInt("0x" + tempOsAxis)]

  masterMarcoPhoropter([firstHalfOfFullRX, secondHalfOfFullRX]);
}


function createFinalDataArray() {
  finalData = [];
  $(".phorButton").each(function (e) {
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
  tempOdSph = numeral($('.phorButton').eq(3).html()).format("+0.00") * 100;
  tempOsSph = numeral($('.phorButton').eq(5).html()).format("+0.00") * 100;
  tempOdCyl = numeral($('.phorButton').eq(6).html()).format("+0.00") * 100;
  tempOsCyl = numeral($('.phorButton').eq(8).html()).format("+0.00") * 100;
  tempOdAxis = numeral($('.phorButton').eq(9).html()).format("000");
  tempOsAxis = numeral($('.phorButton').eq(11).html()).format("000");
  tempOdCyl = numeral($('.phorButton').eq(12).html()).format("+0.00") * 100;
  tempOsCyl = numeral($('.phorButton').eq(13).html()).format("+0.00") * 100;
  firstHalfOfFullRX = [0x08, 0x00, 0x40, byteData[tempOdSph].hb, byteData[tempOdSph].lb, byteData[tempOsSph].hb, byteData[tempOsSph].lb, byteData[tempOdCyl].hb, byteData[tempOdCyl].lb, byteData[tempOsCyl].hb, byteData[tempOsCyl].lb]
  secondHalfOfFullRX = [0x02, 0x00, 0x48, parseInt("0x" + tempOdAxis), parseInt("0x" + tempOsAxis)]

  masterMarcoPhoropter([firstHalfOfFullRX, secondHalfOfFullRX]);
}

function buildStaticArrays() {
  if ($("#subjRx").hasClass("ref-data-active")) {
    staticSubjective = [];
    $(".phorButton").each(function (e) {
      if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
        staticSubjective.push($(this).html());
      }
    });
  } else if ($("#finRx").hasClass("ref-data-active")) {
    staticFinal = [];
    $(".phorButton").each(function (e) {
      if (e > 2 && e != 4 && e != 7 && e != 10 && e != 13) {
        staticFinal.push($(this).html());
      }
    });
  }
}

function sendData(data) {
  // console.log(data);
  // ipc.send('phoropterChange', data)
  // masterMarcoPhoropter(data)
  // $.ajax({
  //     url: "/phoropter-sequence",
  //     type: "post",
  //     data: {
  //         refractive_info: data,
  //         location: refInfo.store_location_id
  //     }
  // });
  console.log("console logged from sendata.")
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
  resetDevice();
  window.location.href = "../home.html"
}





function masterMarcoPhoropter(data) {
  // console.log(data)
  for (i = 0; i < data.length; i++) {
    // console.log(data[i])
    ipc.send('phoropterChange', vx55.xor(data[i]));
  }
}

crossCylinderCodes = {
  "odSideOne": 0x15,
  "odSideTwo": 0x1D,
  "osSideOne": 0x12,
  "osSideTwo": 0x1A
}

byteData = {
  "1300": {
    hb: 0x14,
    lb: 0x05,
    numBytes: 0x02
  },
  "1275": {
    hb: 0xFB,
    lb: 0x04,
    numBytes: 0x02
  },
  "1250": {
    hb: 0xE2,
    lb: 0x04,
    numBytes: 0x02
  },
  "1225": {
    hb: 0xC9,
    lb: 0x04,
    numBytes: 0x02
  },
  "1200": {
    hb: 0xB0,
    lb: 0x04,
    numBytes: 0x02
  },
  "1175": {
    hb: 0x97,
    lb: 0x04,
    numBytes: 0x02
  },
  "1150": {
    hb: 0x7E,
    lb: 0x04,
    numBytes: 0x02
  },
  "1125": {
    hb: 0x65,
    lb: 0x04,
    numBytes: 0x02
  },
  "1100": {
    hb: 0x4C,
    lb: 0x04,
    numBytes: 0x02
  },
  "1075": {
    hb: 0x33,
    lb: 0x04,
    numBytes: 0x02
  },
  "1050": {
    hb: 0x1A,
    lb: 0x04,
    numBytes: 0x02
  },
  "1025": {
    hb: 0x01,
    lb: 0x04,
    numBytes: 0x02
  },
  "1000": {
    hb: 0xE8,
    lb: 0x03,
    numBytes: 0x02
  },
  "975": {
    hb: 0xCF,
    lb: 0x03,
    numBytes: 0x02
  },
  "950": {
    hb: 0xB6,
    lb: 0x03,
    numBytes: 0x02
  },
  "925": {
    hb: 0x9D,
    lb: 0x03,
    numBytes: 0x02
  },
  "900": {
    hb: 0x84,
    lb: 0x03,
    numBytes: 0x02
  },
  "875": {
    hb: 0x6B,
    lb: 0x03,
    numBytes: 0x02
  },
  "850": {
    hb: 0x52,
    lb: 0x03,
    numBytes: 0x02
  },
  "825": {
    hb: 0x39,
    lb: 0x03,
    numBytes: 0x02
  },
  "800": {
    hb: 0x20,
    lb: 0x03,
    numBytes: 0x02
  },
  "775": {
    hb: 0x07,
    lb: 0x03,
    numBytes: 0x02
  },
  "750": {
    hb: 0xEE,
    lb: 0x02,
    numBytes: 0x02
  },
  "725": {
    hb: 0xD5,
    lb: 0x02,
    numBytes: 0x02
  },
  "700": {
    hb: 0xBC,
    lb: 0x02,
    numBytes: 0x02
  },
  "675": {
    hb: 0xA3,
    lb: 0x02,
    numBytes: 0x02
  },
  "650": {
    hb: 0x8A,
    lb: 0x02,
    numBytes: 0x02
  },
  "625": {
    hb: 0x71,
    lb: 0x02,
    numBytes: 0x02
  },
  "600": {
    hb: 0x58,
    lb: 0x02,
    numBytes: 0x02
  },
  "575": {
    hb: 0x3F,
    lb: 0x02,
    numBytes: 0x02
  },
  "550": {
    hb: 0x26,
    lb: 0x02,
    numBytes: 0x02
  },
  "525": {
    hb: 0x0D,
    lb: 0x02,
    numBytes: 0x02
  },
  "500": {
    hb: 0xF4,
    lb: 0x01,
    numBytes: 0x02
  },
  "475": {
    hb: 0xDB,
    lb: 0x01,
    numBytes: 0x02
  },
  "450": {
    hb: 0xC2,
    lb: 0x01,
    numBytes: 0x02
  },
  "425": {
    hb: 0xA9,
    lb: 0x01,
    numBytes: 0x02
  },
  "400": {
    hb: 0x90,
    lb: 0x01,
    numBytes: 0x02
  },
  "375": {
    hb: 0x77,
    lb: 0x01,
    numBytes: 0x02
  },
  "350": {
    hb: 0x5E,
    lb: 0x01,
    numBytes: 0x02
  },
  "325": {
    hb: 0x45,
    lb: 0x01,
    numBytes: 0x02
  },
  "300": {
    hb: 0x2C,
    lb: 0x01,
    numBytes: 0x02
  },
  "275": {
    hb: 0x13,
    lb: 0x01,
    numBytes: 0x02
  },
  "250": {
    numBytes: 0x01,
    hb: 0xFA,
    lb: 0x00
  },
  "225": {
    numBytes: 0x01,
    hb: 0xE1,
    lb: 0x00
  },
  "200": {
    numBytes: 0x01,
    hb: 0xC8,
    lb: 0x00
  },
  "175": {
    numBytes: 0x01,
    hb: 0xAF,
    lb: 0x00
  },
  "150": {
    numBytes: 0x01,
    hb: 0x96,
    lb: 0x00
  },
  "125": {
    numBytes: 0x01,
    hb: 0x7D,
    lb: 0x00
  },
  "100": {
    numBytes: 0x01,
    hb: 0x64,
    lb: 0x00
  },
  "75": {
    numBytes: 0x01,
    hb: 0x4B,
    lb: 0x00
  },
  "50": {
    numBytes: 0x01,
    hb: 0x32,
    lb: 0x00
  },
  "25": {
    numBytes: 0x01,
    hb: 0x19,
    lb: 0x00
  },
  "0": {
    numBytes: 0x02,
    hb: 0x00,
    lb: 0x00
  },
  "-25": {
    numBytes: 0x02,
    hb: 0x19,
    lb: 0x80
  },
  "-50": {
    numBytes: 0x02,
    hb: 0x32,
    lb: 0x80
  },
  "-75": {
    numBytes: 0x02,
    hb: 0x4B,
    lb: 0x80
  },
  "-100": {
    numBytes: 0x02,
    hb: 0x64,
    lb: 0x80
  },
  "-125": {
    numBytes: 0x02,
    hb: 0x7D,
    lb: 0x80
  },
  "-150": {
    numBytes: 0x02,
    hb: 0x96,
    lb: 0x80
  },
  "-175": {
    numBytes: 0x02,
    hb: 0xAF,
    lb: 0x80
  },
  "-200": {
    numBytes: 0x02,
    hb: 0xC8,
    lb: 0x80
  },
  "-225": {
    numBytes: 0x02,
    hb: 0xE1,
    lb: 0x80
  },
  "-250": {
    numBytes: 0x02,
    hb: 0xFA,
    lb: 0x80
  },
  "-275": {
    numBytes: 0x02,
    hb: 0x13,
    lb: 0x81
  },
  "-300": {
    numBytes: 0x02,
    hb: 0x2C,
    lb: 0x81
  },
  "-325": {
    numBytes: 0x02,
    hb: 0x45,
    lb: 0x81
  },
  "-350": {
    numBytes: 0x02,
    hb: 0x5E,
    lb: 0x81
  },
  "-375": {
    numBytes: 0x02,
    hb: 0x77,
    lb: 0x81
  },
  "-400": {
    numBytes: 0x02,
    hb: 0x90,
    lb: 0x81
  },
  "-425": {
    numBytes: 0x02,
    hb: 0xA9,
    lb: 0x81
  },
  "-450": {
    numBytes: 0x02,
    hb: 0xC2,
    lb: 0x81
  },
  "-475": {
    numBytes: 0x02,
    hb: 0xDB,
    lb: 0x81
  },
  "-500": {
    numBytes: 0x02,
    hb: 0xF4,
    lb: 0x81
  },
  "-525": {
    numBytes: 0x02,
    hb: 0x0D,
    lb: 0x82
  },
  "-550": {
    numBytes: 0x02,
    hb: 0x26,
    lb: 0x82
  },
  "-575": {
    numBytes: 0x02,
    hb: 0x3F,
    lb: 0x82
  },
  "-600": {
    numBytes: 0x02,
    hb: 0x58,
    lb: 0x82
  },
  "-625": {
    numBytes: 0x02,
    hb: 0x71,
    lb: 0x82
  },
  "-650": {
    numBytes: 0x02,
    hb: 0x8A,
    lb: 0x82
  },
  "-675": {
    numBytes: 0x02,
    hb: 0xA3,
    lb: 0x82
  },
  "-700": {
    numBytes: 0x02,
    hb: 0xBC,
    lb: 0x82
  },
  "-725": {
    numBytes: 0x02,
    hb: 0xD5,
    lb: 0x82
  },
  "-750": {
    numBytes: 0x02,
    hb: 0xEE,
    lb: 0x82
  },
  "-775": {
    numBytes: 0x02,
    hb: 0x07,
    lb: 0x83
  },
  "-800": {
    numBytes: 0x02,
    hb: 0x20,
    lb: 0x83
  },
  "-825": {
    numBytes: 0x02,
    hb: 0x39,
    lb: 0x83
  },
  "-850": {
    numBytes: 0x02,
    hb: 0x52,
    lb: 0x83
  },
  "-875": {
    numBytes: 0x02,
    hb: 0x6B,
    lb: 0x83
  },
  "-900": {
    numBytes: 0x02,
    hb: 0x84,
    lb: 0x83
  },
  "-925": {
    numBytes: 0x02,
    hb: 0x9D,
    lb: 0x83
  },
  "-950": {
    numBytes: 0x02,
    hb: 0xB6,
    lb: 0x83
  },
  "-975": {
    numBytes: 0x02,
    hb: 0xCF,
    lb: 0x83
  },
  "-1000": {
    numBytes: 0x02,
    hb: 0xE8,
    lb: 0x83
  },
  "-1025": {
    numBytes: 0x02,
    hb: 0x01,
    lb: 0x84
  },
  "-1050": {
    numBytes: 0x02,
    hb: 0x1A,
    lb: 0x84
  },
  "-1075": {
    numBytes: 0x02,
    hb: 0x33,
    lb: 0x84
  },
  "-1100": {
    numBytes: 0x02,
    hb: 0x4C,
    lb: 0x84
  },
  "-1125": {
    numBytes: 0x02,
    hb: 0x65,
    lb: 0x84
  },
  "-1150": {
    numBytes: 0x02,
    hb: 0x7E,
    lb: 0x84
  },
  "-1175": {
    numBytes: 0x02,
    hb: 0x97,
    lb: 0x84
  },
  "-1200": {
    numBytes: 0x02,
    hb: 0xB0,
    lb: 0x84
  },
  "-1225": {
    numBytes: 0x02,
    hb: 0xC9,
    lb: 0x84
  },
  "-1250": {
    numBytes: 0x02,
    hb: 0xE2,
    lb: 0x84
  },
  "-1275": {
    numBytes: 0x02,
    hb: 0xFB,
    lb: 0x84
  },
  "-1300": {
    numBytes: 0x02,
    hb: 0x14,
    lb: 0x85
  }
}

function resetDevice() {
  masterMarcoPhoropter([
    [0x01, 0x00, 0x2B, 0x01]
  ])
}