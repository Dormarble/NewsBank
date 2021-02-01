import mongoose from 'mongoose';
import fs from 'fs';

const DBdataPath = './DBdata.json';
class Database {
    constructor(DBKey) {
        this.key = DBKey;
        this.setup = getDBsetup();
    }
    connect = () => {
        try {
            mongoose.connect(this.key, { useNewUrlParser:true, useUnifiedTopology: true });
            console.log("Connect database successfully");
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    updateSetup = (setup) => {
        let newSetup = Object.assign(getDBsetup(), setup);
        fs.writeFileSync(DBdataPath, JSON.stringify(newSetup));
        this.setup = newSetup;
    }
}

function getDBsetup() {
    let rawData = fs.readFileSync(DBdataPath);
    return JSON.parse(rawData);
}


export default Database