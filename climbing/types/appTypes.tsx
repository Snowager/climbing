import React from 'react';

export declare interface AppProps {
    children?: React.ReactNode; // best, accepts everything React can render
    childrenElement?: React.JSX.Element; // A single React element
    style?: React.CSSProperties; // to pass through style props
    onChange?: React.FormEventHandler<HTMLInputElement>;
}