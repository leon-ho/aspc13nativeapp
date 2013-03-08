var badges;
var scores;
var template;

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {

    // Dette skal hentes fra service
    badges = [
        {
            'award': 'Comment Master',
            'description': 'For giving helpful comments to everyone.',
            'icon': 'comment',
            'level': 2,
            'timestamp': 'hh:mm:ss dd-mm-yyyy',
        },
        {
            'award': 'Rocket Man',
            'description': 'For gaining a lot of points in short time.',
            'icon': 'plane',
            'level': 1,
            'timestamp': 'hh:mm:ss dd-mm-yyyy',
        },
        {
            'award': 'Captain Hindsight',
            'description': 'For saying "if I knew".',
            'icon': 'calendar',
            'level': 3,
            'timestamp': 'hh:mm:ss dd-mm-yyyy',
        },
        {
            'award': 'Rocket Man',
            'description': 'For gaining a lot of points in short time.',
            'icon': 'plane',
            'level': 2,
            'timestamp': 'hh:mm:ss dd-mm-yyyy',
        },
        {
            'award': 'Rocket Man',
            'description': 'For gaining a lot of points in short time.',
            'icon': 'gift',
            'level': 3,
            'timestamp': 'hh:mm:ss dd-mm-yyyy',
        }
    ];

    template = Handlebars.compile($("#badge-template").html());

    //renderbadges(badges, '.badgelist', template, 5);
    //renderbadges(badges, '.recentbadgelist', template, 3);

    drawbadgestats();

    //var timeout = window.setTimeout(addbadge(badges[0], '.recentbadgelist', template), 5000);

    
    jQuery.get('http://altrunsplendid.cloudapp.net/Splendid.svc/GetUserScoreJson?userId=ola@altran.no', function (data) {
        console.log(data);
    });
    jQuery.get('http://altrunsplendid.cloudapp.net/Splendid.svc/GetAwardsJson?userId=ola@altran.no', function (data) {
        renderbadges(data, '.badgelist', template, 5);
        renderbadges(data, '.recentbadgelist', template, 3);
    });
    
});

// This function renders an array of badges in JSON-format to a container-reference
function renderbadges(source, target, template, maxitems) {
    maxitems = maxitems || 10;
    for (i = 0; i < source.length && i < maxitems; i++) {
        var context = source[i];
        var html = template(context);
        $(target).append(html);
    }
}

function addbadgeclick() {
    addbadge(badges[0], '.recentbadgelist', template);
}

function addbadge(source, target, template) {
    var html = template(source);
    $(target + ' .badge:first-child').remove();
    $(target).append(html);
}

var bronze_n = 3;
var silver_n = 2;
var gold_n = 4;
var highest_n = 10;
    
function drawbadgestats() {
    var b_canvas = document.getElementById("badgestats");
    var b_width = b_canvas.offsetWidth;
    var b_height = b_canvas.offsetHeight;
    var b_context = b_canvas.getContext("2d");
    //Bronze
    var bronze_w = (bronze_n / highest_n) * b_width;
    b_context.fillStyle='#BA6134';
    b_context.fillRect(0, 0, bronze_w, b_height / 3);
    //Silver
    var silver_w = (silver_n / highest_n) * b_width;
    b_context.fillStyle='#6B655D';
    b_context.fillRect(0, b_height / 3, silver_w, b_height / 3);
    //Gold
    var gold_w = (gold_n / highest_n) * b_width;
    b_context.fillStyle='#E2AF2F';
    b_context.fillRect(0, (b_height * 2) / 3, gold_w, b_height / 3);
    //Labels
    b_context.fillStyle = '#ffffff';
    b_context.textBaseline = "top";
    var font_size = b_height / 3 - 4;
    b_context.font = "normal " + font_size + "px Segoe UI, sans-serif";
    b_context.fillText(bronze_n, 5, 0);
    b_context.fillText(silver_n, 5, b_height/3);
    b_context.fillText(gold_n, 5, 2*b_height/3);
}
