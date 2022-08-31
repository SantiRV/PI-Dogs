import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_CREATED,
    GET_NAME,
    SORT_BY_WEIGHT,
    GET_DETAIL,
    ORDER_AS,
} from "../actions";

const initialState = {
    dogs: [],
    filter: [],
    temperaments: [],
    datail: [],
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
            }
        
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        
        case FILTER_BY_TEMPERAMENT:
            const newFilter = state.dogs;
      const statusFilter =
        action.payload === "temeperament"
          ? newFilter
          : newFilter.filter((d) => d.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: statusFilter,
      };
        case FILTER_CREATED:
            const allDogs = state.dogs;
      const createFilter =
        action.payload === "created" 
          ? allDogs.filter((dog) => dog.createInDb)
          : allDogs.filter((dog) => !dog.createInDb);
      return {
        ...state,
        dogs: createFilter,
      };
        
        case GET_NAME:
            return {
                ...state,
                dogs: action.payload
            };
        
        case SORT_BY_WEIGHT:
            const weight = state.dogs.filter(
                (d) => !isNaN(d.weight ? d.weight[0] : d.weight_min)
              );
              const orderW =
                action.payload === "min"
                  ? weight.sort(function (a, b) {
                      if (
                        parseInt(a.weight ? a.weight[0] : a.weight_min) <
                        parseInt(b.weight ? b.weight[0] : b.weight_min)
                      ) {
                        return -1;
                      }
                      if (
                        parseInt(a.weight ? a.weight[0] : a.weight_min) >
                        parseInt(b.weight ? b.weight[0] : b.weight_min)
                      ) {
                        return 1;
                      }
                      return 0;
                    })
                  : weight.sort(function (a, b) {
                      if (
                        parseInt(a.weight ? a.weight[0] : a.weight_min) <
                        parseInt(b.weight ? b.weight[0] : b.weight_min)
                      ) {
                        return 1;
                      }
                      if (
                        parseInt(a.weight ? a.weight[0] : a.weight_min) >
                        parseInt(b.weight ? b.weight[0] : b.weight_min)
                      ) {
                        return -1;
                      }
                      return 0;
                    });
              return {
                ...state,
                dogs: action.payload === "weight" ? state.filter : orderW,
              };

        case ORDER_AS:
                const sortOrder =
                  action.payload === "asc"
                    ? state.dogs.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                          return -1;
                        }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                          return 1;
                        }
                        return 0;
                      })
                    : state.dogs.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                          return 1;
                        }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                          return -1;
                        }
                        return 0;
                      });
                return {
                  ...state,
                  dogs: sortOrder,
                };
        
        case 'POST_DOG':
            return {
                ...state,
            }
        
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            }
        
        default:
            return state;
            
    }
}
