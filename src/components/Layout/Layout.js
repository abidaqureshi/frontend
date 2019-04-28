import React from 'react';
import Aux from '../../hoc/Aux';
import './Layout.css';
import Search from '../../containers/search/search';

/*
    Layout container which holds the 
    Auto complete search component
*/

const Layout = (props) => {

    return (
                <Aux>
                    <header> 
                        <Search />                        
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                       
                    </footer>
                </Aux>
    );

}

export default Layout;