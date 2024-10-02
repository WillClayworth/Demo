import { useRef, useEffect, useState } from "react";
import MediaDevicesDropdown from './components/MediaDevicesDropdown';

function App() {

    const [selectedDeviceId, setSelectedDeviceId] = useState("");

    return (
            <div className="App">
                <MediaDevicesDropdown
                    selectedDeviceId={selectedDeviceId}
                    setSelectedDeviceId={setSelectedDeviceId}
                    disabled={false}
                />
                <Camera />
                <CameraStatus />
            </div>
    )
}

export default App

const Camera = () => {
    const videoRef = useRef<any>(null);

    useEffect(() => {
        const getVideo = async () => {
            try
            {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true});
                videoRef.current.srcObject = stream;
                
            }
            catch(err : unknown)
            {
                console.error("Error accessing the camera: ", err);
            }
        };

        getVideo();
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay />
        </div>
    );
}

const CameraStatus = () => {
    const [cameraInUse, setCameraInUse] = useState(false);

    useEffect(() => {
        const checkCamera = async () => {
            try
            {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true})
                stream.getTracks().forEach(track => track.stop());
                setCameraInUse(false);
            }
            catch(err : any)
            {
                if(err === null || err === undefined){
                    console.error("Unknown error occured, err is null or undefined")
                }
                else if(err.name === "NotAllowedError" || err.name === "NotFoundError")
                {
                    setCameraInUse(false);
                }
                else if(err.name === "NotReadableError")
                {
                    setCameraInUse(true);
                }
                else
                {
                    console.error("Error checking camera status: ", err);
                }
            }
        };

        checkCamera();
    }, []);
    return (
        <div>
            {cameraInUse ? (
                <p>The Camera is currently in use by another application.</p>
            ) : (
                <p>The Camera is available.</p>
            )}
        </div>
    );
}
