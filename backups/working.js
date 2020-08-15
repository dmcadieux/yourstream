
// Default stream objects
const forCBC = {
    streamName: "CBC",
    streamLink: "<iframe id=cbcFrame width=640 height=360 src=//www.cbc.ca/i/caffeine/syndicate/?mediaId=1711321155969 frameborder=0 allowfullscreen></iframe>"
};

const forF24 = {
    streamName: "France24",
    streamLink: "<iframe id=france24Frame width=640 height=360 src=https://www.youtube.com/embed/6N0lbZr_wXs frameborder=0 allow=accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture allowfullscreen></iframe>"
};

const forAlJ = {
    streamName: "AlJazeera",
    streamLink: "<iframe id=alJazeeraFrame width=640 height=360 src=https://players.brightcove.net/665003303001/SkrZHHcl_default/index.html?videoId=5467349513001&usrPersonaAds=0 allowfullscreen frameborder=0></iframe>"
};

function vid(l)
{
    document.querySelector("#vidWindow").innerHTML = l;
}

function loadStreams()
{
    const channelChanger = document.getElementById('channelList');
    const localStorage = window.localStorage;

    var defaults = [forCBC, forF24, forAlJ];

    // Loads default channels to local storage
    for (let i = 0; i < defaults.length; i++)
    {
        localStorage.setItem(defaults[i].streamName, defaults[i].streamLink);
    }

    for (let i = 0; i < defaults.length; i++)
    {
        var key = defaults[i].streamName;
        var link = defaults[i].streamLink;

        document.querySelector("#channelList").innerHTML +=
            '<li onclick="vid(\'' + link + '\')" id="' + key +  '">' +
                key + '</li>';
    }

}

window.onload = loadStreams();

