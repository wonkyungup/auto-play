import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
        {...props}
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const ToggleSwitch = (props: { state: any; onChange: (arg0: boolean) => void; }) => {
    return (
        <FormGroup>
            <FormControl>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>off</Typography>
                    <IOSSwitch
                        sx={{ m: 1}}
                        checked={!!props.state}
                        onChange={event => {
                                props.onChange(event.target.checked)
                                chrome.tabs.query(
                                    {
                                        active: true,
                                        currentWindow: true
                                    },(tabs: any) => {
                                        chrome.tabs.sendMessage(tabs[tabs.length - 1].id, 'videoReady');
                                    });
                            }
                        }
                    />
                    <Typography sx={{ fontSize: 13, fontWeight: 'bold' }}>on</Typography>
                </Stack>
            </FormControl>
        </FormGroup>
    );
}

export default ToggleSwitch;
