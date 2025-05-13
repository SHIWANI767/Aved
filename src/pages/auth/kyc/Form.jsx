import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Button, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { apiRouterCall } from "@/api-services/service";
import { api_configs } from "@/api-services";
import { useRouter } from "next/router";
import { verifyKYC } from "@/store/slices/userSlice";

const MainComponent = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "40px 20px",
});

const InfoBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#d8e5f7b0",
    color: "#5368a1",
    maxWidth: "600px",
    marginTop: "20px",
    padding: "12px 16px",
    borderRadius: "8px",
});

export default function Form() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const paymentWindowRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const previousRoute = sessionStorage.getItem("employmentForm")
    console.log(previousRoute);
    
    useEffect(() => {
        if(previousRoute !== "/auth/employment-details"){
            router.push('/auth/employment-details')
        }
    },[]);

    useEffect(() => {
        const eventSource = new EventSource(api_configs["events"]);

        eventSource.onmessage = async(event) => {
            const eventData = JSON.parse(event.data);
            console.log(eventData);
            
            if (eventData.type === "KYC_SUCCESS") {
                toast.success(
                    eventData.message
                );
                dispatch(verifyKYC());
                
                 setTimeout(() => {
                    if (paymentWindowRef.current) {
                        paymentWindowRef.current.close();
                        router.push("/dashboard/properties");
                        sessionStorage.removeItem("employmentForm")
                    }
                }, 3000);
             
                
            }
            else if(eventData.type === "KYC_FAILED"){
                toast.error(
                    eventData.message
                )
            }
            else{
                toast.error(
                    eventData.message
                )
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const createSdkToken = async () => {
        try {
            setLoading(true)
            const response = await apiRouterCall({
                method: 'POST',
                endPoint: "generateWebSdkToken",
                token: user?.userInfo?.token,
                bodyData: {
                    userId: user?.userInfo?._id
                }
            })
            if (response?.data?.responseCode === 200) {
                toast.success(response?.data?.responseMessage)
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const popupWidth = 600;
                const popupHeight = 700;
      
                // Calculate center position
                const left = (screenWidth - popupWidth) / 2;
                const top = (screenHeight - popupHeight) / 2;
                paymentWindowRef.current = window.open(
                    response?.data?.result?.url,
                    "PaymentWindow",
                    `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
                );
            } else {
                toast.error(response?.data?.responseMessage);
                console.log("This is my error in the else section", response?.data)
            }
        } catch (error) {
            console.log("This is my error in the catch section", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainComponent>
            <Typography variant="h3" color="primary">
                Ready to invest and access our reports?
            </Typography>
            <Typography
                variant="body3"
                color="secondary"
                sx={{ maxWidth: "600px", marginTop: "12px" }}
            >
                Please have your Passport ready. You can either upload a coloured copy or use your phone to
                take a picture of your Passport data page. You will be asked to take a selfie in the next step.
            </Typography>

            <InfoBox>
                <InfoIcon style={{ marginBottom: '20px' }} />
                <Typography variant="body4" color='secondary'>
                    Only your Passport is allowed. Any alternative documents, such as your National ID, Residence Permit, will be rejected.
                </Typography>
            </InfoBox>

            <Box mt={4} display="flex" justifyContent="center" width="100%">
                <Button variant="contained" type="submit" disable={loading} sx={{ width: "100%", maxWidth: "250px" }} onClick={() => createSdkToken()}>
                    {loading ? "Loading..." : "Upload"}
                </Button>
            </Box>
        </MainComponent>
    );
}
