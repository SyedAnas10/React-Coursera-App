import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const Navigation = () => {
    return(
        <Navbar dark color="primary">
            <div className="container">
                <NavbarBrand href="/">Confusion Restaurant</NavbarBrand>
            </div>
        </Navbar>  
    )
}

export default Navigation;