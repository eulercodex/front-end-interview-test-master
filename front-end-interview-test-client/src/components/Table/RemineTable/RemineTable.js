import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import './RemineTable.css';

class RemineTable extends Component {
    render() {
        const { buildingEnum } = this.props;    
        return (
            <div className="tableContainer">
                <p>Table length: <strong>{this.props.properties.length}</strong></p>
                <Table celled compact color='blue'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Building Type</Table.HeaderCell>
                            <Table.HeaderCell>Beds</Table.HeaderCell>
                            <Table.HeaderCell>Baths</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.properties.map(property => (
                        <Table.Row key={property.id}>
                            <Table.Cell>{property.address}</Table.Cell>
                            <Table.Cell>{buildingEnum[property.buildingType.name] || property.buildingType.name}</Table.Cell>
                            <Table.Cell>{property.beds}</Table.Cell>
                            <Table.Cell>{property.baths}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

RemineTable.defaultProps = {
    properties: []
}

RemineTable.propTypes = {
    properties: PropTypes.array
}

export default RemineTable;
