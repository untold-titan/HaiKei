var movieId = $('#main-wrapper').data('id');
var clickedLoadComment = false;
var initDisqus = false;

function loadDisqus() {
    let url = $('.btn-comment-tab.active').data('type') === 'anime' ? movie.shortlink : episode_play.shortlink;
    $('.btn-load-comment').hide();
    if (!initDisqus) {
        var disqus_config = function() {
            this.page.url = url;
        };
        (function() {
            var d = document,
                s = d.createElement('script');
            s.src = '//' + site_config.disqus + '/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            initDisqus = true;
        })();
    } else {
        if (typeof DISQUS !== 'undefined') {
            DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.url = url;
                }
            });
        }
    }
}

const autoPlayEl = document.getElementById('auto-play-checkbx')
const isEnabled = localStorage.getItem("autoPlay") || "disabled";
if (isEnabled == "enabled") {
    document.getElementById('auto-play-input-checkbx').checked = true;
    autoPlayEl.classList.add("enabled")
}
autoPlayEl.addEventListener('click', (e) => {
    autoPlayEl.classList.toggle("enabled")
    if (autoPlayEl.classList.contains("enabled")) {
        localStorage.setItem("autoPlay", "enabled")
    } else {
        localStorage.setItem("autoPlay", "disabled")
    }
})

async function determineShakaLoaded() {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (window.shaka) {
                clearInterval(interval)
                video.addEventListener("ended", () => {
                    handleAutoPlay();
                })
                resolve()
            }
        }, 200)
    })
}
determineShakaLoaded()

function handleAutoPlay() {
    if (localStorage.getItem("autoPlay") == "enabled") {
        gotoNextEpisode()
    }
}

function gotoNextEpisode() {
    if (episode_play.id == totalEpisodes) return;
    window.location.href = "/watch/" + movie.id + "/" + (parseInt(episode_play.id) + 1)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadGenresList() {
    $.get('/genres.json', function(res) {
        genreList = res;
        genres = genreList.genres[0]
        for (let genre in genres) {
            if (genre == "slice-of-life") genre = "slice of Life"
            if (genre == "mahou-shoujo") genre = "mahou Shoujo"
            console.log(capitalizeFirstLetter(genre)); // Log the genre name
        }
    });
}

function countViewMovie() {
    setTimeout(function() {
        $.post('/' + movieId, function(res) {});
    }, 1000 * 60);
}

function nextEpisode() {
    var nextEl = $('.ep-item.active').next();
    if (nextEl.length > 0) window.location.href = nextEl.attr('href');
}

function prevEpisode() {
    var prevEl = $('.ep-item.active').prev();
    if (prevEl.length > 0) window.location.href = prevEl.attr('href');
}

function pwToggleVisible() {
  let pwInput = document.getElementById("re-password");
    if (pwInput.type === "password") {
        pwInput.type = "text";
    } else {
        pwInput.type = "password";
    }
}



// $(document).ready(function() {
//     if (page == "movie_info") {
//         $.get('/' + movieId + '?page=' + page, function(res) {
//             if (res.status) $('#watch-list-content').html(res.html);
//         });
//     }
//     if (page == "movie_watch") {

//         getsrv();
//         if (parseInt(userSettings.auto_play) === 1) $('.quick-settings[data-option="auto_play"]').removeClass('off');
//         if (parseInt(userSettings.auto_next) === 1) $('.quick-settings[data-option="auto_next"]').removeClass('off');







//         $('.btn-comment-tab').click(function() {
//             $('.btn-comment-tab').removeClass('active');
//             $(this).addClass('active');
//             loadDisqus();
//         });

//         $('.btn-load-comment').click(function() {
//             clickedLoadComment = true;
//             $(this).hide();
//             loadDisqus();
//         });

//         $('#logout').click(function(e) {
//             $.post('/logout')
//             location.reload()
//         });

//         $("#media-resize").click(function(e) {
//             $(".anis-watch-wrap").toggleClass("extend");
//             if ($(".anis-watch-wrap").hasClass('extend')) {
//                 $(this).html('<i class="fas fa-compress mr-1"></i>Collapse');
//             } else {
//                 $(this).html('<i class="fas fa-expand mr-1"></i>Expand');
//             }
//         });

//         $("#turn-off-light").click(function(e) {
//             $("#mask-overlay, .anis-watch-wrap").toggleClass("active");
//         });

//         $("#mask-overlay").click(function(e) {
//             $("#mask-overlay, .anis-watch-wrap").removeClass("active");
//             $("#turn-off-light").removeClass("off");
//         });

//         $(document).on("click", ".btn-vote", function() {
//             $('#vote-loading').show();
//             var mark = $(this).data('mark');
//         //     $(this).setAttribute("disabled", true);
//             var movieid = $(this).data('movieid');
//             if (typeof grecaptcha !== 'undefined') {
//                 grecaptcha.execute(recaptchaSiteKey, { action: 'vote' }).then(function(_token) {
//                     voteSubmit({ movieid, mark, _token });
//                 })
//             } else {
//                 voteSubmit({ movieid, mark, _token: '' });
//             }
//         });
//     }
// });

$(document).on("click", ".ep-page-item", function() {
    $('.ep-page-item').removeClass('active');
    $('.ep-page-item .ic-active').hide();
    $(this).addClass('active');
    $(this).find('.ic-active').show();
    $('.ss-list-min').hide();
    $('#episodes-page-' + $(this).data('page')).show();
    $('#current-page').text($(this).text().trim());
});