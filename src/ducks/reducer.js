const initialState = {
    lat: "",
    long: "",
    randomTerm: ['tacos', 'enchiladas', 'burritos', 'nachos', 'lasagna', 'pasta', 'pizza', 'pizza', 'naan', 'lamb', 'curry', 'gumbo', 'jambalaya', 'fried chicken', 'fried fish', 'grits', 'chicken fried steak' , 'thai', 'thai food', 'authentic thai food', 'greek', 'gyro', 'gyros', 'fried rice', 'kung pow', 'hot pot', 'sushi', 'tempura', 'sashimi', 'apple pie', 'wings', 'meatloaf', 'mac and cheese', 'blt', 'hot dog', 'burger', 'burger', 'cheese steak', 'barbecue','bbq', 'sandwich', 'gormet sandwich', 'bratwurst', 'kimchi', 'bibimbap', 'jamaican', 'mexican', 'italian', 'indian', 'cajun', 'chinese', 'japanese', 'american', 'french', 'spanish'],
    bus: [],
    selectedBusID: "",
    selectedBus: {},
    reviews: [],
    randBreakfast: ["bacon", "breakfast sausage", "eggs", "breakfast sandwich", "breakfast wrap", "breakfast burrito", "chorizo and eggs", "pancakes", "blueberry pancakes", "chocolate chip pancakes", "waffles", "french toast", "crepes", "muffins", "one eyed sandwich", "avacado toast", "oatmeal", "hashbrowns", "biscuts", " cinnamin rolls", "quiche", "granola bars", "breakfast cassorole", "breakfast pasteries", "breakfast strata", "breakfast souffle", "breakfast pizza"],
    randLunch: ["chicken tacos", "pasta salad", "chicken soup", "deviled eggs", "chicken chili", "fish tacos", "nachos", "dinner salad", "coleslaw", "chicken nuggets", "tuna salad", "egg salad", "chicken salad", "panini", "sandwich", "mac and cheese", "ramen", "buffalo wings", "buffalo wrap", "chicken wrap", "blt", "blt wrap", "lettuce wrap", "quesadilla", "beef burritos", "fajitas", "beef and broccli", "fettucini alfredo", "tomato bisque", "grilled cheese", "cheese burger", "chicken wings"],
    randDinner: ["pork chops", "meat balls", "beef tacos", "spaghetti", "pasta sauce", "beef steak", "baked chicken", "pizza dough", "corn bread", "mashed potatoes", "baked  salmon", "shrimp scampi", "bean chili", "baked potatoes", "pizza", "caprese pizza", "burger", "bean burger", "turkey burger", "bento", "lasagna", "stir fry", "bbq ribs", "bbq chicken", "pulled pork", "steak", "lamb", "fish and chips", "chicken cordon bleu", " green bean cassorole", "pot pie", "pot roast", "calzones", "sloppy joes"],
    randDessert: ["chocolate cake", "chocolate chip cookies", "cookies", "oatmeal rasin cookies", "sugar cookies", "m&m cookies", "apple pie", "pumpkin pie", "chocolate cupcakes", "chocolate mint bars", "cupcakes", "blueberry cupcakes", "tart", "brownies", "fudge brownies", "cheesecake", "lemon cake", "cobbler", "sheetcake", "ice cream", "tiramisu", "sorbet", "pudding", "pumpkin bar", "apple crisp", "jello", "doughnuts", "donuts", "snickerdoodle"],
    randDrink: ["martini", "appletini", "cosmo", "margarita", "frozen margarita", "strawberry margarita", "mojito", "daiquri", "strawberry daiquiri", "manhattan", "negroni", "bloody mary", "spicy bloody mary", "mai tai", "mint julep", "moscow mule", "dublin mule", "espresso martini", "irish coffee", "long island", "gin and tonic", "pina colada", "whiskey sour", "white russian", "dark n stormy", "tequila sunrise", "sex on the beach", "sangria", "screwdriver", "fireball", "mimosa"],
    recipesList: [],
    selectedRecipeID: "",
    selectedRecipe: {}
}

const GET_LAT = "GET_LAT";
const GET_LONG = "GET_LONG";
const SET_BUS = "SET_BUS";
const GET_SELECTED_BUS_ID = "GET_SELECTED_BUS_ID";
const SET_SELECTED_BUS = "SET_SELECTED_BUS";
const GET_REC_LIST = "GET_REC_LIST";
const GET_SELECTED_REC = "GET_SELECTED_REC"
const SELECT_REC = "SELECT_REC";
const GET_REVIEWS = "GET_REVIEWS";

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

export function getRecipes(rec){
    return{
        type: GET_REC_LIST,
        payload: rec
    }
}

export function getSelectedRecipeID(rec){
    return{
        type: GET_SELECTED_REC,
        payload: rec
    }
}

export function setRecipe(rec){
    return{
        type: SELECT_REC,
        payload: rec
    }
}

export function setReviews(rev){
    return{
        type: GET_REVIEWS,
        payload: rev
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
        case GET_REC_LIST:
            return Object.assign({}, state, {...state, recipesList: action.payload})
        case GET_SELECTED_REC:
            return Object.assign({}, state, {...state, selectedRecipeID: action.payload})
        case SELECT_REC:
            return Object.assign({}, state, {...state, selectedRecipe: action.payload})
        case GET_REVIEWS:
            return Object.assign({}, state, {...state, reviews: action.payload})
        default:
            return state;
    }
}