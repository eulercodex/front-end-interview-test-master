import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import { Pagination, Form, Grid } from 'semantic-ui-react'
import API from './API';

class InterviewTestContainer extends Component {
    constructor(props) {
        super(props);

        this.buildingEnum = {
            'multiFamily' : "multi family",
            'singleFamily': "single family" 
        };
        //pagination option for requesting more pages from server
        this.paginationOption = {};

        this.state = {
            minimumBed: '',
            maximumBed: '',
            minimumBath: '',
            maximumBath: '',
            buildingTypeOptions: [],
            selectedBuildingTypeFilters:[],
            activePage: 1,
            totalPages: 1,
            maxResultPerPage: 50, //Hardcoded Value
            totalResultFound: 0,
            tableContent: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }

    componentDidMount() {
        API.getBuildingTypes().then(({ data }) => {
            const option = data.map(el => {
                return {
                    key: el.id,
                    text: this.buildingEnum[el.name] || el.name,
                    value: el.id
                }
            });
            this.setState({ buildingTypeOptions : option });
        }).catch(error => console.error("Failed to load resource", error));
    }

    handleChange(event, { name , value }) {
        this.setState({ [name]: value });
    }

    handleDropdownChange(event, { value }) {
        this.setState({selectedBuildingTypeFilters: value});
    }

    handlePaginationChange(event, { activePage }) {
        let option = this.paginationOption;
        option.page = activePage;
        this.setState({ activePage });
        API.getLocations(option).then(response=> {
            this.setState({tableContent: response.data})
        }).catch(error => console.error("A problem occured while changing pages", error));
    }

    handleSubmit(event) {
        event.preventDefault();
        const { maxResultPerPage } = this.state;
        const option = {
            minBed: this.state.minimumBed,
            maxBed: this.state.maximumBed,
            minBath: this.state.minimumBath,
            maxBath: this.state.maximumBath,
            buildingTypeFilter: this.state.selectedBuildingTypeFilters,
            limit: maxResultPerPage
        }
        API.getLocations(option).then(response=> {
            const totalResultFound = Number(response.headers['x-total-count'])
            const activePage = 1;
            const totalPages = Math.ceil(totalResultFound/maxResultPerPage);
            //store this option for pagination
            this.paginationOption = option;
            this.setState({
                activePage,
                totalPages,
                totalResultFound,
                tableContent: response.data
            });
        }).catch(error => console.error("A problem occured", error));
    }

    render() {
        const {
            minimumBed,
            maximumBed,
            minimumBath,
            maximumBath,
            buildingTypeOptions,
            selectedBuildingTypeFilters,
            activePage,
            totalPages,
            maxResultPerPage,
            totalResultFound,
            tableContent
        } = this.state;

        return (
            <div className="interviewTestContainer">
                <div className="filterContainer">
                    Your filters go here.
                    <br/>
                    <Grid centered>
                        <Grid.Column width={9}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group inline>
                                    <label>Beds</label>
                                    <Form.Input type='number' placeholder='Min' name='minimumBed' value={minimumBed} onChange={this.handleChange} width={3}/>
                                    <Form.Input type='number' placeholder='Max' name='maximumBed' value={maximumBed} onChange={this.handleChange} width={3}/>
                                    <label>Baths</label>
                                    <Form.Input type='number' placeholder='Min' name='minimumBath' value={minimumBath} onChange={this.handleChange} width={3}/>
                                    <Form.Input type='number' placeholder='Max' name='maximumBath' value={maximumBath} onChange={this.handleChange} width={3}/>
                                </Form.Group>
                                <Form.Group inline>
                                    <label>Choose building Style</label>
                                    <Form.Dropdown
                                    placeholder='Default: Any!'
                                    selection
                                    multiple
                                    options={buildingTypeOptions}
                                    value={selectedBuildingTypeFilters}
                                    onChange={this.handleDropdownChange}
                                    />
                                </Form.Group>
                                <Form.Button primary content="Search"/>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
                <br/>
                <div>
                    {totalResultFound > maxResultPerPage 
                    && <Pagination
                        activePage={activePage} 
                        onPageChange={this.handlePaginationChange}
                        totalPages={totalPages}
                        />
                    }
                </div>
                <RemineTable properties={tableContent} buildingEnum={this.buildingEnum}/>
                <br/>
                <div>
                    {totalResultFound > maxResultPerPage 
                    && <Pagination
                        activePage={activePage} 
                        onPageChange={this.handlePaginationChange}
                        totalPages={totalPages}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default InterviewTestContainer;
