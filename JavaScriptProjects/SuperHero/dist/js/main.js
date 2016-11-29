jQuery(document).ready(function () {
    var $hero = jQuery('#hero'),
        $beam = $hero.find('.beam'),
        time = 7000,
        time_stop = 4000;

    $beam.removeClass('beam');

    function scan() {
        $hero.removeClass('idle').addClass('attack');
        $beam.addClass('beam');
        setTimeout(function () {
            $hero.removeClass('attack').addClass('idle');
            $beam.removeClass('beam');
        }, time_stop);
    }

    setInterval(scan, time);
});
