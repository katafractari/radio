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
    spawn("ls", [dir])
        .stdout.on("data", (data) => {
            let filenames = data.toString().split("\n");
            filenames.forEach((filename) => {
                console.log(filename);
            })

        });
};

//findAndRemoves.forEach((args) => findAndRemove(args));
findRemoveDuplicates();

