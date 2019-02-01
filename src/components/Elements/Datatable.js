import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net');

function updateTable(values) {
    const table = $('.data-table-wrapper')
                  .find('table')
                  .DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldValues = this.data();
        const newValues = values.find(nameData => {
            return nameData.name === oldValues.name;
        });
        if (oldValues.nickname !== newValues.nickname) {
            dataChanged = true;
            this.data(newValues);
        }
        return true;
    });

    if (dataChanged) {
        table.draw();
    }
}

function reloadTableData(values) {
    const table = $('.data-table-wrapper')
                  .find('table')
                  .DataTable();
    table.clear();
    table.rows.add(values);
    table.draw();
}

class Datatable extends Component { 
    componentDidMount() {
        console.log(this.props);
        $(this.refs.main).DataTable({
           dom: '<"data-table-wrapper"t>',
           data: this.props.values,
           columns: this.props.headers,
           ordering: true
        });
    }
    componentWillUnmount(){
       $('.data-table-wrapper')
       .find('table')
       .DataTable()
       .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.values.length !== this.props.values.length) {
            reloadTableData(nextProps.values);
        } else {
            updateTable(nextProps.values);
        }
        return false;
    }
    render() {
        return (
            <div>
                <table ref="main" className="display" />
            </div>);
    }
}
export default Datatable;