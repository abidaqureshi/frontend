import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actions';
import Config from '../../config';


/*
Import form component
*/

class importFiles extends Component {

    socket = Config.io;

    uploadFileHander =  event  => {

        event.preventDefault();
        console.log(event);
        let validateTypes = ['exe','dmg','zip','tar','rar'];
        let fileName = document.getElementById("uploadField").files[0].name;       
        let extArray = fileName.split(".");
        let ext = extArray[extArray.length-1];
        let extensionVal = ext.toLowerCase();

        if ( validateTypes.indexOf(extensionVal) < 0 ) {

            
            this.props.thowErrorMessage({error_message:""});
            const data = new FormData();
            event.preventDefault();
            data.append('file', event.target.file.files[0]);
            data.append('originalFileName', event.target.file.files[0].name);
            data.append('dateCreated', Date.now());
            let values = { file: data };

            this.props.uploadFileToImport(values);            

        }else {           
            
            this.props.thowErrorMessage({error_message:"File is not supported for upload"})
           

        }

    }


    render () {

            return (
                    <div>
                        <form onSubmit={(event)=>{this.uploadFileHander(event)}} encType={"multipart/form-data"}>
                            <div>
                                <h1>
                                    CSV Import
                                </h1>
                            </div>
                            <div>                                
                                <span>
                                    <input type="file" name="file" id="uploadField" required  />
                                </span>
                            </div>
                            <div>
                                <button type="submit" id="uploadButton">
                                    Submit
                                </button>
                            </div>
                            <div className ={(this.props.file.total_records != 0 ? "realTimeRecordsCounter show": "realTimeRecordsCounter hide")}> 
                                <div>
                                    <span>
                                        Total records:
                                    </span>
                                    <span>
                                        {this.props.file.total_records}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        {this.props.file.message}
                                    </span>                                    
                                </div>
                                <div>
                                    <span>
                                        <b>
                                            {this.props.file.records_imported} / {this.props.file.total_records}
                                        </b>
                                    </span>
                                </div>                            
                            </div>
                            <div className={"fileError"}>   
                                {this.props.file.error_message}                             
                            </div>
                            <div className={(this.props.item.hasOwnProperty('_id') ? "itemDetails show" : "hide")}>
                                <div>
                                    Item Details
                                </div>
                                <span>
                                    Name: {this.props.item.name} | Age: {this.props.item.age} | Team: {this.props.item.team} | Address: {this.props.item.address}
                                </span>
                            </div>
                        </form>        
                    </div>                    
            );
    }

    componentDidMount () {

        /*
            Preparing a socket client to recieve realtime
            response from the server by pooling messages
            from web sockets
        */

        this.socket.on("connect",(error)=>{

            this.props.thowErrorMessage({error_message:""});
            
        });

        this.socket.on("liveProgressStation",data=>{
           
           this.props.updateFileImportProgress(data);        
        })

        this.socket.on("connect_error",(error)=>{

            this.props.thowErrorMessage({error_message:"Trying to connect to the server for realtime progress "});
            
        })

    }


}

const mapStateToProps = state => {

    return {

            file: state.fileImporter.file,
            item:state.querySearch.item

    }

}

const mapDispatchToProps = dispatch => {

    return {

            uploadFileToImport: values => dispatch(actionCreators.uploadCsvFileToServer(values)),
            updateFileImportProgress: data => dispatch(actionCreators.updateCsvFileProgress(data)),
            thowErrorMessage: data => dispatch(actionCreators.thowErrorMessage(data))

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(importFiles);