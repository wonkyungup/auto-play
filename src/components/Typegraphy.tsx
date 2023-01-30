import * as React from "react";
import Typography from "@mui/material/Typography";

const AppTypographyTitle = () => {
    return (
        <Typography variant="h5" gutterBottom>
            Auto Play
        </Typography>
    )
}

const AppTypographyProducer = () => {
    return (
        <Typography
            sx={{ mb: 1.5, fontSize: 10 }}
            color="text.secondary"
            gutterBottom
        >
            wonko93@naver.com
        </Typography>
    )
}

const AppTypographyDescription = () => {
    return (
        <Typography
            variant="caption"
            display="block"
            gutterBottom
        >
            {"It is made to automatically skip videos like YouTube Shorts or TikTok."}
        </Typography>
    )
}

export {
    AppTypographyTitle,
    AppTypographyProducer,
    AppTypographyDescription
}

