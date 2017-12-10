$(document).ready(function () {


    var last = Date.now();
    var output = createInputs($(this).val());
    var t = null;

    $('.rnn').empty();
    $('#in-sentence').keydown(function () {

        $('.seq-output').empty();
        $('.rnn').empty();

        if (last + 250 < Date.now()) {
            last = Date.now();
        } else {
            last = Date.now();
            clearTimeout(t);
        }

        if (!$('#in-sentence').val().trim()) {
            clearTimeout(t);
            $('.seq-output').empty();
            $('.rnn').empty();
        }

        t = setTimeout(function () {
            $('.seq-output').append(createInputs($('#in-sentence').val()));
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "seq-output"]);


            $('.rnn').append(createCell($('#in-sentence').val()));
            $('.rnn').append(rnnEnd());
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "rnn"]);

        }, 250);


    });

    function createCell(sentence) {

        var cell = '';
        var word = sentence.trim().split(' ');
        var opa = 1 / (word.length);
        for (var i = 0; i < word.length; i++) {
            cell += ' <div class="block" style="float: left; opacity:' + opa * (i + 1) + '">' +
                '                    <img src="img/a1.png" width="50" class="a1">' +
                '                    <div class="wh">$W^H$</div>' +
                '                    <div class="text-center ht">' +
                '                        <div    style="padding-top: 18px;">$h_{' + i + '}$</div>' +
                '                    </div>' +
                '                    <img src="img/a2.png" width="50" style="float: left; margin-top: -20px">' +
                '                    <div class="wx">$W^X_{t}$</div>' +
                '                    <div class="text-center xt">$x_{' + i + '}$</div>' +
                '                    <div class="text-center out">' + word[i] + '</div>' +
                '                </div>'
        }
        return cell;
    }

    function rnnEnd() {
        return ' <div class="block" style="float: left;">' +
            '                    <img src="img/a1.png" width="50" class="a1">' +
            '                    <div class="text-center softmax">' +
            '                        <div style="padding-top: 18px;">$\\sigma$ softmax</div>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="block" style="float: left;">' +
            '                    <img src="img/a1.png" width="50" class="a1">' +
            '                    <div class="text-center classification">' +
            '                        <div style="padding-top: 18px;">$[0.42, 0.58]$</div>' +
            '                    </div>' +
            '                </div>';
    }

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