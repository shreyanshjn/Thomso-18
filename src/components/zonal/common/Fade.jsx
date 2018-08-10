import Transition from 'react-transition-group/Transition';
import React, { Component } from 'react';

const duration = 400;

const defaultStyle = {
    transition: `opacity ${duration}ms `,
    opacity: 0,
    height:80,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 1 },
    exited:   {opacity :0},
};
const Fade = ({in: inProp, children }) => (
    <Transition in={inProp} timeout={{
     enter:700,
     exit:400,
    }}>
        {(state) => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
            {children}
        </div>
        )}
    </Transition>
);

export default Fade;
