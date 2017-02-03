$(document).ready(function () {
   $(".accordeon_trigger").on("click", function (e) {
       e.preventDefault();
       var $this = $(this),
           item = $this.closest(".accordeon_item"),
           list = $this.closest(".accordeon_list"),
           items = list.find(".accordeon_item"),
           content = item.find(".accordeon_inner"),
           otherContent = list.find(".accordeon_inner"),
           duration = 300;

       if(!item.hasClass("active")) {
           items.removeClass("active");
           item.addClass("active");
           otherContent.stop(true, true).slideUp(duration);
           content.stop(true, true).slideDown(duration);
       } else {
           content.stop(true, true).slideUp(duration);
           item.stop(true, true).removeClass("active");
       }
   })
});
