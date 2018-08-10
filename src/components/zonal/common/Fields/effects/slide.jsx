import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 400

const Slide = ({
    in: inProp,
    defaultstyle,
    slidestyle,
    children,
}) => (
        < Transition in={inProp} timeout={duration} >
            {
                state => (
                    <div
                        style={{
                            ...defaultstyle,
                            ...slidestyle[state],
                        }}
                    >
                        {children}
                    </div>
                )
            }
        </Transition >
    );

export default Slide;
