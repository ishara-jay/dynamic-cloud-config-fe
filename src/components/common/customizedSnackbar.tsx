import { Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

export function CustomizedSnackbar (props: any) {

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    });

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            message={props.message}
            key={"top-right-snackbar"}
        />
    )
}