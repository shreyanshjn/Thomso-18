import React, { Component } from 'react';

import CreatableSelect from 'react-select/lib/Creatable';

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
        borderBottom: 'white 2px solid',
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
    noOptionsMessage: (base) => ({
        ...base,
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
    valueContainer: () => ({
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

export default class CreatableSingle extends Component {
    handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    }
    render() {
        return (
            <CreatableSelect
                styles={customStyles}
                isClearable
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                options={this.props.options}
            />
        );
    }
}
