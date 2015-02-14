// Everything is enclosed so as not to crowd the global namespace
(function() {
    // Global Constants
    var SHOW_EVENTBUS_LOGS = false;

    // The Events
    var Events = {
        PAGE_ENTER:     1,
        PAGE_LEAVE:     2,
        PAGE_READY:     3,
        PAGES_LOADED:   4,
        PAGE_REQUESTED: 5
    };

    // The Pages
    var Pages = {
        ABOUT:          1,
        SCHEDULE:       2,
        CODEATNIGHT:    3,
        SPLASH:         4,
        DEVSERIES:      5,
        HACKATHONS:     6,
        CONTACTUS:      7,

        HASH_URL_ABOUT:         '/about',
        HASH_URL_SCHEDULE:      '/schedule',
        HASH_URL_CODEATNIGHT:   '/c@n',
        HASH_URL_SPLASH:        '/',
        HASH_URL_DEVSERIES:     '/devseries',
        HASH_URL_HACKATHONS:    '/hackathons',
        HASH_URL_CONTACTUS:     '/contactus',

        hashUrlOf: function(pageId) {
            switch (pageId) {
            case Pages.ABOUT:
                return Pages.HASH_URL_ABOUT;
            case Pages.SCHEDULE:
                return Pages.HASH_URL_SCHEDULE;
            case Pages.CODEATNIGHT:
                return Pages.HASH_URL_CODEATNIGHT;
            case Pages.SPLASH:
                return Pages.HASH_URL_SPLASH;
            case Pages.DEVSERIES:
                return Pages.HASH_URL_DEVSERIES;
            case Pages.HACKATHONS:
                return Pages.HASH_URL_HACKATHONS;
            case Pages.CONTACTUS:
                return Pages.HASH_URL_CONTACTUS;
            default:
                return undefined;
            }
        },
        pageIdOf: function(hashUrl) {
            if (hashUrl.length >= 2 && hashUrl[0] === '#') {
                hashUrl = hashUrl.substring(1);
            }

            switch (hashUrl) {
            case Pages.HASH_URL_ABOUT:
                return Pages.ABOUT;
            case Pages.HASH_URL_SCHEDULE:
                return Pages.SCHEDULE;
            case Pages.HASH_URL_CODEATNIGHT:
                return Pages.CODEATNIGHT;
            case Pages.HASH_URL_SPLASH:
                return Pages.SPLASH;
            case Pages.HASH_URL_DEVSERIES:
                return Pages.DEVSERIES;
            case Pages.HASH_URL_HACKATHONS:
                return Pages.HACKATHONS;
            case Pages.HASH_URL_CONTACTUS:
                return Pages.CONTACTUS;
            default:
                return undefined;
            }
        },
        positionOf: function(pageId) {
            return pageId >= 0 ? pageId - 1 : 0;
        }
    };

    // Manages the events of the application
    var EventBus = (function() {
        var listenerMap = {},
            addListener = function(event, callback) {
                if (!listenerMap[event]) listenerMap[event] = [];
                listenerMap[event].push(callback);
            },
            removeListener = function(event, callback) {
                if (listenerMap[event]) {
                    for (var i = 0; i < listenerMap[event].length; i++) {
                        if (listenerMap[event][i] === callback) {
                            listenerMap[event].splice(i, 1);
                            if (listenerMap[event].length <= 0) {
                                listenerMap[event] = undefined;
                                delete listenerMap[event];
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            triggerListeners = function() {
                var emittedSuccessfully = false,
                    args = Array.prototype.slice.call(arguments), // Normalize the arguments psuedo-array
                    event = arguments[0];

                // Get rid of the event parameter of the args
                args.splice(0, 1);

                if (listenerMap[event]) {
                    for (var i = 0; i < listenerMap[event].length; i++) {
                        listenerMap[event][i].apply(this, args);
                        if (!emittedSuccessfully) emittedSuccessfully = true;
                    }
                }

                // The eventbus logs
                if (SHOW_EVENTBUS_LOGS) {
                    if (emittedSuccessfully) {
                        console.log('Emitted event "' + event + '" with arguments', args, 'successfully');
                    } else {
                        console.log('DID NOT emit event "' + event + '" with arguments', args, 'successfully');
                    }
                }

                return emittedSuccessfully;
            };

        return {
            on: addListener,
            off: removeListener,
            emit: triggerListeners
        };
    })();

    // The state of the web application
    var State = (function() {
        var state = {
            currentPageId: Pages.SPLASH, // Default page
            pagesLoaded: false
        };

        EventBus.on(Events.PAGE_ENTER, function(pageId) {
            state.currentPageId = pageId;
        });

        EventBus.on(Events.PAGE_LEAVE, function() {
            state.currentPageId = undefined;
        });

        EventBus.on(Events.PAGES_LOADED, function() {
            state.pagesLoaded = true;
        });

        return state;
    })();

    // Nav Controller
    (function() {
        // Goes to a page
        var gotoPage = function(id) {
            // Shift the view port
            $('.page-container').css('left', (Pages.positionOf(id) * -100) + '%');
            // Change the hash url
            var hashUrl = Pages.hashUrlOf(id);
            if (hashUrl) {
                window.location.hash = hashUrl;
            }
            // Notify that page has been entered
            EventBus.emit(Events.PAGE_LEAVE, State.currentPageId);
            EventBus.emit(Events.PAGE_ENTER, id);
            // Wait for the animation to complete
            setTimeout(function() {
                // Only declare the page ready if the transition wasn't pre-empted
                if (State.currentPageId === id) {
                    EventBus.emit(Events.PAGE_READY, id);
                }
            }, 500);
        };

        // The 'on page load' nav logic
        EventBus.on(Events.PAGES_LOADED, function() {
            // Perform initial URL check
            var hash = window.location.hash;
            // Set the current page id accordingly
            var pageId = Pages.pageIdOf(hash);
            // Only change the page if it needs to be changed
            if (pageId && pageId !== Pages.SPLASH) {
                gotoPage(pageId);
            } else {
                // Ensure the URL is proper
                window.location.hash = Pages.hashUrlOf(Pages.SPLASH);
                // If we're staying on the splash - let it know that we're ready
                EventBus.emit(Events.PAGE_READY, Pages.SPLASH);
            }
        });

        // A link of some special sort was clicked
        EventBus.on(Events.PAGE_REQUESTED, function(id) {
            if (id) {
                gotoPage(id);
            }
        });

        // Bind the link click listener
        $('nav .links .link, nav .links .logo').click(function() {
            // Get the id
            var pageId = parseInt($(this).data('id'));
            if (pageId) {
                gotoPage(pageId);
            }
        });
    })();

    // Splash Page Controller
    (function() {
        var $page = $('.home.page'),
            $nav = $('nav'),
            $bg = $page.find('.bg'),
            hasAnimated = false;

        var onMouseMove = function(evt) {
            var x = evt.pageX,
                y = evt.pageY,
                screenWidth = $(window).width(),
                screenHeight = $(window).height();

                $bg.css('left', (8 * (x - (0.5 * screenWidth)) / (1 * screenWidth) + -25) + '%');
                $bg.css('top', (8 * (y - (0.5 * screenHeight)) / (1 * screenHeight) + -25) + '%');
        };

        // When moving towards this page, style the nav
        EventBus.on(Events.PAGE_ENTER, function(pageId) {
            if (pageId === Pages.SPLASH) {
                $nav.addClass('is-home');
            }
        });
        // When away from this page, unstyle the nav
        EventBus.on(Events.PAGE_LEAVE, function(pageId) {
            if (pageId === Pages.SPLASH) {
                $nav.removeClass('is-home');
                $('body').off('mousemove', onMouseMove);
            }
        });
        // When the site is ready, animate the page
        EventBus.on(Events.PAGE_READY, function(pageId) {
            $('body').on('mousemove', onMouseMove);

            if (!hasAnimated && pageId === Pages.SPLASH) {
                // Flip the animation flag
                hasAnimated = true;
                // Do the animation
                setTimeout(function() {
                    $page.find('.headline').removeClass('hidden');
                }, 0);
                setTimeout(function() {
                    $page.find('.headline .expansion').removeClass('hidden');
                }, 1000);
                setTimeout(function() {
                    $page.find('.description').removeClass('hidden');
                }, 1500);
                setTimeout(function() {
                    $page.find('.learn-more').removeClass('hidden');
                }, 2000);
            }
        });

        // When "Learn More" is clicked, go to the about page
        $page.find('.learn-more').click(function() {
            EventBus.emit(Events.PAGE_REQUESTED, Pages.ABOUT);
        });
    })();

    // Declare all pages loaded
    EventBus.emit(Events.PAGES_LOADED);
})();
