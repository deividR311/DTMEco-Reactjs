import { useEffect, useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Tooltip } from "@material-ui/core";


const colorList = {
    yellow: "#f6fa00",
    green: "#0c8a12",
    red: "#cc251d",
    gray:  "#c4c4c4"
};

export const StateColor = ({
    stateColor = ''
}) => {
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(()=>{
        setSelectedValue(stateColor)
    }, [stateColor]);


    return (  
        <div>
            <Tooltip title={"sin completar"}>
                <CircleIcon fontSize="small"
                    sx={{
                        color: selectedValue=== "red" ? colorList.red : colorList.gray,
                        '&.Mui-checked': {
                        color: stateColor=== "red" ? colorList.red : colorList.gray,
                        },
                    }}/>
            </Tooltip>
            <Tooltip title={"en proceso"}>
                <CircleIcon fontSize="small"  sx={{
                color: selectedValue === "yellow" ? colorList.yellow : colorList.gray,
                '&.Mui-checked': {
                    color: selectedValue === "yellow" ? colorList.yellow : colorList.gray,
                },
                }}/>
            </Tooltip>
            <Tooltip title={"completado"}>
                <CircleIcon fontSize="small"
                sx={{
                color: selectedValue=== "green" ? colorList.green : colorList.gray,
                '&.Mui-checked': {
                    color: selectedValue=== "green" ? colorList.green : colorList.gray,
                    },
                }}
            /> 
            </Tooltip>
        </div>
    );
}