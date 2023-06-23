const {getApiInfo} = require('./getApiInfo.controller');
const {getDbInfo} = require('./getDbInfo.controller');

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};


module.exports = {
    getAllDogs
};