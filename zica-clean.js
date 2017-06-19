const fs = require("fs");
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
    spawn("sh", ["-c", `find "${dir}" -mindepth 1 -printf "%f\t%s\n" | sort`])
        .stdout.on("data", (data) => {
            let groups = {};
            data
                .toString()
                .split("\n")
                .filter(filenameSize => filenameSize !== "")
                .map(filenameSize => {
                    let fs = filenameSize.split("\t");
                    return { name: fs[0], size: fs[1] };
                })
                .map(filenameSize => {
                    let key = stripDuplicateNumber(filenameSize.name);
                    if(key in groups) {
                        groups[key].push(filenameSize);
                    } else {
                        groups[key] = [ filenameSize ];
                    }
                });

            Object.keys(groups)
                .filter((key) => groups[key].length > 1)
                .forEach((key) => {
                    console.log(`Cleaning ${key}`);
                    let maxSize = 0;
                    let maxIndex = 0;
                    groups[key].forEach((file, index) => {
                        if(file.size > maxSize) {
                            maxSize = file.size;
                            maxIndex = index;
                        }
                    });
                    console.log(groups[key]);
                    groups[key]
                        .filter((file, index) => index !== maxIndex)
                        .forEach((file) => {
                            fs.unlinkSync(`${dir}/${file.name}`, error => {
                                if(error) throw error;
                                console.log(`Deleted ${file.name}`);
                            })
                        });

                    let oldFilename = groups[key][maxIndex].name;
                    let newFilename = stripDuplicateNumber(groups[key][maxIndex].name);
                    if(oldFilename.match(/\(\d+\)\.mp3$/)) {
                        console.log(`Renaming ${oldFilename} -> ${newFilename}`);
                        fs.renameSync(`${dir}/${oldFilename}`, `${dir}/${newFilename}`, error => {
                            if(error) throw error;
                            console.log(`Renamed ${oldFilename}`);
                        });
                    }
                });
        });
};

const stripDuplicateNumber = (filename) => {
    return filename.replace(/ \(.*\)\.mp3/, ".mp3");
};

//findAndRemoves.forEach((args) => findAndRemove(args));
findRemoveDuplicates();

