/*jQuery.noConflict();
jQuery(document).ready(function(){
jQuery("#btn").colorbox({ opacity:.5, inline: true, href: "#daEmail" });
});*/
function da_OpenEmail() {
    var dlg = jQuery("#daEmail");
    dlg.dialog({
        modal: true,
        autoOpen: false,
        resizable: false,
        width: 500,
        overlay: { opacity: 0.2, background: "cyan" }

    });
    dlg.dialog('open');

    dlg.parent().appendTo(jQuery("form:first"));
}


$(document).ready(function () {
    var check = window.location.href.toLowerCase();
    if (check.indexOf("/search") != -1 || check.indexOf("/page") != -1 || check.indexOf("/sort") != -1 || check.indexOf("/custom") != -1
        || check.indexOf("/index") != -1) {
        jQuery("#ScrollTop").val(0);
        var element = document.getElementById("clear");
        if (element != null)
            element.scrollIntoView(true);
    }
});


/// dashboard tagit
function InitAdvancedSearchTagit() {
    $('[id*=tag]').tagit({
        select: true, requireAutocomplete: true, singleField: true, allowSpaces: true,
        tagSource: function (request, showChoices) {
            var that = this;
            $.ajax({
                type: "POST",
                url: "/DesktopModules/ArticleCS/TagHandler.ashx?search=" + request.term + '&contenttype=' + DashboardVars.ContentTypeID + '&site=' + DashboardVars.SiteID,
                data: request,
                dataType: 'json',
                contentType: "application/json",
                success: function (choices) {
                    showChoices(that._subtractArray(choices, that.assignedTags()));
                }
            })
        }
    });
}



/// ajax loading
function LoadDashboardAJAX(modid, dest, qs) {

    var baseUrl = $.ServicesFramework(modid).getServiceRoot('ArticleCS');
    $.ajax({
        type: "GET",
        url: baseUrl + "Public/GetDashboard?moduleID=" + modid + qs,
        success: function (data) {
            $(dest).html(data);
        },
        error: function () {
            $(dest).html("Error loading dashboard");
        }
    });
}

function LoadListAJAX(modid, page, qs, loadFunc, doneFunc) {

    var baseUrl = $.ServicesFramework(modid).getServiceRoot('ArticleCS');
    $.ajax({
        type: "GET",
        url: baseUrl + "Public/GetList?moduleID=" + modid + "&dpage=" + page + qs,
        success: function (data) {
            if (loadFunc !== null)
                loadFunc(data);
            UpdateArticleDisplay();
            if( typeof(addthis) !== "undefined" )
                addthis.toolbox('.addthis_toolbox');
            if (doneFunc !== null && data.done === true)
                doneFunc(data);
        },
        error: function () {
            var data;
            data.data = "Error loading data";
            loadFunc(data);
        }
    });
}

// .alist-more-here.  Put this class on the div receiving the next page
// .alist-more-button  Button when clicked is disabled when loading, hidden when reach end of list
// the below 2 functions are the "base" implimentation, you can create your own implimentation which calls LoadListAJAX()
function LoadListAJAXHelper(modid, page, qs, dest, button) {
    $(button).addClass('disabled');

    LoadListAJAX(modid, page, qs,
        function (data) {
            if( page === 0 )  // first page, overwrite whatever is coming from server
                $(dest).html(data.data);
            else
                $(dest).append(data.data);
            $(button).removeClass('disabled');
        },
        function (data) {
            $(button).hide();
        }
    );
}

var acs_curPages = {};
function InitLoadMore(modid, qs) {
    acs_curPages[modid] = 0;
    if (dma.DeviceIsMobile()) {
        $('.number-pager').hide();
        if (dma.getParameterByName("page") !== "")  // if not on the first page, load the first page
            LoadListAJAXHelper(modid, 0, qs, '.alist-more-here', '.alist-more-button');
        
        $('.alist-more-button').click(function (evt) {
            LoadListAJAXHelper(modid, ++acs_curPages[modid], qs, '.alist-more-here', '.alist-more-button');
            return false;
        });
    }
    else {
        $('.alist-more-button').hide();
    }
}


