const spawn = require("child_process").spawn;

const dir = "data/Radio ZICA";

let findAndRemoves = [
    ["-size", "+15M"],
    ["-regex", ".*Not Available Right Now.*"],
    ["-regex", ".*spletni radio kratka.*"],
    ["-regex", ".*radio zica zari in pali.*"],
    ["-regex", ".*Radio zica - spletni radio short short.*"],
    ["-regex", ".*drblues.*"],
    ["-regex", ".*service not available.*"],
    ["-type", "f", "-size", "-1024k"], // returns variable number of results when called consecutively
    ["-iregex", ".*Siddharta.*"],
    ["-iregex", ".*Bryan Adams.*"],
    ["-regex", ".*Matisyahu.*"]
];

const findAndRemove = (args) => {
    const find = spawn("find", [dir, ...args, "-ls"]);
    find.stdout.on("data", (data) => {
        console.log(data.toString())
    });
};

const findRemoveDuplicates = () => {
    spawn("find", [dir, "-mindepth", "1", "-printf", "%f\t%s\n"])
        .stdout.on("data", (data) => {
            let filenamesSizes = data
                .toString()
                .split("\n")
                .filter((filenameSize) => filenameSize !== "")
                .map((filenameSize) => filenameSize.split("\t"));

            let fileGroups = [];
            let currentFile;
            filenamesSizes.forEach((filename) => {
                console.log(filename[0])
                currentFile = filename[0]
            })
        });
};

//findAndRemoves.forEach((args) => findAndRemove(args));
findRemoveDuplicates();

