import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default class Database extends React.Component {
     blockHandler=(element)=>{
        console.log(element);
    }
    render() {
      const { data } = this.props;
      return (
        <div>
           
        <ReactTable
          data={data}
          filterable
          columns={[
            {
              columns: [
                {
                    Header: "Name",
                    id: "name",
                    accessor: d => d.name,
                },
                {
                    Header: "College",
                    id: "college",
                    accessor: d => d.college,
                  },
                  {
                    Header: "Email",
                    id: "email",
                    accessor: d => d.email,
                  },
                  {
                    Header: "Branch",
                    id: "branch",
                    accessor: d => d.branch,
                  },
                {
                  Header: "Contact",
                  id: "contact",
                  accessor: d => d.contact,
                },
                {
                    Header: "Block",
                    accessor:d=>d.fb_id,
                    id:"block",
                    Cell: row => (
                        <button onClick ={()=>this.blockHandler(row.value)}>Block
                        </button>
                    )
                    

                  },
                {
                    Header: "FB ID",
                    id: "fb_id",
                    accessor: d => d.fb_id,
                  },
                {
                  Header: "Gender",
                  accessor: d => d.gender,
                  id: "gender",
                //   Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                  filterMethod: (filter, row) => {
                    if (filter.value === 'male') {
                        return row[filter.id] === 'male'
                    } else if (filter.value === 'female') {
                        return row[filter.id] === 'female';
                    } else if (filter.value === 'other') {
                        return row[filter.id] === 'other';
                    }
                    return true;
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        /> 
        </div>
      );
    }
  }