function SaveRelatedOrder(relatedIDs) {
    var baseUrl = $.ServicesFramework(relatedIDs).getServiceRoot('ArticleCSScope');
    $.ajax({
        type: "GET",
        url: baseUrl + "ArticleCS/SaveRelatedOrder",
        data: { relatedIDs: relatedIDs }
    });
}

function SaveSelectedMedia(ids, isdoc, isAudio, statusids, keyEdit) {

    var baseUrl = $.ServicesFramework(ids).getServiceRoot('ArticleCSScope');
    $.ajax({
        type: "GET",
        url: baseUrl + "ArticleCS/SaveSelectedMedia",
        data: { ids: ids, isdoc: isdoc, isAudio: isAudio, statusids: statusids, keyEdit: keyEdit }
    });
}


function UpdateArticleDisplay() {
    DateAgo();
    EllipsisText();
}

$(document).ready(function () {

    UpdateArticleDisplay();

});

$(window).resize(function () {
    EllipsisText();
});



function DateAgo() {
    $('[data-dateago]').each(function () {
        var pub = new moment.tz($(this).data("dateago"), "America/New_York");
        var now = new moment();
        var diff = now.diff(pub);
        diff = Math.round(diff / 1000 / 60);  // minutes
        var dateString = "";
        var isYesterday = pub.date() === now.subtract('1', 'days').date() && pub.month() === now.month() && pub.year() === now.year();

        if (diff < 60)
            dateString = diff + " min ago";
        else if (diff < 1440) {
            var hrs = Math.round(diff / 60);
            if (hrs === 1)
                dateString = "1 hour ago";
            else
                dateString = hrs + " hours ago";
        }
        else if (isYesterday)
            dateString = "yesterday";
        else
            dateString = $(this).data("dateap");

        $(this).html(dateString);
    }
    );
}

function EllipsisText() {
    $('.ellipsis-bound').each(function () {
        var base = $(this);
        var el = base.find('.ellipsis-text');
        var text = el.data('title');
        el.html(text);
        var wordArray = text.split(' ');
        while (base.prop('scrollHeight') > base.prop('offsetHeight')) {
            wordArray.pop();
            el.html(wordArray.join(' ') + '...');
            if (wordArray.length === 0)
                break;
        }
    });

}

function FadeIt() {
    $('main').addClass('fadeit');
}
function FadeItDark() {
    $('main').addClass('fadeit-dark');
    $('body').css('background-color', '#242424');
}

function GetNextAndPreviousArticles(modid, currentArticleId) {
    var baseUrl = $.ServicesFramework(modid).getServiceRoot('ArticleCS');
    var retData = null;
    $.ajax({
        type: "GET",
        url: baseUrl + "Public/GetNextAndPrevious?moduleID=" + modid + "&currentArtId=" + currentArticleId,
        data: { moduleID: modid, currentArtId: currentArticleId },
        async: false,
        success: function (data) {
            retData = data;
        },
        error: function (jqXHR, exception) {
            console.log("Unable to display previous and next buttons for articles")
        }
    });

    return retData;
}

