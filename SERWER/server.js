var fs = require("fs");
var qs = require("querystring")
var http = require("http");
var formidable = require("formidable")
var dataStore = require('nedb')

var dataBase = new dataStore({
    filename: 'db/database.db',
    autoload: true
});
doc = { name: "default", songs: [] }
function onLoad() {
    dataBase.count({ name: 'default' }, function (err, count) {
        if (count == 0) {
            dataBase.insert(doc, function (err, doc) {
                console.log(doc)
            })
        }
    });

}
var server = http.createServer(function (req, res) {
    onLoad()
    switch (req.method) {
        case "GET":
            if (req.url != "/favicon.ico") {
                console.log(req.url)
                if (req.url == "/admin") {
                    fs.readFile("static/index.html", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            res.end()
                        }
                    });
                } else if (req.url.includes(".mp3")) {
                    fs.readFile("." + decodeURI(req.url), function (error, data) {
                        var stats = fs.statSync("." + decodeURI(req.url));
                        res.writeHead(200, { "Content-Type": "audio/mp3", "Content-Length": JSON.stringify(stats.size), "Accept-Ranges": "bytes" });
                        res.end(data);
                    })

                } else {
                    let setType = (file) => {
                        let findDot = false
                        let ext = ""
                        let type = ""
                        let arr = file.split("")
                        let dotsCount = 0

                        for (var i = 0; i < arr.lenght; i++) {
                            if (arr[i] == ".") {
                                dotsCount++
                            }
                        }

                        for (var i = 0; i < arr.lenght; i++) {
                            if (arr[i] == ".") {
                                if (dotsCount == 1) {
                                    findDot = true
                                } else {
                                    dotsCount--
                                }
                            }
                            if ((findDot) && arr[i] != ".") {
                                ext += arr[i]
                            }
                        }
                        if (ext == "jpg") {
                            type = "image/jpg"
                        } else if (ext == "png") {
                            type = "image/png"
                        } else if (ext == "css") {
                            type = "text/plain"
                        } else if (ext == "js") {
                            type = "application/javascript"
                        }
                        return type
                    }
                    fs.readFile("static" + decodeURI(req.url), function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        } else {
                            res.writeHead(200, { 'Content-Type': setType(req.url) });
                            res.write(data);
                            res.end();
                        }
                    })
                }
            }
            break;
        case "OPTIONS":
            console.log("options")
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end();
            break;
        case "POST":
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            if (req.url == "/uploadFiles") {
                var form = new formidable.IncomingForm(),
                    files = [],
                    fields = [],
                    nameTab = []
                uploadDir = "static/albums/" + new Date().getTime()
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir);
                }
                form.uploadDir = uploadDir
                form.keepExtensions = true
                form.multiples = true

                form.on('fileBegin', function (name, file) {
                    //rename the incoming file to the file's name
                    file.path = form.uploadDir + "/" + file.name;
                })
                form.on('field', function (field, value) {
                    fields.push([field, value]);
                })
                form.on('file', function (field, file) {
                    nameTab.push(file.name)
                    files.push([field, file]);
                })
                form.on('end', function () {
                    console.log('done');
                });
                form.parse(req, function (err, fields, files) {
                    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                    res.write(JSON.stringify(nameTab));
                    res.end()
                });
            } else {
                servResponse(req, res)
            }
            break;
    }

    function createMapOfFolderNameAndFile(first, lookedDir = "", playList) {
        var allAlbums = lookUp()
        function lookUp() {
            let allAlbums = {
                dirs: [],
                files: [],
                listOfPlaylist: [],
                playlist: {}
            }
            if (playList) {
                dataBase.find({}, function (err, docs) {
                    let allDataFDataBase = docs;
                    allDataFDataBase[0].songs.forEach((item) => {
                        allAlbums.files.push(item);
                    });
                    res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' });
                    res.end(JSON.stringify(allAlbums));
                });
            } else {
                var doOnce = true
                var files = fs.readdirSync("./static/albums")
                files.forEach(function (file) {
                    allAlbums.dirs.push(file)
                    if (first) {
                        lookedDir = file
                        first = false
                    } else {
                        if (doOnce && lookedDir != "") {
                            var files2 = fs.readdirSync("./static/albums/" + lookedDir)
                            files2.forEach(function (item) {
                                if (!item.includes(".jpg") && !item.includes(".png")) {
                                    var workedArray = { album: "", file: "", size: "" }
                                    var stats = fs.statSync("./static/albums/" + lookedDir + "/" + item);
                                    workedArray.album = lookedDir
                                    workedArray.file = item
                                    workedArray.size = stats.size
                                    allAlbums.files.push(workedArray)
                                }
                            })
                            doOnce = false
                        }
                    }
                });
                return allAlbums;
            }
        }
        return allAlbums;
    }

    function servResponse(req, res) {
        var allData = "";
        req.on("data", function (data) {
            allData += data;
        })
        req.on("end", function (data) {
            if (allData != "") {
                var jsonObj = JSON.parse(allData);
                if (!jsonObj.hasOwnProperty("addToPlaylist")) {
                    var infoToClient = createMapOfFolderNameAndFile(jsonObj.firstLoad, jsonObj.album, jsonObj.playList)
                    if (!jsonObj.playList) {
                        res.end(JSON.stringify(infoToClient));
                    }
                } else {
                    dataBase.update({ name: 'default' }, { $push: { songs: jsonObj.addToPlaylist } }, {}, function () { });
                }
            }
        })
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
