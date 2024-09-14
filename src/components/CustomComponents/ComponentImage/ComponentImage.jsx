import * as React from "react";

const ComponentImage = (props) => {
    return (
    <div>
        <img src = {props.source} width={props.width} height={props.height}/>
    </div>
    )
}

export default ComponentImage;