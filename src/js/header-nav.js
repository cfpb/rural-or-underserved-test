var linkElement, hidemenu, dropdown, dropping;
function dropMenu() {
  dropping = 1;
  $("#closeMenu").remove();
  var menuItem = $(linkElement);
  var target = menuItem.attr("href");
  var position = menuItem.offset().left - 1;
  $(target).css("left",position + "px");
  var position = menuItem.offset().top + menuItem.outerHeight();
  $(target).css("top",position + "px");
  $(target).append("<a id='closeMenu' class='close' href='#'>close menu</a>");
  $("a#closeMenu").click(function(e) {
    e.preventDefault();
    var myParent = $(this).parent().attr("id");
    hideMenu();
    $('a[href="#'+myParent+'"]').removeClass("active");
    $('a[href="#'+myParent+'"]').get(0).focus();
    $('a[href="#'+myParent+'"]').css("outline","none");
  });
  var height = $(target).show().height();
  $(target).hide().css('height', 0);
  $(target).show().animate({height: height}, 400, function() {
    dropping = 0;
  });
  $(target+" a:first").get(0).focus();
  $(target+" a:first").css("outline","none");
  menuItem.addClass("active");
  dropdown = 0;
}

function hideMenu() {
    $(".active").removeClass("active");
    $("#closeMenu").remove();
    $("#subnav nav").slideUp();
}

$("#header nav a").mouseenter(function() {
        window.clearTimeout(hidemenu);
        var target = $(this).attr("href");
        if (($(target).css("display") == "none") || (target == "/")) {
            hideMenu();
            linkElement = this;
            dropdown = window.setTimeout(dropMenu, 500);
        }
        else {

        }
        return false;
    }).mouseleave(function() {
        hidemenu = window.setTimeout(hideMenu, 500);
        window.clearTimeout(dropdown);
        dropdown = 0;
    }).click(function(e) {
        if(dropping) {
            return false;
        }
        var clicked = $(this);
        var target = clicked.attr("href");
        if(target == "/") {
            return true;
        }
        if ( $(target).css("display") == "none") {
            if(!dropdown && !dropping) {
                hideMenu();
                linkElement = this;
                dropMenu();
            }
        }
        else {
            if(!dropping) {
                hideMenu();
            }
        }
        return false;
    });
    $("#subnav nav").mouseenter(function() {
        window.clearTimeout(hidemenu);
        window.clearTimeout(dropdown);
        var hovering = "#" + $(this).attr("id");
    }).mouseleave(function() {
        var hovering = "";
        hidemenu = window.setTimeout(hideMenu,500);
    });
