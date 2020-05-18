$(function() {
    $Menu = $('#modal-content');
    //Enable swiping...
    var InnerPosY0;
    var scroll;
    var tempscroll;
    $("#firstPopup").swipe({
        //Генерируем обработчик swipe для всех направлений
        swipeStatus: function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            if (phase == 'start') {
                // расстояние между пальцем и верхней точкой модальног окна
                Delta = fingerData[0].end.y - parseInt($('#firstPopup').css("top"));
                if (parseInt($('#firstPopup').css("top")) == 0) {
                    scroll = $('#inner-content').scrollTop();
                }
            }

            if (phase == 'move') {
                Delta = parseInt(Delta);
                if (currentDirection == 'up') {
                    // движение блока вверх
                    if (parseInt($('#firstPopup').css("top")) != 0) {
                        $("#inner-content").css("overflow", "hidden");
                        var PosY = fingerData[0].last.y - Delta;
                        if (PosY >= 0) {
                            $('#firstPopup').css("top", PosY);
                        } else {
                            PosY = 0;
                            $('#firstPopup').css("top", PosY);
                        }
                    } else
                    // движение внутреннего контейнера 
                    if (parseInt($('#firstPopup').css("top")) == 0) {
                        $("#inner-content").css("overflow", "scroll");
                    }

                }

                if (currentDirection == 'down') {
                    // движение блока вниз
                    $("#inner-content").css("overflow", "scroll");
                    if (parseInt($('#firstPopup').css("top")) != 0) {
                        var PosY = fingerData[0].last.y - Delta;
                        if (PosY >= 0) {
                            $('#firstPopup').css("top", PosY);
                        } else {
                            PosY = 0;
                            $('#firstPopup').css("top", PosY);
                        }

                    } else if (parseInt($('#firstPopup').css("top")) == 0 && $('#inner-content').scrollTop() == 0) {
                        var PosY = fingerData[0].last.y - Delta;
                        if (PosY >= 0) {
                            $('#firstPopup').css("top", PosY);
                        } else {
                            PosY = 0;
                            $('#firstPopup').css("top", PosY);
                        }
                    } else {}
                }
            }

            if (phase == 'end') {
                if (currentDirection == 'down' && parseInt($('#inner-content').scrollTop()) == 0 && parseInt($('#firstPopup').css("top")) >= 0) {
                    if (distance > 150) {
                        $('#firstPopup').bPopup({
                            opacity: 0,
                            positionStyle: 'fixed',
                            speed: 450,
                            transitionClose: 'slideUp'
                        }).close();
                    }
                }
            }

            if (parseInt($('#firstPopup').css("top")) == 0) {
                $("#inner-content").swipe({
                    swipeStatus: function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
                        if (currentDirection == "left") {
                            console.log("Влево!");
                        }
                    },
                    allowPageScroll: "vertical"
                })
            }


        },
        threshold: 50,
        allowPageScroll: "vertical"
    });
});

function bopen() {
    $('#firstPopup').bPopup({
        position: [0, 300],
        opacity: 0,
        positionStyle: 'fixed',
        speed: 450,
        transition: 'slideUp',
        transitionClose: 'slideUp',
        scrollBar: false
    });
}

function bClose() {
    $('#firstPopup').bPopup({
        position: [0, 300],
        opacity: 0,
        positionStyle: 'fixed',
        speed: 450,
        transition: 'slideUp',
        transitionClose: 'slideUp'
    }).close();
}