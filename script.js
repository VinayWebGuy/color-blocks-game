$(document).ready(function () {
    let time = 60;
    let score = 0;
    let timeInterval;

    $('#start').on('click', function () {
        initializeGame();
        $('#start').remove();
        $('.pick').removeClass('hide');
        runTimer();
    });

    function initializeGame() {
        let colors = [
            "White",
            "Red",
            "Purple",
            "Violet",
            "Orange",
            "Green",
            "Darkgray",
            "Blue",
            "Aqua",
            "Yellow",
        ];

        let randomValue = Math.floor(Math.random() * colors.length);
        let pickColor = colors[randomValue];

        $('#pickColor').html(pickColor);
        $('.hint').css({ 'backgroundColor': pickColor });

        // Remove the selected pickColor from the colors array
        colors.splice(randomValue, 1);

        $('.block').each(function () {
            let value = Math.floor(Math.random() * colors.length);
            let color = colors[value];
            $(this).css({ 'backgroundColor': color });
        });

        let randomBlock = Math.floor(Math.random() * colors.length);
        $(`#${randomBlock}`).css({ 'backgroundColor': pickColor });

        // Remove existing click event handlers from .block elements
        $('.block').off('click');

        $('.block').on('click', function () {
            let clicked_bg = $(this).css('backgroundColor');
            let act_bg = $('.hint').css('backgroundColor');

            checkGame(clicked_bg, act_bg);
        });
    }

    function checkGame(bg, a_bg) {
        if (bg == a_bg) {
            score++;
            console.log("Yes");
        } else {
            if (score > 0) {
                score--;
                console.log("No No");
            }
            console.log("No");
        }
        initializeGame();
        $('#score').html(score);
    }

    function runTimer() {
        timeInterval = setInterval(() => {
            $('#timer').html(time);
            if (time > 0) {
                time--;
            } else {
                clearInterval(timeInterval);
            }
        }, 1000);
    }

    $('#showHint').on('change', function () {
        $('.hint').toggleClass('off');
    });
});
