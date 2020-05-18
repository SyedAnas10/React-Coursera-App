import React, { Component } from "react";
import { Dishes } from "../shared/dishes";
import Menu from "./MenuComponent";
import Navigation from "./NavComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";

class Main extends Component{

    constructor(props){
        super(props);

        this.state = {
            dishes: Dishes
        };
    }

    render(){
        return(
            <div>
                <Navigation />
                <Switch>
                    <Route path="/home" component={() => <Home />} />
                    <Route path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;