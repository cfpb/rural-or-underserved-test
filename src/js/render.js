var results = $('#results'),
    r = $('#rural'),
    nR = $('#notRural'),
    nF = $('#notFound'),
    dup = $('#dup'),
    about = $('#about');

module.exports = function() {

    var render = {};

    render.showResults = function() {
        about.addClass('hide');
        results.removeClass('hide');
        r.addClass('hide');
        nR.addClass('hide');
        nF.addClass('hide');
        dup.addClass('hide');
    }

    render.showAbout = function() {
        about.removeClass('hide');
        results.addClass('hide');
        r.addClass('hide');
        nR.addClass('hide');
        nF.addClass('hide');
        dup.addClass('hide');
    }

    render.resetHTML = function() {
        $('tbody').html('');
    }

    return render;
}();