(function() {
    // Navigate to different screen
    var transitionTo = function(index) {
        $('.page-container')
            .css('left', (index * -100) + '%');
    };

    // Sets up the click listeners on nav
    var setupNav = function() {
        $('.about.link').click(function() {
            transitionTo(0);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.schedule.link').click(function() {
            transitionTo(1);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('.codeatnight.link').click(function() {
            transitionTo(2);
            $('.link').removeClass('active');
            $('nav').removeClass('transparent');
            $(this).addClass('active');
        });
        $('nav .logo').click(function() {
            transitionTo(3);
            $('.link').removeClass('active');
            $('nav').addClass('transparent');
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

    var typeIntro = function() {
        $('.home.page .hello .text').typed({
            strings: ['Hi there!', 'We\'re TU Dev,^1000 <br>Temple University\'s Software Developer Community'],
            startDelay: 500,
            typeSpeed: 50
        });
    };

    // On DOM ready, do stuff
    $(function() {
        setupNav();
        typeIntro();
    });
})();
