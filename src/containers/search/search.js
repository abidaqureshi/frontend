import React, { Component } from 'react';
import {connect} from  'react-redux';
import * as actionCreators from '../../store/actions/actions';

/*
Auto complete component
*/

class Search extends Component{

    state = {
                showAutoComp:false
    }

    findTypedText = evt => {

        let searchText = evt.target.value;
        if ( searchText.length > 0 ) {

            this.setState({showAutoComp:true});
            this.props.getQueryResult(searchText);

        }else if (searchText.length === 0 ) {

            this.setState({showAutoComp:false});
        }
        

    }

    showItemDetails = itemIndex => {

        this.setState({showAutoComp:false});
        let itemData = this.props.results[itemIndex];
        this.props.showItemDetails(itemData);
    }

    render() {


        return (
                    <div>
                        <div>
                            <span>
                            <input type="text" id="Search" size="40" onKeyUp={(evt)=>{this.findTypedText(evt)}} placeholder="Search a word" />
                            </span>
                        </div>
                        <div className={(this.state.showAutoComp? "searchResults show" : "searchResults hide")}>
                            {this.props.results.map((item,i)=>{

                                return (
                                        <div id={"result-"+i} onClick={()=>this.showItemDetails(i)} className={"searchResultItem"}>
                                            <span>
                                                {item.name}
                                            </span>                                            
                                        </div>
                                );
                            })}
                            
                        </div>
                    </div>
                
                );
    }

}

const mapStateToProps = state => {

    return {

            results:state.querySearch.results,
           

    }

};

const mapDispatchToProps = dispatch => {

    return {

        getQueryResult: searchTxt => dispatch(actionCreators.makeQueryToTheServer(searchTxt)),
        showItemDetails: itemData => dispatch({type:'SHOW_ITEM_DETAILS', payload:itemData})
    }

}

export default connect(mapStateToProps, mapDispatchToProps) (Search);