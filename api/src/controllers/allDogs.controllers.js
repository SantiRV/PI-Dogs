const {getApiInfo} = require('./getApiInfo.controller');
const {getDbInfo} = require('./getDbInfo.controller');

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo).sort((a,b) => {
        return a.name < b.name ? -1 : 1;
    });
    return totalInfo;
}
// const allDogs = async () =>{
//     const dogs = await axios.get(`${endpoint}${API_KEY}`);
//     return dogs.data.map((dog) => {
//         return {
//             id: dog.id,
//             name: dog.name,
//             weight: dog.weight.metric,
//             image: dog.image.url,
//             height: dog.height.metric,
//             age: dog.life_span,
//             temperament: dog.temperament,
//         }
//     })
// };

// const getTemps = async () => {
//     const dogs = await allDogs()
//     let temperaments = dogs.map( (dog) => dog.temperament ).toString()
    
//       temperaments = await temperaments.split(',');
//       const tempsConEspacio = await temperaments.map(el => {
//           if (el[0] == ' ') {
//               return el.split('');
//           }
//           return el;
//       });
//       const tempsSinEspacio = await tempsConEspacio.map(el => {
//           if (Array.isArray(el)) {
//               el.shift();
//               return el.join('');
//           }
//           return el;
//       })
  
//       await tempsSinEspacio.forEach(el => {
//           if (el != '') {
//               Temperament.findOrCreate({
//                   where: {
//                       name: el
//                   },
//               });
//           }
//       });
//       const allTemps = await Temperament.findAll();
//       return allTemps
//   }

module.exports = {
    getAllDogs
};