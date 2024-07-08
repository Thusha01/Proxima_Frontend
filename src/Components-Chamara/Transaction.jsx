import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import "./TransactionStyles.css"; // Ensure this file exists
import TextField from '@mui/material/TextField';
import Invoice from "./Invoice"; // Ensure this component exists


function Transaction() {
    const [projects, setProjects] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [SelectedType, setSelectedType] = useState("");
    const [Description, setDescription] = useState("");
    const [Value, setValue] = useState("");
    const [Date, setDate] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`https://localhost:44339/api/Transaction/register`);
            console.log("Projects:", response.data); // Debugging: log fetched projects
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchTransactions = async (projectId) => {
        try {
            const response = await axios.get(`https://localhost:44339/api/Transaction/Project/${projectId}/transactions`);
            console.log("Transactions:", response.data); // Debugging: log fetched transactions
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleProjectChange = (event) => {
        const projectId = event.target.value;
        setSelectedProject(projectId);
        if (projectId) {
            fetchTransactions(projectId);
        }
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const addValues = async () => {
        const transacdata = {
            Value: Value,
            Type: SelectedType,
            Description: Description,
            Date: Date
        };

        const url = `https://localhost:44339/api/Transaction/Project/${selectedProject}/register`;

        try {
            const response = await axios.post(url, transacdata);
            alert("Value added successfully");
            window.location.reload(); // Refresh Page
        } catch (error) {
            if (error.response) {
                alert(`Server responded with status ${error.response.status}: ${error.response.data}`);
            } else if (error.request) {
                alert("No response received from the server");
            } else {
                alert(`Error setting up the request: ${error.message}`);
            }
        }
    };

 
    return (
        <div className="tpage">
            <div className="transactoncol">
                <Form>
                    <Row className="selectionitem">
                        <Form.Group as={Col} controlId="formGridProject">
                            <Form.Label>
                                <div className="Invoicename">
                                    <p><b>Project</b>:</p>
                                </div>
                                <select id="SelectProject" className="Projectlist1" value={selectedProject} onChange={handleProjectChange}>
                                    <option value="">Select project here...</option>
                                    {projects.map(project => (
                                        <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
                                    ))}
                                </select>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridType">
                            <Form.Label>
                                <div className="Type">
                                    <p><b>Type</b> :</p>
                                </div>
                                <select id="SelectType" className="transactype" value={SelectedType} onChange={handleTypeChange}>
                                    <option value="">Select Type...</option>
                                    <option value="Income">Income</option>
                                    <option value="Expence">Expence</option>
                                </select>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDate">
                            <Form.Label>
                            <p><b>Date</b> :</p>
                                <div className="datepicker">
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="last_updated"
                                        type="date"
                                        value={Date}
                                        onChange={(e) => setDate(e.target.value)}
                                        inputProps={{
                                            style: {
                                                height: "30px",
                                                paddingTop: "0px",  // Adjust top padding 
                                                paddingBottom: "0px" // Adjust bottom padding 
                                            }
                                        }}
                                        style={{ backgroundColor: "white", width: "220px", marginTop: "5px", marginLeft: "10px" }}
                                    />
                                </div>
                            </Form.Label>
                        </Form.Group>
                    </Row>
                    <Row className="val-and-dis">
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label><b>Description</b></Form.Label>
                            <Form.Control placeholder="Enter budget description" onChange={handleDescriptionChange}
                                style={{ fontSize: "16px" }} autoComplete="off" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridValue">
                            <Form.Label><b>Value</b></Form.Label>
                            <Form.Control placeholder="Enter budget value" onChange={handleValueChange}
                                style={{ fontSize: "16px" }} autoComplete="off" />
                        </Form.Group>
                    </Row>
                    <div className="addbutton">
                        <Row>
                            <Form.Group className="submit-btn" controlId="formGridAddress1">
                                <Button variant="primary" type="button" id="usubmit" onClick={addValues} className="addbtn" 
                                style={{ backgroundColor: '#20C997', color: 'white' }}>
                                    Add
                                </Button>
                            </Form.Group>
                        </Row>
                    </div>
                </Form>
            </div>
            <div className="outerlyr">
            <div className="invoicereport">
                <Invoice projectId={selectedProject} />  {/*import invoice report*/}
            </div>
            </div>

        </div>
    )
}

export default Transaction;
