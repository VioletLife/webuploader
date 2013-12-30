jQuery(function() {
    var $ = jQuery,
        $toc = $('.post-toc');



    $toc.each(function() {
        var $this = $( this ),
            postion = $this.offset();

        $this.affix({
            offset: {
                top: postion.top - 80
            }
        });
    });

    if ( $toc.length ) {
        $('body').scrollspy({ target: '.post-toc' });
    }
});

// comments相关
jQuery(function() {
    var $ = jQuery,
        $el = $('#ghComments'),
        issueId;

    // 不合法
    if ( !$el.length || !$el.attr('data-issue-id') ) {
        return;
    }

    issueId = $el.attr('data-issue-id') ^ 0;

    function loadComments(data) {
        for (var i = 0; i < data.length; i++) {
            var cuser = data[i].user.login;
            var cuserlink = 'https://www.github.com/' + data[i].user.login;
            var clink = 'https://github.com/gmuteam/webuploader/issues/' + issueId + '#issuecomment-' + data[i].url.substring(data[i].url.lastIndexOf('/') + 1);
            var cbody = data[i].body_html;
            var cavatarlink = data[i].user.avatar_url;
            var cdate = data[i].created_at;// Date.parse(data[i].created_at).toString('yyyy-MM-dd HH:mm:ss');

            $el.append('<div class="comment"><div class="commentheader"><div class="commentgravatar"><img src="' + cavatarlink + '" alt="" width="20" height="20"></div><a class="commentuser" href="' + cuserlink + '">' + cuser + '</a><a class="commentdate" href="' + clink + '">' + cdate + '</a></div><div class="commentbody">' + cbody + '</div></div>');
        }
    }

    $.ajax('https://api.github.com/repos/gmuteam/webuploader/issues/' + issueId + '/comments?per_page=100', {
        headers: {
            Accept: 'application/vnd.github.full+json'
        },
        dataType: 'json',
        success: loadComments
    });
});