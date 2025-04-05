import React from "react";
import FlowChart from "./FlowChart"
import "../App.css";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
    // this is the navigation imported from react-router-dom to navigate between routes 
    const navigate = useNavigate();
    // this is the logout button for logout the user and redirect to auth page 
    const handleLogout = () => {
        navigate("/auth");
        localStorage.removeItem("token");

    }




    return (
        <>
            {/* this is Homepage for showing Website Heading and logout button with responsive UI ON all devices   */}

            <div className="h-dvh w-dvw text-[#153448]">
                <div className="w-[350px] md:w-[650px] h-[600px] mx-auto pt-4">

                    {/* Heading and Logout Button aligned horizontally */}
                    <div className="flex justify-between items-center mb-4 px-4">
                        <h1 className="text-xl md:text-3xl font-bold">
                            Automated Email Sequencer
                        </h1>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                    {/* And down there is component for flowchart and email sequencer   */}
                    <FlowChart />
                </div>
            </div>

        </>
    )
}


export default Homepage;