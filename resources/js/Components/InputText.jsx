import React from "react";
import { TextField } from "@mui/material";
export default function InputText({ label, error, labelClass, ...props }) {
    return (
        <div>
            <p
                className={`text-xs my-1 ${
                    labelClass ? labelClass : "text-black"
                }}`}
            >
                {label}
            </p>
            <TextField
                className="w-full "
                {...props}
                // label={label}
                variant="filled"
                error={error ? true : false}
                helperText={error}
            />
        </div>
    );
}
