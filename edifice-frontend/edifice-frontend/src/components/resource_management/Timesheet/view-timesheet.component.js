import React, { Component } from 'react';

import Create from "./create.component";
import AddWorker from "./add_worker.component";
import Approve from "./approve.component";
import RemoveApprove from "./remove-approve.component";
import Card from 'react-bootstrap/Card';

import TimesheetDataService from "../../../services/timesheet.service";

class Timesheet extends Component {
    constructor(props) {
        super(props);
        this.retrieveTimesheet = this.retrieveTimesheet.bind(this);

        this.state = {
                code:this.props.match.params.code,
                timesheet:[]
        };
      }

      componentDidMount() {
        this.retrieveTimesheet(this.props.match.params.code);
      }

      retrieveTimesheet(id){
          TimesheetDataService.get(id)
          .then(response => {
              this.setState({
                timesheet: response.data
              });
              console.log(response.data);
              })
            .catch(e => {
              console.log(e);
      });
      }

    render() {
        const {id , timesheet} = this.state;
        
        //console.log(timesheets)
        return (
          <div>
            <Card
              bg={'success'}
              text={'white'}
              className="mb-2">    
              <Card.Body>
                <h4>Timesheet</h4>
              </Card.Body>
            </Card> 


            <Card 
            className="mb-2"
            bg={'light'}>
                <Card.Body>
                    <h6>Code:{timesheet.code}</h6>
                    <h6>Date: {timesheet.date}</h6>
                    <h6>Status: {timesheet.status}</h6>
                    <h6>ProjectId:{timesheet.projectId}</h6>
                </Card.Body>
            </Card>
      
            <div className="card text-right">

            <div className="card-body">    
                <button                         
                    className="btn btn-primary m-3" 
                    data-toggle="modal" 
                    data-target="#addWorker">
                        Add Workers
                </button>

                    <table className="table table-bordered align-middle">
                            <thead>
                                <tr>
                                    <th className=" align-middle text-center"  rowspan="2">Crew</th>
                                    <th  className=" align-middle text-center" rowspan="2">Employee Name</th>
                                    <th  className=" align-middle text-center" rowspan="2">Location</th>
                                    <th  className=" align-middle text-center" rowspan="2">Start</th>
                                    <th className=" align-middle text-center" colspan="2">Lunch</th>
                                    <th className=" align-middle text-center" colspan="2">Tea</th>
                                    <th className=" align-middle text-center" rowspan="2">Leave</th>
                                </tr>
                                <tr>
                                    <th className=" align-middle text-center" >Start</th>
                                    <th className=" align-middle text-center" >End</th>
                                    <th className=" align-middle text-center" >Start</th>
                                    <th className=" align-middle text-center" >End</th>
                                </tr>
                            </thead>
                        <tbody>

                            <tr>
                                <td>
                                    crename
                                </td>
                                <td>Randie pathirae</td>
                                <td>First Floor</td>
                                <td>                                 
                                    <input 
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>           
                                </td>
                                <td>
                                    <input 
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input 
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                                <td>
                                    <input
                                    type="time" 
                                    id="default-picker" 
                                    className="form-control" 
                                    placeholder="Select time"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {timesheet.status == "Pending"?
                    <button 
                    href="#" 
                    className="btn btn-primary" 
                    data-toggle="modal" 
                    data-target="#approve"> 
                        Approve
                    </button>:
                    
                    <button 
                    href="#" 
                    className="btn btn-primary" 
                    data-toggle="modal" 
                    data-target="#removeApprove"> 
                        Remove the Approval
                    </button>}
                    
                    {/*------------------------------------ Approve Starts------------------------------------------------------------------ */}
                    <div className="modal fade" id="approve" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <Approve/>
                    </div>
                    {/*-------------------------------------Approve Ends----------------------------------------------------------------------*/}

                    {/*------------------------------------ Remove Approve Starts------------------------------------------------------------------ */}
                    <div className="modal fade" id="removeApprove" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <RemoveApprove/>
                    </div>
                    {/*-------------------------------------Remove Approve Ends----------------------------------------------------------------------*/}


                    <div className="modal fade" id="addWorker" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                   <AddWorker 
                   timesheetId={timesheet.code}
                   id={id}/> 
                </div>





                </div>
            </div>
          </div>
          
        );
      }
    }

export default Timesheet;