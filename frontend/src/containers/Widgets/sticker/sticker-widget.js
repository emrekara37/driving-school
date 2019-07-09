import React from 'react';
import {StickerWidgetWrapper} from './style';


const Sticker = (props) => {
    const {fontColor, bgColor, width, icon, number, text} = props;
    const textColor = {
        color: fontColor
    };
    const widgetStyle = {
        backgroundColor: bgColor,
        width: width
    };
    const iconStyle = {
        color: fontColor
    };
    return (<StickerWidgetWrapper className="isoStickerWidget" style={widgetStyle}>
        <div className="isoIconWrapper">
            <i className={icon} style={iconStyle}/>
        </div>

        <div className="isoContentWrapper">
            <h3 className="isoStatNumber" style={textColor}>
                {number}
            </h3>
            <span className="isoLabel" style={textColor}>
            {text}
          </span>
        </div>
    </StickerWidgetWrapper>);
};
export default Sticker;