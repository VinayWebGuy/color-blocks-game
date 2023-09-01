$(document).ready(function () {
    let time = 10;
    let score = 0;
    let timeInterval;

    $('#start').on('click', function () {
        initializeGame();
        $('#start').addClass('off');
        $('.pick').removeClass('hide');
        if($('.game-over').hasClass('view')) {
            $('.game-over').removeClass('view');
        }
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

        console.log(colors);
        // Remove the selected pickColor from the colors array
        colors.splice(randomValue, 1);
        let new_colors = colors

        $('.block').each(function () {
            let value = Math.floor(Math.random() * new_colors.length);
            let color = new_colors[value];
            $(this).css({ 'backgroundColor': color });
            $(this).addClass('taken');
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
        } else {
            if (score > 0) {
                score--;
            }
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
                $('.block').removeClass('taken');
                $('.block').css({'backgroundColor': 'transparent'});
                $('.game-over').addClass('view');
                $('#start').removeClass('off');
                $('.pick').addClass('hide');
                time = 10;
                score = 0
            }
        }, 1000);
    }

    $('#showHint').on('change', function () {
        $('.hint').toggleClass('off');
    });
});
