const si = require('systeminformation')
const fs = require("fs");
function fancyTimeFormat(duration)
{
    // Hours, minutes and seconds
    let hrs = ~~(duration / 3600);
    let mins = ~~((duration % 3600) / 60);
    let secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

si.getAllData().then(data => {
    fs.writeFile("systeminformation.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        getSystemInformation()
});
});

async function getSystemInformation() {
    let data = await fs.readFileSync('systeminformation.json', (err, data) => {
        throw err
    })

    let parsedData = JSON.parse(data)

    console.log(`
    System Information
    ------------------
    OS : ${parsedData.os.distro} ${parsedData.os.release}
    Manufacturer: ${parsedData.system.manufacturer}
    Model: ${parsedData.system.model}
    Version: ${parsedData.system.version}
    Serial: ${parsedData.system.serial}
    UUID: ${parsedData.system.uuid}
    SKU: ${parsedData.system.sku}
    uptime: ${fancyTimeFormat(parsedData.time.uptime)}
    
    CPU Information
    ---------------
    Manufacturer : ${parsedData.cpu.manufacturer}
    Brand : ${parsedData.cpu.brand}
    Speed : ${parsedData.cpu.speed}
    Cores : ${parsedData.cpu.cores}
    Physical Cores : ${parsedData.cpu.physicalCores}
    Processors : ${parsedData.cpu.processors}

    Load
    ----
    Current Load : ${parsedData.currentLoad.avgLoad}%
    Current Load (1 min) : ${(parsedData.currentLoad.currentLoadUser).toFixed(2)} %
    
    Memory Information
    ------------------
    Total : ${(parsedData.mem.total / 1024 / 1024 / 1024).toFixed(2)} GB
    Free : ${(parsedData.mem.free / 1024 / 1024 / 1024).toFixed(2)} GB
    Used : ${(parsedData.mem.used / 1024 / 1024 / 1024).toFixed(2)} GB
    
    Disk Information
    ----------------
    Total : ${(parsedData.fsSize[0].size / 1024 / 1024 / 1024).toFixed(2)} GB
    Free : ${(parsedData.fsSize[0].available / 1024 / 1024 / 1024).toFixed(2)} GB
    Used : ${(parsedData.fsSize[0].used / 1024 / 1024 / 1024).toFixed(2)} GB
    
    Temperature Information
    -----------------------

    CPU : ${parsedData.cpu.temperature}
    
    
    
    
    `)
}