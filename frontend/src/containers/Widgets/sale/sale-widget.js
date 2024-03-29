import React from 'react';
import {SaleWidgetWrapper} from './style';
const SaleWidget = (props) => {
    const {fontColor, label, price, details} = props;

    const textColor = {
        color: fontColor
    };
    return (<SaleWidgetWrapper className="isoSaleWidget">
        <h3 className="isoSaleLabel">{label}</h3>
        <span className="isoSalePrice" style={textColor}>
          {price}
        </span>
        <p className="isoSaleDetails">{details}</p>
    </SaleWidgetWrapper>);
};
export default SaleWidget;
