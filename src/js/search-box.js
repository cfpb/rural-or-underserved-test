/* SEARCH BOX */
$(function(){

    // on page-load, determin the right placeholder color
    var searchLabelNd = $('#search_form label');
    if($('#search_form #query').val())
        searchLabelNd.fadeOut(50);
    else
        searchLabelNd.fadeIn(50);


    // placeholder text Behavior on focus and blur
    $('#search_form #query').focus(function(){
        if($(this).val())
            searchLabelNd.fadeOut(50);
        else
            searchLabelNd.fadeIn(50);
    });

    $('#search_form #query').keyup(function(){
        if($('#search_form #query').val())
            searchLabelNd.fadeOut(50);
        else
            searchLabelNd.fadeIn(50);
    });

    $('#search_form #query').blur(function(){
        if($(this).val() == ''){
            searchLabelNd.fadeIn(50);
        }else{
            searchLabelNd.fadeOut(50);
        }
    });

});
