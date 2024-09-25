import React from "react";

export default function PreviewVideo({video}) {

    return (
        <video className="preview-vid" src={video} autoPlay="true" loop/>
    )
}