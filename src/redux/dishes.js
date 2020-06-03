
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
    }, action) => {
    switch(action.type){
        case 'ADD_COMMENT':
            var comment = action.payload;
            comment.id = state.dishes.filter((dish) => dish.id === comment.dishId)[0].comments.length;
            comment.date = new Date().toISOString();
            var updatedDishes = state.dishes;
            updatedDishes.filter((dish) => dish.id === comment.dishId)[0].comments.push(comment);
            return {...state, isLoading: false, errMess: null, dishes: updatedDishes};
        
        case 'DISHES_LOADING':
            return {...state, isLoading: true, errMess: null, dishes: []};
            
        case 'DISHES_FAILED':
            return {...state, isLoading: false, errMess: action.payload}; 
            
        case 'ADD_DISHES':
            return {...state, isLoading: false, errMess: null, dishes: action.payload};    
        
        default:
            return state;
    }
};