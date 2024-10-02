import { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, Typography, InputLabel } from '@mui/material';
export interface MediaDevicesDropdownProps {
    selectedDeviceId: string,
    setSelectedDeviceId: React.Dispatch<React.SetStateAction<string>>,
    disabled: boolean
}

function MediaDevicesDropdown({
    selectedDeviceId,
    setSelectedDeviceId,
    disabled
}: MediaDevicesDropdownProps) {
    const [open, setOpen] = useState(false);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

    async function getCameraPermission() {
        // get current permission state of camera
        const status = await navigator.permissions.query({ name: "camera" });
        // if the user is still on the prompt stage, add event listener to wait for user to make a choice
        if (status.state === "prompt") {
            status.addEventListener("change", checkStatus);
        }
    }

    function checkStatus(this: PermissionStatus, event: Event) {
        event.preventDefault();
        if (this.state === "granted") {
            buildCameraList();
        }
    }

    const buildCameraList = () => {
        getCameraPermission();

        navigator.mediaDevices.enumerateDevices().then(devs => {
            handleDevices(devs);
        });

        // if we have a selected device, use it
        if (selectedDeviceId) {
            return;
        }
        setSelectedDeviceId(devices[0]?.deviceId);
    };

    const handleDevices = (devices: MediaDeviceInfo[]) => {
        navigator.mediaDevices.getUserMedia({ video: true });
        setDevices(devices.filter(({ kind, deviceId }) => kind === "videoinput" && deviceId !== ""));
    }

    navigator.mediaDevices.ondevicechange = () => {
        buildCameraList();
    };

    useEffect(() => {
        buildCameraList();
    }, [])

    const getDisplayString = (device: MediaDeviceInfo) => {
        if (open) {
            return device.label;
        } else {
            return (device.label.substring(0, 16) + '...');
        }
    };

    const devicesList = devices?.map((device: MediaDeviceInfo) => (
        <MenuItem key={device.deviceId} value={device.deviceId}>
            <Typography color="primary.main">{getDisplayString(device)}</Typography>
        </MenuItem>));

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="device-select-label">{"Devices"}</InputLabel>
            <Select
                id="device-select"
                disabled={disabled}
                value={selectedDeviceId ?? devices[0]?.deviceId ?? ""}
                label="Camera"
                onChange={(e: any) => setSelectedDeviceId(e.target.value.toString())}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                sx={{ bgcolor: "background.default", '.MuiOutlinedInput-notchedOutline': { border: 1 } }}
            >
                {devicesList}
            </Select>
        </FormControl>
    );
}

export default MediaDevicesDropdown;