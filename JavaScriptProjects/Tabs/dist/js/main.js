$(document).ready(function () {
   $('.tabs_control-link').on('click', function (e) {
       e.preventDefault();
       var item = $(this).closest(".tabs_controls_item"),
           contentItem = $(".tabs_item"),
           itemPosition = item.index(),
           data = item.data("class");

       //contentItem.eq(itemPosition).add(item).addClass("active").siblings().removeClass("active");
       contentItem.filter(".tabs_item_" + data).add(item).addClass("active").siblings().removeClass("active");
   })
});
