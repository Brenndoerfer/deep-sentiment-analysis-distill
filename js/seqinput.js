$(document).ready(function () {


    var last = Date.now();
    var output = createInputs($(this).val());
    var t = null;

    $('#in-sentence').keydown(function () {

        $('.seq-output').empty();

        if (last + 250 < Date.now()) {
            last = Date.now();
        } else {
            last = Date.now();
            clearTimeout(t);
        }

        if (!$('#in-sentence').val().trim()){
            clearTimeout(t);
            console.log($('#in-sentence').val().trim())
            $('.seq-output').empty();
        }

        t = setTimeout(function () {
            $('.seq-output').append(createInputs($('#in-sentence').val()));
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "seq-output"]);

        }, 250);


    });

    function createInputs(sentence) {

        var el = '';
        var word = sentence.trim().split(' ');

        for (var i = 0; i < word.length; i++) {
            var seq = '<div class="text-center float-left mr-4">';
            seq += '<h4>' + word[i] + '</h4>';
            seq += '<p>$x_' + i + '$</p>';
            seq += '<p>$t = ' + i + '$</p>';
            seq += '</div>';
            el += seq;
            seq = '';
        }

        return el;
    }


});