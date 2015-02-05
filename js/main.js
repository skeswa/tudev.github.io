(function() {
    // Navigate to different screen
    var transitionTo = function(index) {
            $('.page-container')
                .css('left', (index * -100) + '%')
                .css('transform', 'scale(0.85)');
        };

    // Sets up the click listeners on nav
    var setupNav = function() {
        $('nav .logo').click(function() {
            transitionTo(0);
            $('.link').removeClass('active');
            $('nav').addClass('transparent');
            $(this).addClass('active');
        });
        $('.about.link').click(function() {
            transitionTo(1);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.schedule.link').click(function() {
            transitionTo(2);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.codeatnight.link').click(function() {
            transitionTo(3);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.devseries.link').click(function() {
            transitionTo(4);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.hackathons.link').click(function() {
            transitionTo(5);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.contactus.link').click(function() {
            transitionTo(6);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
    };

    // Do home bg splash with trianglify
    var paintHome = function() {
        var $bg = $('.home.page .bg'),
            bgWidth = $bg.width(),
            bgHeight = $bg.height(),
            trianglifier = new Trianglify({
                x_gradient: ['#9e1b34', '#ca2242', '#88172d']
            }),
            pattern = trianglifier.generate(
                bgWidth,
                bgHeight
            );
        // Set the background of the div
        $bg.css('backgroundImage', pattern.dataUrl);
    };

    // On DOM ready, do stuff
    $(function() {
        setupNav();
        paintHome();
    });
})();
