import React from "react";
import styles from "./ytEmbed.module.css";

const YtEmbed = ({videoId, ...props}) => {
    return (
        <iframe
            className={styles.ytEmbed}
            width="1920" height="1080"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            {...props}
        />
    )
}

export default YtEmbed;
