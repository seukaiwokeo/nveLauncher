var nveLauncher = function () {
    'use strict';
    
    return {
        init: function () {
            $.ajax({
                url: "https://raw.githubusercontent.com/seukaiwokeo/sexyko-notice-api/main/launcher_data.json",
                context: document.body
            }).done(function (response) {
                var data = JSON.parse(response);
                $('#titlebar h1').text(data.title);
                var links = '';
                $.each(data.webs, function(i, v)
                {
                    links += `<a target="_blank" href="${v}">${i}</a>`;
                });
                $('#titlebar .links').html(links);
                var notices = '';
                $.each(data.notices, function(i, v)
                {
                    notices += `<li class="notice">
                                    <a target="_blank" href="${v.url} title="${v.title}">${v.title}</a>
                                </li>`;
                });
                $('#main .notices').html(notices);
            });
        }
    };
}();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        nveLauncher.init();
    });
} else {
    nveLauncher.init();
}