function DisplayNextPreviousNav(moduleId, articleId, loggedIn) {

    if (loggedIn)
        $('.article-navbtn.bx-prev').addClass('logged-in');

    $('footer').append("<div id='footerExtender' style='height:0px;'></div>");

    $('.article-navbtn').hover(function () {

        var $bxBtn = $('.article-navbtn.bx-prev .navbtn-link');
        var $currentHoverBtnId = $(this).attr('id');

        if ($currentHoverBtnId.indexOf('ArticleNavNext') >= 0) {
            $bxBtn = $('.article-navbtn.bx-next .navbtn-link')
        }

        $bxBtn.css('display', 'block');

        $bxBtn.css('width', $(document).width() > 1024 ? '300px' : '0px');
    }, function () {

        $('.article-navbtn .navbtn-link').css('width', $(document).width() > 1024 ? '300px' : '0px');


        if ($(window).width() > 1024)
            $('.article-navbtn .navbtn-link').hide();
        else
            $('.article-navbtn .navbtn-link').show();
    });

    $('.article-navbtn').css('display', 'flex');

    var articleId = articleId;
    var moduleId = moduleId;

    var nextPrevData = GetNextAndPreviousArticles(moduleId, articleId);

    if (nextPrevData != undefined && nextPrevData != null) {
        console.log(JSON.stringify(nextPrevData));

        if (nextPrevData.nextArticle.length > 0) {

            for (var count = 0; count < nextPrevData.nextArticle.length; count++) {
                if (count == 0) {
                    $('.article-navbtn.bx-next .headline').prepend(nextPrevData.nextArticle[count].articletitle);
                    $('.bottomNavContainer .artNextBottomNav .headline').prepend(nextPrevData.nextArticle[count].articletitle);

                    if (nextPrevData.nextArticle[count].thumbnailurl != null)
                        $('.article-navbtn.bx-next .thumbnail .image').attr('src', nextPrevData.nextArticle[count].thumbnailurl);

                    $('.article-navbtn.bx-next a').attr('href', nextPrevData.nextArticle[count].articleurl);
                    $('.bottomNavContainer .artNextBottomNav a').attr('href', nextPrevData.nextArticle[count].articleurl);
                    $('.article-navbtn.bx-next .headline .pubDate').html(nextPrevData.nextArticle[count].publishDate);
                    $('#NavBtnLinkNext').css('display', 'flex');
                }
                else {
                    var $articleAppendLink = $('<a></a>');
                    $articleAppendLink.addClass('moreNavArticle');
                    $articleAppendLink.attr('href', nextPrevData.nextArticle[count].articleurl);
                    var $articleAppendHeadLine = $('<div></div>');
                    $articleAppendHeadLine.css({ 'text-align': 'left', 'flex': '1' });
                    $articleAppendHeadLine.html(nextPrevData.nextArticle[count].articletitle);
                    var $articleAppendPublishDate = $('<div></div>');
                    $articleAppendPublishDate.css({ 'text-align': 'right', 'flex': '1' });
                    $articleAppendPublishDate.html(nextPrevData.nextArticle[count].publishDate);
                    $articleAppendLink.append($articleAppendHeadLine);
                    $articleAppendLink.append($articleAppendPublishDate);
                    $('#ArticleNavNext .navbtn-link').append($articleAppendLink);
                }
            }
        }
        else {
            $('.article-navbtn.bx-next').css({ 'display': 'none', 'width': '0px' });
        }

        if (nextPrevData.prevArticle.length > 0) {

            for (var count = 0; count < nextPrevData.prevArticle.length; count++) {
                if (count == 0) {
                    $('.article-navbtn.bx-prev .headline').prepend(nextPrevData.prevArticle[count].articletitle);
                    $('.bottomNavContainer .artPrevBottomNav .headline').prepend(nextPrevData.prevArticle[count].articletitle);

                    if (nextPrevData.nextArticle[count].thumbnailurl != null)
                        $('.article-navbtn.bx-prev .thumbnail .image').attr('src', nextPrevData.prevArticle[count].thumbnailurl);

                    $('.article-navbtn.bx-prev a').attr('href', nextPrevData.prevArticle[count].articleurl);
                    $('.bottomNavContainer .artPrevBottomNav a').attr('href', nextPrevData.prevArticle[count].articleurl);
                    $('.article-navbtn.bx-prev .headline .pubDate').html(nextPrevData.prevArticle[count].publishDate);
                    $('#NavBtnLinkPrev').css('display', 'flex');
                }
                else {
                    var $articleAppendLink = $('<a></a>');
                    $articleAppendLink.addClass('moreNavArticle');
                    $articleAppendLink.attr('href', nextPrevData.prevArticle[count].articleurl);
                    var $articleAppendHeadLine = $('<div></div>');
                    $articleAppendHeadLine.css({ 'text-align': 'right', 'flex': '1' });
                    $articleAppendHeadLine.html(nextPrevData.prevArticle[count].articletitle);
                    var $articleAppendPublishDate = $('<div></div>');
                    $articleAppendPublishDate.css({ 'text-align': 'left', 'flex': '1' });
                    $articleAppendPublishDate.html(nextPrevData.prevArticle[count].publishDate);
                    $articleAppendLink.append($articleAppendPublishDate);
                    $articleAppendLink.append($articleAppendHeadLine);
                    $('#ArticleNavPrev .navbtn-link').append($articleAppendLink);
                }
            }
        }
        else {
            $('.article-navbtn.bx-prev').css({ 'display': 'none', 'width': '0px' });
        }
    }
    else {
        $('.article-navbtn').css({ 'display': 'none', 'width': '0px' });
    }
}
