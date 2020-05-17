import React, { Component } from "react";
import { Dishes } from "../shared/dishes";
import Menu from "./MenuComponent";
import DishDetail from "./dishDetailComponent";
import Navigation from "./NavComponent";

class Main extends Component{

    constructor(props){
        super(props);

        this.state = {
            dishes: Dishes,
            selectedDish: null
        };
    }

    onDishSelect(dish){
        this.setState({selectedDish: dish});
    }

    render(){
        return(
            <div>
                <Navigation />
                <Menu dishes={this.state.dishes} onClick={(dish) => {this.onDishSelect(dish)}}/>
                <DishDetail dish={this.state.selectedDish}/>
            </div>
        );
    }
}

export default Main;