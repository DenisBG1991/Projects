jQuery(document).ready(function($) {
    $("#fullpage").fullpage({
        sectionsColor:['#C63D0F','#1BBC9B','#7E8F7C'],
        anchors:['firstPage','secondPage','3rdPage'],
        menu:'#menu',
        scrollBar: false,
        scrollOverflow: true,
        //navigation: true,
        //navigationPosition: 'right',
        //navigationTooltips: ['Секция1','Секция2','Секция3'],
        slidesNavigation: true,
        slidesNavPosition: "bottom",
        loopTop: true,
        loopBottom: true,
        loopHorizontal: true,
        afterLoad: function(link, index) {
            if (index == 3){
                $("#section2").find("img").animate({"left":"0%"}, 1500);
            }
            if (link == '3rdPage'){
                $("#section2").find("h1").fadeIn(1500, function(){
                    $("#section2").find("p").css({'display':'block'}).animate({'fontSize':'3em'},1000);
                });
            }
        }
    });
});
