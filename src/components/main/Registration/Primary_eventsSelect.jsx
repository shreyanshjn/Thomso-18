import React, { Component } from 'react';

import Select from 'react-select';

const options = [
    "Step Up",
    "Foot Loose",
    "Nukkad Natak",
    "Abhivyakti",
    "Battle of Band",
    "Sargam",
    "Food Fiesta",
    "Thomso's Got Talent",
    "Seiger",
    "Treasure Hunt",
    "16 Frames",
    "Box Office",
    "Vogue",
    "Mr & Ms Thoms",
    "Campus Diva",
    "Apocalypes",
    "Queen's Gambit",
    "Snooker Elit",
    "Street Soccer",
    "Art Talkies",
    "Naqaab",
    "Paint Fiesta",
    "Literati",
    "Spin A yarn",
    "Auction frenzy",
    "Mark Sense",
    "Quriosity",
    "Telly Sporcle",
    "Informals (Others)",
].map(state => ({
    value: state,
    label: state,
}));

const customStyles = {
    option: (base, state) => ({
        ...base,
        borderBottom: '1px solid black',
        color: 'black',
        padding: 10,
    }),
    control: () => ({
        width: '100%',
        display: 'flex',
        borderBottom: '#BEBEBE 2px solid',
    }),
    input: (base) => ({
        ...base,
        marginTop: '3px',
        paddingTop: '5px',
        color: 'white',
        fontSize: '14px',
        overflow: 'hidden'
    }),
    menuList: (base) => ({
        ...base,
        height: '20vh'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        fontWeight: '600',
        color: 'white',
    }),
    clearIndicator: () => ({
        fontWeight: '600',
        color: 'white'
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '14px',
        color: 'white',
        fontWeight: '600',
    }),
    valueContainer: (base) => ({
        ...base,
        color: 'white',
        fontWeight: '600',
        opacity: '0.8',
        width: 'calc(100% - 40px)',
    }),
    singleValue: (base, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        return {
            ...base,
            opacity,
            transition: 'opacity 300ms',
            color: 'white',
            fontWeight: '400',
            fontSize: '14px'
        };
    }
}

export default class Primary_eventsSelect extends Component {
    handleChange = (newValue) => {
        if (newValue && newValue.value) {
            this.props.onChange(newValue.value);
        }
    };

    render() {
        return (
            <Select
                styles={customStyles}
                isClearable
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}
