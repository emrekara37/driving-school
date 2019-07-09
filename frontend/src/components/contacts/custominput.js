import {Input} from "antd";
import React ,{forwardRef}from "react";
import ReactInputMask from 'react-input-mask';

const CustomInput = forwardRef((props,ref) => {
    return (
        <ReactInputMask {...props} disabled={false}>
            {(inputProps) => <Input  {...inputProps} ref={ref} /> }
        </ReactInputMask>
    );
});

export default CustomInput;