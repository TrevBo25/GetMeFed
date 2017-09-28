const initialState = {
    lat: "",
    long: "",
    randomTerm: ['tacos', 'enchiladas', 'burritos', 'nachos', 'lasagna', 'pasta', 'gormet pizza', 'pizza', 'naan', 'lamb', 'curry', 'gumbo', 'jambalaya', 'fried chicken', 'fried fish', 'grits', 'chicken fried steak' , 'thai', 'thai food', 'authentic thai food', 'greek', 'gyro', 'gyros', 'fried rice', 'kung pow', 'lo mein', 'bejing', 'hot pot', 'sushi', 'tempura', 'sashimi', 'apple pie', 'wings', 'meatloaf', 'mac and cheese', 'blt', 'hot dog', 'burger', 'gormet burger', 'cheese steak', 'barbecue','bbq', 'sandwich', 'gormet sandwich', 'bratwurst', 'spatzl', 'kimchi', 'bibimbap', 'jamaican', 'mexican', 'italian', 'indian', 'cajun', 'chinese', 'japanese', 'american', 'french', 'spanish', 'caribbean'],
    bus: [],
    selectedBusID: "",
    selectedBus: {}
}

const GET_LAT = "GET_LAT";
const GET_LONG = "GET_LONG";
const SET_BUS = "SET_BUS";
const GET_SELECTED_BUS_ID = "GET_SELECTED_BUS_ID";
const SET_SELECTED_BUS = "SET_SELECTED_BUS";

export function getLat(lat){
    return {
        type: GET_LAT,
        payload: lat
    }
}

export function getLong(long){
    return{
        type: GET_LONG,
        payload: long
    }
}

export function setBus(bus){
    return{
        type: SET_BUS,
        payload: bus
    }
}

export function getSelectedBusID(pick){
    return {
        type: GET_SELECTED_BUS_ID,
        payload: pick
    }
}

export function setSelectedBus(selection){
    return {
        type: SET_SELECTED_BUS,
        payload: selection
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_LAT:
            return Object.assign({}, state, {...state, lat: action.payload})
        case GET_LONG:
            return Object.assign({}, state, {...state, long: action.payload})
        case SET_BUS:
            return Object.assign({}, state, {...state, bus: action.payload})
        case GET_SELECTED_BUS_ID:
            return Object.assign({}, state, {...state, selectedBusID: action.payload})
        case SET_SELECTED_BUS:
            return Object.assign({}, state, {...state, selectedBus: action.payload})
        default:
            return state;
    }
}