var letters = [" C", " D", " H", " K", " N", " O", " R", " S", " V", " Z"];
var numbers = [" 1", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", " 5"];
var ees = [" d", " j", " i", " e", " d", " j", " i", " e", " i", " j"];
var pictures = [
    " k",
    " h",
    " f",
    " g",
    " b",
    " c",
    " k",
    " h",
    " f",
    " g",
    " b",
    " c"
];
var hotv = [" H", " O", " T", " V"];
var image = letters;
var fontType = true;
var hotvActive = false;
var singleLetter = false;
var colorMode = false;
var currentLine;

ipc.on('vision-changed', (e, data) => {
    console.log(data)
    switch (data.size) {
        case 10:
            currentLine = 14;
            break;
        case 15:
            currentLine = 13;
            break;
        case 20:
            currentLine = 12;
            break;
        case 25:
            currentLine = 11;
            break;
        case 30:
            currentLine = 10;
            break;
        case 40:
            currentLine = 9;
            break;
        case 50:
            currentLine = 8;
            break;
        case 60:
            currentLine = 7;
            break;
        case 70:
            currentLine = 6;
            break;
        case 80:
            currentLine = 5;
            break;
        case 100:
            currentLine = 4;
            break;
        case 200:
            currentLine = 3;
            break;
        case 300:
            currentLine = 2;
            break;
        case 400:
            currentLine = 1;
            break;
        case 400200:
            currentLine = 15;
            break;
        case 1008070:
            currentLine = 16;
            break;
        case 605040:
            currentLine = 17;
            break;
        case 302520:
            currentLine = 18;
            break;
        case 6020:
            currentLine = 19;
            break;
    }

    // if (data.size.toString().includes("solo")) {
    //     $(".soloLine").each(function(e) {
    //         // console.log($(this).data('size'))
    //         if ($(this).data("size") == data.size) {
    //             $(this).css("background-color", "#e0e0e0");
    //         } else {
    //             $(this).css("background-color", "");
    //         }
    //     });
    // }

    // var socket = io('http://' + location.hostname + ':8000');
    // socket.on('private-default:App\\Events\\EventWasTriggered', function(data){

    var number = data.size;
    var size = data.numbers;
    var numbers2 = data.numbers2;
    var numbers3 = data.numbers3;
    var numbers4 = data.numbers4;
    var numbers5 = data.numbers5;
    var numbers6 = data.numbers6;
    // console.log(data);
    if (data.size == "singleFilter") {
        singleLetter = !singleLetter;
        // console.log(singleLetter);
        if (singleLetter == true) {
            $("#singleFilter").removeClass("singleFilter");
            $("#singleFilter").addClass("singleFilterActive");
        } else {
            $("#singleFilter").removeClass("singleFilterActive");
            $("#singleFilter").addClass("singleFilter");
        }
        $(".lineButtonActive").trigger("click");
    }

    if (data.size == "circles") {
        clear();
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $("*.modeButtonActive").removeClass("modeButtonActive");
        $("#circles").addClass("modeButtonActive");
        $("#line1").html(
            "<img src='../images/astig-dots.png' style='width: 110px; height: 110px'>"
        );
    }

    if (data.size == "retinoscopy") {
        clear();
        $("#retinoscopy").removeClass("retinoscopy");
        $("#retinoscopy").addClass("retinoscopyActive");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $("#line1").html("");
    }
    if (data.size == "colorPlates") {
        clear();
        if (colorMode == false) {
            $("#retinoscopy").removeClass("retinoscopyActive");
            $("*.modeButtonActive").removeClass("modeButtonActive");
            $("*.lineButtonActive").removeClass("lineButtonActive");
            $("#sizeHolder").css("display", "none");
            $("#colorHolder").css("display", "block");
            $("#colorPlates").toggleClass("modeButtonActive");
        } else {
            $("#colorPlates").toggleClass("modeButtonActive");
            $("#sizeHolder").css("display", "block");
            $("#colorHolder").css("display", "none");
        }
        colorMode = !colorMode;
    }

    if (data.size == "cp12") {
        $("#line1").html("12");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp8") {
        $("#line1").html("8");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp29") {
        $("#line1").html("29");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp51") {
        $("#line1").html("5");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp3") {
        $("#line1").html("3");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp15") {
        $("#line1").html("15");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp74") {
        $("#line1").html("74");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp6") {
        $("#line1").html("6");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp45") {
        $("#line1").html("45");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp5") {
        $("#line1").html("5");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp7") {
        $("#line1").html("7");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp16") {
        $("#line1").html("16");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp73") {
        $("#line1").html("73");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp26") {
        $("#line1").html("26");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }
    if (data.size == "cp42") {
        $("#line1").html("42");
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    }

    if (data.size == "refresh") {
        location.reload();
    }
    if (
        data.size == 10 ||
        data.size == 15 ||
        data.size == 20 ||
        data.size == 25 ||
        data.size == 30 ||
        data.size == 40 ||
        data.size == 50 ||
        data.size == 60 ||
        data.size == 70
    ) {
        clear();
        // console.log(data.hotv);
        $("#line1").html(data.numbers)
        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[1]] +
                "'/> <img src='/images/" +
                image[size[2]] +
                "' /> <img src='/images/" +
                image[size[3]] +
                "' /> <img src='/images/" +
                image[size[4]] +
                "' /> <img src='/images/" +
                image[size[0]] +
                "' />"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[1]] +
                " " +
                image[size[2]] +
                " " +
                image[size[3]] +
                " " +
                image[size[4]] +
                " " +
                image[size[0]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]] +
                " " +
                image[data.hotv[3]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
        }

        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 80) {
        clear();
        $("#line1").html(data.numbers)
        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[1]] +
                "'/> <img src='/images/" +
                image[size[2]] +
                "' /> <img src='/images/" +
                image[size[3]] +
                "' /> <img src='/images/" +
                image[size[4]] +
                "' />"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[1]] +
                " " +
                image[size[2]] +
                " " +
                image[size[3]] +
                " " +
                image[size[4]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]] +
                " " +
                image[data.hotv[3]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 100) {
        clear();
        $("#line1").html(data.numbers)
        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[1]] +
                "'/> <img src='/images/" +
                image[size[2]] +
                "' /> <img src='/images/" +
                image[size[3]] +
                "'/>"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[1]] + " " + image[size[2]] + " " + image[size[3]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 200) {
        clear();
        $("#line1").html(data.numbers)
        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[1]] +
                "'/> <img src='/images/" +
                image[size[2]] +
                "'/>"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(image[size[1]] + " " + image[size[2]]);
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] + " " + image[data.hotv[1]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 300 || data.size == 400) {
        clear();
        $("#line1").html(data.numbers)
        if (fontType == false && singleLetter == false) {
            $("#line1").html("<img src='/images/" + image[size[1]] + "'/>");
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(image[size[1]]);
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(image[data.hotv[0]]);
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 400200) {
        clear();
        $("#line1size").html("20/400");
        $("#line2size").html("20/200");

        if (fontType == false && singleLetter == false) {
            $("#line1").html("<img src='/images/" + image[size[1]] + "'/>");
            $("#line2").html(
                "<img src='/images/" +
                image[numbers2[0]] +
                "'/> <img src='/images/" +
                image[numbers2[1]] +
                "'/>"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(image[size[1]]);
            $("#line2").html(image[numbers2[0]] + " " + image[numbers2[1]]);
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
            $("#line2").html(
                "<img src='/images/" + image[size[2]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
            $("#line2").html(image[size[2]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(image[data.hotv[0]]);
            $("#line2").html(
                image[data.hotv2[0]] + " " + image[data.hotv2[1]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
            $("#line2").html(image[data.hotv2[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");

        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 1008070) {
        clear();
        $("#line1size").html("20/100");
        $("#line2size").html("20/80");
        $("#line3size").html("20/70");
        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[1]] +
                "'/> <img src='/images/" +
                image[size[2]] +
                "' /> <img src='/images/" +
                image[size[3]] +
                "'/>"
            );
            $("#line2").html(
                "<img src='/images/" +
                image[numbers2[0]] +
                "'/> <img src='/images/" +
                image[numbers2[1]] +
                "' /> <img src='/images/" +
                image[numbers2[2]] +
                "' /> <img src='/images/" +
                image[numbers2[3]] +
                "' />"
            );
            $("#line3").html(
                "<img src='/images/" +
                image[numbers3[0]] +
                "'/> <img src='/images/" +
                image[numbers3[1]] +
                "' /> <img src='/images/" +
                image[numbers3[2]] +
                "' /> <img src='/images/" +
                image[numbers3[3]] +
                "' /> <img src='/images/" +
                image[numbers3[4]] +
                "' />"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[1]] + " " + image[size[2]] + " " + image[size[3]]
            );
            $("#line2").html(
                image[numbers2[0]] +
                " " +
                image[numbers2[1]] +
                " " +
                image[numbers2[2]] +
                " " +
                image[numbers2[3]]
            );
            $("#line3").html(
                image[numbers3[0]] +
                " " +
                image[numbers3[1]] +
                " " +
                image[numbers3[2]] +
                " " +
                image[numbers3[3]] +
                " " +
                image[numbers3[4]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
            $("#line2").html(
                "<img src='/images/" + image[size[2]] + "'/> "
            );
            $("#line3").html(
                "<img src='/images/" + image[size[3]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
            $("#line2").html(image[size[2]]);
            $("#line3").html(image[size[3]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]]
            );
            $("#line2").html(
                image[data.hotv2[0]] +
                " " +
                image[data.hotv2[1]] +
                " " +
                image[data.hotv2[2]] +
                " " +
                image[data.hotv2[3]]
            );
            $("#line3").html(
                image[data.hotv3[0]] +
                " " +
                image[data.hotv3[1]] +
                " " +
                image[data.hotv3[2]] +
                " " +
                image[data.hotv3[3]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
            $("#line2").html(image[data.hotv2[0]]);
            $("#line3").html(image[data.hotv3[0]]);
        }

        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 605040) {
        clear();
        $("#line1size").html("20/60");
        $("#line2size").html("20/50");
        $("#line3size").html("20/40");
        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[0]] +
                "'/> <img src='/images/" +
                image[size[1]] +
                "' /> <img src='/images/" +
                image[size[2]] +
                "'/> <img src='/images/" +
                image[size[3]] +
                "'/> <img src='/images/" +
                image[size[4]] +
                "'/>"
            );
            $("#line2").html(
                "<img src='/images/" +
                image[numbers2[0]] +
                "'/> <img src='/images/" +
                image[numbers2[1]] +
                "' /> <img src='/images/" +
                image[numbers2[2]] +
                "' /> <img src='/images/" +
                image[numbers2[3]] +
                "' /> <img src='/images/" +
                image[numbers2[4]] +
                "'/>"
            );
            $("#line3").html(
                "<img src='/images/" +
                image[numbers3[0]] +
                "'/> <img src='/images/" +
                image[numbers3[1]] +
                "' /> <img src='/images/" +
                image[numbers3[2]] +
                "' /> <img src='/images/" +
                image[numbers3[3]] +
                "' /> <img src='/images/" +
                image[numbers3[4]] +
                "' />"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[0]] +
                " " +
                image[size[1]] +
                " " +
                image[size[2]] +
                " " +
                image[size[3]] +
                " " +
                image[size[4]]
            );
            $("#line2").html(
                image[numbers2[0]] +
                " " +
                image[numbers2[1]] +
                " " +
                image[numbers2[2]] +
                " " +
                image[numbers2[3]] +
                " " +
                image[numbers2[4]]
            );
            $("#line3").html(
                image[numbers3[0]] +
                " " +
                image[numbers3[1]] +
                " " +
                image[numbers3[2]] +
                " " +
                image[numbers3[3]] +
                " " +
                image[numbers3[4]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
            $("#line2").html(
                "<img src='/images/" + image[size[2]] + "'/> "
            );
            $("#line3").html(
                "<img src='/images/" + image[size[3]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
            $("#line2").html(image[size[2]]);
            $("#line3").html(image[size[3]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]] +
                " " +
                image[data.hotv[3]]
            );
            $("#line2").html(
                image[data.hotv2[0]] +
                " " +
                image[data.hotv2[1]] +
                " " +
                image[data.hotv2[2]] +
                " " +
                image[data.hotv2[3]]
            );
            $("#line3").html(
                image[data.hotv3[0]] +
                " " +
                image[data.hotv3[1]] +
                " " +
                image[data.hotv3[2]] +
                " " +
                image[data.hotv3[3]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
            $("#line2").html(image[data.hotv2[0]]);
            $("#line3").html(image[data.hotv3[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 302520) {
        clear();
        $("#line1size").html("20/30");
        $("#line2size").html("20/25");
        $("#line3size").html("20/20");

        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[0]] +
                "'/> <img src='/images/" +
                image[size[1]] +
                "' /> <img src='/images/" +
                image[size[2]] +
                "'/> <img src='/images/" +
                image[size[3]] +
                "'/> <img src='/images/" +
                image[size[4]] +
                "'/>"
            );
            $("#line2").html(
                "<img src='/images/" +
                image[numbers2[0]] +
                "'/> <img src='/images/" +
                image[numbers2[1]] +
                "' /> <img src='/images/" +
                image[numbers2[2]] +
                "' /> <img src='/images/" +
                image[numbers2[3]] +
                "' /> <img src='/images/" +
                image[numbers2[4]] +
                "'/>"
            );
            $("#line3").html(
                "<img src='/images/" +
                image[numbers3[0]] +
                "'/> <img src='/images/" +
                image[numbers3[1]] +
                "' /> <img src='/images/" +
                image[numbers3[2]] +
                "' /> <img src='/images/" +
                image[numbers3[3]] +
                "' /> <img src='/images/" +
                image[numbers3[4]] +
                "' />"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[0]] +
                " " +
                image[size[1]] +
                " " +
                image[size[2]] +
                " " +
                image[size[3]] +
                " " +
                image[size[4]]
            );
            $("#line2").html(
                image[numbers2[0]] +
                " " +
                image[numbers2[1]] +
                " " +
                image[numbers2[2]] +
                " " +
                image[numbers2[3]] +
                " " +
                image[numbers2[4]]
            );
            $("#line3").html(
                image[numbers3[0]] +
                " " +
                image[numbers3[1]] +
                " " +
                image[numbers3[2]] +
                " " +
                image[numbers3[3]] +
                " " +
                image[numbers3[4]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
            $("#line2").html(
                "<img src='/images/" + image[size[2]] + "'/> "
            );
            $("#line3").html(
                "<img src='/images/" + image[size[3]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
            $("#line2").html(image[size[2]]);
            $("#line3").html(image[size[3]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]] +
                " " +
                image[data.hotv[3]]
            );
            $("#line2").html(
                image[data.hotv2[0]] +
                " " +
                image[data.hotv2[1]] +
                " " +
                image[data.hotv2[2]] +
                " " +
                image[data.hotv2[3]]
            );
            $("#line3").html(
                image[data.hotv3[0]] +
                " " +
                image[data.hotv3[1]] +
                " " +
                image[data.hotv3[2]] +
                " " +
                image[data.hotv3[3]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
            $("#line2").html(image[data.hotv2[0]]);
            $("#line3").html(image[data.hotv3[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == 6020) {
        clear();

        $("#line1size").html("20/60");
        $("#line2size").html("20/50");
        $("#line3size").html("20/40");
        $("#line4size").html("20/30");
        $("#line5size").html("20/25");
        $("#line6size").html("20/20");

        if (fontType == false && singleLetter == false) {
            $("#line1").html(
                "<img src='/images/" +
                image[size[0]] +
                "'/> <img src='/images/" +
                image[size[1]] +
                "' /> <img src='/images/" +
                image[size[2]] +
                "'/> <img src='/images/" +
                image[size[3]] +
                "'/> <img src='/images/" +
                image[size[4]] +
                "'/>"
            );
            $("#line2").html(
                "<img src='/images/" +
                image[numbers2[0]] +
                "'/> <img src='/images/" +
                image[numbers2[1]] +
                "' /> <img src='/images/" +
                image[numbers2[2]] +
                "' /> <img src='/images/" +
                image[numbers2[3]] +
                "' /> <img src='/images/" +
                image[numbers2[4]] +
                "'/>"
            );
            $("#line3").html(
                "<img src='/images/" +
                image[numbers3[0]] +
                "'/> <img src='/images/" +
                image[numbers3[1]] +
                "' /> <img src='/images/" +
                image[numbers3[2]] +
                "' /> <img src='/images/" +
                image[numbers3[3]] +
                "' /> <img src='/images/" +
                image[numbers3[4]] +
                "' />"
            );
            $("#line4").html(
                "<img src='/images/" +
                image[numbers4[0]] +
                "'/> <img src='/images/" +
                image[numbers4[1]] +
                "' /> <img src='/images/" +
                image[numbers4[2]] +
                "'/> <img src='/images/" +
                image[numbers4[3]] +
                "'/> <img src='/images/" +
                image[numbers4[4]] +
                "'/>"
            );
            $("#line5").html(
                "<img src='/images/" +
                image[numbers5[0]] +
                "'/> <img src='/images/" +
                image[numbers5[1]] +
                "' /> <img src='/images/" +
                image[numbers5[2]] +
                "' /> <img src='/images/" +
                image[numbers5[3]] +
                "' /> <img src='/images/" +
                image[numbers5[4]] +
                "'/>"
            );
            $("#line6").html(
                "<img src='/images/" +
                image[numbers6[0]] +
                "'/> <img src='/images/" +
                image[numbers6[1]] +
                "' /> <img src='/images/" +
                image[numbers6[2]] +
                "' /> <img src='/images/" +
                image[numbers6[3]] +
                "' /> <img src='/images/" +
                image[numbers6[4]] +
                "' />"
            );
        }
        if (fontType == true && singleLetter == false) {
            $("#line1").html(
                image[size[0]] +
                " " +
                image[size[1]] +
                " " +
                image[size[2]] +
                " " +
                image[size[3]] +
                " " +
                image[size[4]]
            );
            $("#line2").html(
                image[numbers2[0]] +
                " " +
                image[numbers2[1]] +
                " " +
                image[numbers2[2]] +
                " " +
                image[numbers2[3]] +
                " " +
                image[numbers2[4]]
            );
            $("#line3").html(
                image[numbers3[0]] +
                " " +
                image[numbers3[1]] +
                " " +
                image[numbers3[2]] +
                " " +
                image[numbers3[3]] +
                " " +
                image[numbers3[4]]
            );
            $("#line4").html(
                image[numbers4[0]] +
                " " +
                image[numbers4[1]] +
                " " +
                image[numbers4[2]] +
                " " +
                image[numbers4[3]] +
                " " +
                image[numbers4[4]]
            );
            $("#line5").html(
                image[numbers5[0]] +
                " " +
                image[numbers5[1]] +
                " " +
                image[numbers5[2]] +
                " " +
                image[numbers5[3]] +
                " " +
                image[numbers5[4]]
            );
            $("#line6").html(
                image[numbers6[0]] +
                " " +
                image[numbers6[1]] +
                " " +
                image[numbers6[2]] +
                " " +
                image[numbers6[3]] +
                " " +
                image[numbers6[4]]
            );
        }
        if (fontType == false && singleLetter == true) {
            $("#line1").html(
                "<img src='/images/" + image[size[1]] + "'/> "
            );
            $("#line2").html(
                "<img src='/images/" + image[size[2]] + "'/> "
            );
            $("#line3").html(
                "<img src='/images/" + image[size[3]] + "'/> "
            );
            $("#line4").html(
                "<img src='/images/" + image[size[4]] + "'/> "
            );
            $("#line5").html(
                "<img src='/images/" + image[size[0]] + "'/> "
            );
            $("#line6").html(
                "<img src='/images/" + image[size[2]] + "'/> "
            );
        }
        if (fontType == true && singleLetter == true) {
            $("#line1").html(image[size[1]]);
            $("#line2").html(image[size[2]]);
            $("#line3").html(image[size[3]]);
            $("#line4").html(image[size[4]]);
            $("#line5").html(image[size[0]]);
            $("#line6").html(image[size[2]]);
        }
        if (hotvActive == true && singleLetter == false) {
            $("#line1").html(
                image[data.hotv[0]] +
                " " +
                image[data.hotv[1]] +
                " " +
                image[data.hotv[2]] +
                " " +
                image[data.hotv[3]]
            );
            $("#line2").html(
                image[data.hotv2[0]] +
                " " +
                image[data.hotv2[1]] +
                " " +
                image[data.hotv2[2]] +
                " " +
                image[data.hotv2[3]]
            );
            $("#line3").html(
                image[data.hotv3[0]] +
                " " +
                image[data.hotv3[1]] +
                " " +
                image[data.hotv3[2]] +
                " " +
                image[data.hotv3[3]]
            );
            $("#line4").html(
                image[data.hotv4[0]] +
                " " +
                image[data.hotv4[1]] +
                " " +
                image[data.hotv4[2]] +
                " " +
                image[data.hotv4[3]]
            );
            $("#line5").html(
                image[data.hotv5[0]] +
                " " +
                image[data.hotv5[1]] +
                " " +
                image[data.hotv5[2]] +
                " " +
                image[data.hotv5[3]]
            );
            $("#line6").html(
                image[data.hotv6[0]] +
                " " +
                image[data.hotv6[1]] +
                " " +
                image[data.hotv6[2]] +
                " " +
                image[data.hotv6[3]]
            );
        }
        if (hotvActive == true && singleLetter == true) {
            $("#line1").html(image[data.hotv[0]]);
            $("#line2").html(image[data.hotv2[0]]);
            $("#line3").html(image[data.hotv3[0]]);
            $("#line4").html(image[data.hotv4[0]]);
            $("#line5").html(image[data.hotv5[0]]);
            $("#line6").html(image[data.hotv6[0]]);
        }
        $("*.lineButtonActive").removeClass("lineButtonActive");
        $('*[data-size="' + data.size + '"]').toggleClass(
            "lineButtonActive"
        );
    } else if (data.size == "mode1") {
        clear();
        colorMode = false;
        hotvActive = false;
        $("#colorHolder").hide();
        $("#sizeHolder").show();
        // $("#colorPlates").removeClass('colorPlatesActive');
        // $("#colorPlates").addClass("colorPlates");
        $("*.modeButtonActive").removeClass("modeButtonActive");
        $("#singleLetter").addClass("modeButtonActive");
        fontType = true;
        image = letters;
    } else if (data.size == "mode2") {
        clear();
        colorMode = false;
        hotvActive = false;
        $("#colorHolder").hide();
        $("#sizeHolder").show();
        $("#colorPlates").removeClass('colorPlatesActive');
        $("#colorPlates").addClass("colorPlates");
        $("*.modeButtonActive").removeClass("modeButtonActive");
        $("#number").addClass("modeButtonActive");
        fontType = true;
        image = numbers;
    } else if (data.size == "mode3") {
        clear();
        colorMode = false;
        hotvActive = false;
        $("#colorHolder").hide();
        $("#sizeHolder").show();
        // $("#colorPlates").removeClass('colorPlatesActive');
        // $("#colorPlates").addClass("colorPlates");
        $("*.modeButtonActive").removeClass("modeButtonActive");
        $("#tumblingE").addClass("modeButtonActive");
        fontType = true;
        image = ees;
    } else if (data.size == "mode4") {
        clear();
        colorMode = false;
        hotvActive = false;
        $("#colorHolder").hide();
        $("#sizeHolder").show();
        // $("#colorPlates").removeClass('colorPlatesActive');
        // $("#colorPlates").addClass("colorPlates");
        $("*.modeButtonActive").removeClass("modeButtonActive");
        $("#picture").addClass("modeButtonActive");
        fontType = true;
        image = pictures;
    } else if (data.size == "duochrome") {
        $("#duochrome").toggleClass("duochrome");
    } else if (data.size == "mute") {
        $("#mute").toggleClass("duochrome");
    } else if (data.size == "hotv") {
        clear();
        colorMode = false;
        $("#colorHolder").hide();
        $("#sizeHolder").show();
        // $("#colorPlates").removeClass('colorPlatesActive');
        // $("#colorPlates").addClass("colorPlates");
        $("*.modeButtonActive").removeClass("modeButtonActive");
        $("#hotv").addClass("modeButtonActive");
        fontType = true;
        hotvActive = true;
        image = hotv;
    }
});

function clear() {
    $("#line1").html("");
    $("#line2").html("");
    $("#line3").html("");
    $("#line4").html("");
    $("#line5").html("");
    $("#line6").html("");
    $("#line2size").html("");
    $("#line3size").html("");
    $("#line1size").html("");
    $("#line4size").html("");
    $("#line5size").html("");
    $("#line6size").html("");
    $("#retinoscopy")
        .removeClass("retinoscopyActive")
        .addClass("retinoscopy");
    $(".soloLine").each(function () {
        $(this).css("background-color", "");
    });
}

function initialTrigger() {
    $("#singleLetter").trigger("click");
    setTimeout(() => $("#twenty").trigger("click"), 200);
}

$(document).ready(function () {
    // $("body").css("height", screen.height);
    $(".singleButtons").on("click", function () {
        var numbers = $(this).data("size");
        ipc.send('vision-change', {
            size: numbers
        })
    });
});

$("html").on("keydown", function (event) {
    // if (event.which == 13) {
    //     if ($("#instructions").css("display") == "none") {
    //         $("#instructions").css("display", "block");
    //     } else {
    //         $("#instructions").css("display", "none");
    //     }
    // }
    if (event.which == 81) {
        if (colorMode == false) {
            $("#fourHundred").trigger("click");
        } else {
            $("#plate1").trigger("click");
        }
    }
    if (event.which == 87) {
        if (colorMode == false) {
            $("#threeHundred").trigger("click");
        } else {
            $("#plate2").trigger("click");
        }
    }
    if (event.which == 69) {
        if (colorMode == false) {
            $("#twoHundred").trigger("click");
        } else {
            $("#plate3").trigger("click");
        }
    }
    if (event.which == 82) {
        if (colorMode == false) {
            $("#oneHundred").trigger("click");
        } else {
            $("#plate4").trigger("click");
        }
    }
    if (event.which == 84) {
        if (colorMode == false) {
            $("#eighty").trigger("click");
        } else {
            $("#plate5").trigger("click");
        }
    }
    if (event.which == 89) {
        if (colorMode == false) {
            $("#seventy").trigger("click");
        } else {
            $("#plate6").trigger("click");
        }
    }
    if (event.which == 85) {
        if (colorMode == false) {
            $("#sixty").trigger("click");
        } else {
            $("#plate7").trigger("click");
        }
    }
    if (event.which == 73) {
        if (colorMode == false) {
            $("#fifty").trigger("click");
        } else {
            $("#plate8").trigger("click");
        }
    }
    if (event.which == 79) {
        if (colorMode == false) {
            $("#forty").trigger("click");
        } else {
            $("#plate9").trigger("click");
        }
    }
    if (event.which == 80) {
        if (colorMode == false) {
            $("#thirty").trigger("click");
        } else {
            $("#plate10").trigger("click");
        }
    }
    if (event.which == 65) {
        if (colorMode == false) {
            $("#twentyFive").trigger("click");
        } else {
            $("#plate11").trigger("click");
        }
    }
    if (event.which == 83) {
        if (colorMode == false) {
            $("#twenty").trigger("click");
        } else {
            $("#plate12").trigger("click");
        }
    }
    if (event.which == 90) {
        if (colorMode == false) $("#fifteen").trigger("click");
    }
    if (event.which == 88) {
        if (colorMode == false) $("#ten").trigger("click");
    }
    if (event.which == 68) {
        if (colorMode == false) {
            $("#groupOne").trigger("click");
        } else {
            $("#plate13").trigger("click");
        }
    }
    if (event.which == 70) {
        if (colorMode == false) {
            $("#groupTwo").trigger("click");
        } else {
            $("#plate14").trigger("click");
        }
    }
    if (event.which == 71) {
        if (colorMode == false) {
            $("#groupThree").trigger("click");
        } else {
            $("#plate15").trigger("click");
        }
    }
    if (event.which == 72) {
        if (colorMode == false) $("#groupFour").trigger("click");
    }
    if (event.which == 74) {
        if (colorMode == false) $("#groupSix").trigger("click");
    }
    // if (event.which == 49) {
    //     $("#singleLetter").trigger("click");
    // }
    // if (event.which == 50) {
    //     $("#number").trigger("click");
    // }
    // if (event.which == 51) {
    //     $("#tumblingE").trigger("click");
    // }
    // if (event.which == 52) {
    //     $("#picture").trigger("click");
    // }
    if (event.which == 53) {
        $("#duochrome").trigger("click");
    }
    // if (event.which == 54) {
    //     $("#mute").trigger("click");
    // }
    // if (event.which == 189) {
    //     $("#zoomOut").trigger("click");
    // }
    // if (event.which == 187) {
    //     $("#zoomIn").trigger("click");
    // }
    // if (event.which == 77) {
    //     $("#mirror").trigger("click");
    // }
    // if (event.which == 106) {
    //     $("#reset").trigger("click");
    // }
    // if (event.which == 55) {
    //     $("#singleFilter").trigger("click");
    // }
    // if (event.which == 56) {
    //     $("#colorPlates").trigger("click");
    // }
    // if (event.which == 57) {
    //     $("#retinoscopy").trigger("click");
    // }
    // if (event.which == 67) {
    //     $("#refresh").trigger("click");
    // }
    // if (event.which == 48) {
    //     $("#hotv").trigger("click");
    // }
    if (event.which == 38) {
        console.log(currentLine)
        if (!$("#colorPlates").hasClass("modeButtonActive")) {
            event.preventDefault();
            if (currentLine > 1) {
                currentLine--;
            }
            console.log(currentLine)
            $("button[data-clicker='" + currentLine + "']").trigger("click");
        }
    }
    if (event.which == 40) {
        if (!$("#colorPlates").hasClass("modeButtonActive")) {
            event.preventDefault();
            if (currentLine < 19) {
                currentLine++;
            }

            $("button[data-clicker='" + currentLine + "']").trigger("click");
        }
    }

    if (event.which == 32) {
        event.preventDefault();
        if ($(".ref-data-active").attr("id") == "subjRx") {
            if (curEye == "od") {
                $("#odDistVisionSubj").html(
                    "20/" + $(".lineButtonActive").data("size")
                );
            } else if (curEye == "os") {
                $("#osDistVisionSubj").html(
                    "20/" + $(".lineButtonActive").data("size")
                );
            } else if (curEye == "ou") {
                $("#ouDistVisionSubj").html(
                    "OU: 20/" + $(".lineButtonActive").data("size")
                );
            }
        } else {
            if (curEye == "od") {
                $("#odDistVisionFinal").html(
                    "20/" + $(".lineButtonActive").data("size")
                );
            } else if (curEye == "os") {
                $("#osDistVisionFinal").html(
                    "20/" + $(".lineButtonActive").data("size")
                );
            } else if (curEye == "ou") {
                $("#ouDistVisionFinal").html(
                    "OU: 20/" + $(".lineButtonActive").data("size")
                );
            }
        }
    }
});