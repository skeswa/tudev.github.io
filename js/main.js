(function() {
    // The page order
    var PAGE_ABOUT          = 0,
        PAGE_SCHEDULE       = 1,
        PAGE_CODEATNIGHT    = 2,
        PAGE_MAIN           = 3,
        PAGE_DEVSERIES      = 4,
        PAGE_OWLHACKS       = 5,
        PAGE_CONTACTUS      = 6;

    // The current page
    var currentPage = PAGE_MAIN;

    // Gets the current page class
    var currentPageClass = function() {
        switch (currentPage) {
        case PAGE_ABOUT:
            return 'nav .links .about';
        case PAGE_SCHEDULE:
            return 'nav .links .schedule';
        case PAGE_CODEATNIGHT:
            return 'nav .links .codeatnight';
        case PAGE_MAIN:
            return 'nav .links .logo';
        case PAGE_DEVSERIES:
            return 'nav .links .devseries';
        case PAGE_OWLHACKS:
            return 'nav .links .owlhacks';
        case PAGE_CONTACTUS:
            return 'nav .links .contactus';
        }
    };

    // Navigate to different screen
    var transitionTo = function(index) {
        $('.page-container').css('left', (index * -100) + '%');
        $(currentPageClass()).removeClass('active');
        if (currentPage === PAGE_MAIN) {
            $('nav').removeClass('is-home');
        }
        currentPage = index;
        $(currentPageClass()).addClass('active');
        if (currentPage === PAGE_MAIN) {
            $('nav').addClass('is-home');
        }
    };

    // Sets up the click listeners on nav
    var setupNav = function() {
        $('.about.link').click(function() {
            transitionTo(PAGE_ABOUT);
        });
        $('.schedule.link').click(function() {
            transitionTo(PAGE_SCHEDULE);
        });
        $('.codeatnight.link').click(function() {
            transitionTo(PAGE_CODEATNIGHT);
        });
        $('nav .logo').click(function() {
            transitionTo(PAGE_MAIN);
        });
        $('.devseries.link').click(function() {
            transitionTo(PAGE_DEVSERIES);
        });
        $('.owlhacks.link').click(function() {
            transitionTo(PAGE_OWLHACKS);
        });
        $('.contactus.link').click(function() {
            transitionTo(PAGE_CONTACTUS);
        });

        $('.home.page .learn-more').click(function() {
            transitionTo(PAGE_ABOUT);
        });
    };

    // Intro animation for main page
    var animateMainPage = function() {
        setTimeout(function() {
            $('.headline').removeClass('hidden');
        }, 0);
        setTimeout(function() {
            $('.headline .expansion').removeClass('hidden');
        }, 1000);
        setTimeout(function() {
            $('.description').removeClass('hidden');
        }, 1500);
        setTimeout(function() {
            $('.learn-more').removeClass('hidden');
        }, 2000);
    };

    // On DOM ready, do stuff
    $(function() {
        setupNav();
        animateMainPage();
    });
})();
