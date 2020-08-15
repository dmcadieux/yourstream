// Default channels
localStorage.setItem('CBC', '<iframe id="cbcFrame" class="iframes" src="//www.cbc.ca/i/caffeine/syndicate/?mediaId=1711321155969" frameborder="0" allowfullscreen></iframe>');
localStorage.setItem('France 24', '<iframe id="france24Frame" class="iframes" src="https://www.youtube.com/embed/6N0lbZr_wXs" frameborder="0" allow=accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture allowfullscreen></iframe>');
localStorage.setItem('Al Jazeera', '<iframe id="alJazeeraFrame" class="iframes" src="https://players.brightcove.net/665003303001/SkrZHHcl_default/index.html?videoId=5467349513001&usrPersonaAds=0" allowfullscreen frameborder="0"></iframe>');

// Populates video window with iframe
function playVid(key)
{
    document.querySelector(".vidWindow").innerHTML = localStorage.getItem(key);
}

// Gets the highest stream number
function countStreams()
{
    let highest = 0;
    noNameStreams = /MyStream/i;

    for (let i = 0; i < localStorage.length; i++)
    {
        if (localStorage.key(i).match(noNameStreams))
        {
            var streamNum = localStorage.key(i).match(/\d+/i);

            if (streamNum > highest)
            {
                highest = parseInt(streamNum);
            }
        }
    }

    return highest;
}

function loadStreams()
{
    // Checks local storage for stored kv's. Loads as list items. Each time a stream is added or deleted, reloads page and repops channel list.
    // Stream plays by loading key name to playvid function
    // Playvid then gets the iframe value from the key that was passed in

    const box = document.getElementById('channelList');
    const localStorage = window.localStorage;


    // Adds key names to array called keys
    var keys = [];

    for (let i = 0; i < localStorage.length; i++)
    {
        var k = localStorage.key(i);
        keys.push(k);
    }

    keys = keys.sort();

    // Populates video window with desired HTML string
    for (let j = 0; j < keys.length; j++)
    {
        // Assigns key name
        streamName = keys[j];

        // Inserts HTML list item with link into channel container
        box.innerHTML +=
            "<li class='chanItems' onclick=\"" + "playVid(\'" + streamName + "\')\" ondblclick=\"" +
            "deleteStream(\'" + streamName + "\')\" id=\'" + streamName + "\'><img class='play' src='assets/play_arrow.png'>"
            + streamName + "</li>";
    }

}

function addStream()
{
    var userKey = document.querySelector("#userStreamName").value;
    var userStream = document.querySelector("#userStreamLink").value;

    // Numbers unnamed stream by getting highest val unnamed stream
    var noName = countStreams();

    if (userKey === '')
    {
        userKey = "MyStream " + (noName + 1);
    }

    var widthPatt = /width="\d+"/i;
    var heightPatt = /height="\d+/i;

    // Make more checks for valid html element?

    if (userStream === '')
    {
        alert("Add an HTML element.");
        return;
    }

    // Standardizes dimensions of user input
    var temp = userStream.replace(widthPatt,'class="iframes"');
    var nexttemp = temp.replace(heightPatt,'');

    // Tool to prevent XSS attacks
    // var clean = DOMPurify.sanitize(nexttemp);

    localStorage.setItem(userKey, nexttemp);

    location.reload();
}

function deleteStream(key)
{
    localStorage.removeItem(key);
    location.reload();
}


window.onload = loadStreams();

