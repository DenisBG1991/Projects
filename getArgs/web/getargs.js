function getArgs(){
    var args = {};
    alert("location.href = " + location.href);
    alert("location = " + location);
    alert("location.protocol = " + location.protocol);
    alert("location.port = " +location.port);
    alert("location.host = " + location.host);
    alert("location.pathname = " + location.pathname);
    alert("location.search = " + location.search);
    location.replace('https://www.youtube.com/');
    history.back();
    //location = 'staticpage.html';
    var query = location.search.substring(1);
    var pair = query.split("&");
    for (var i = 0; i < pair.length; i++){
        var pos = pair[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pair[i].substring(0,pos);
        var value = pair[i].substring(pos+1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args;
}
