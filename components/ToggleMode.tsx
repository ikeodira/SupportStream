// "use client";
// import { useState, useEffect, use } from "react";
// import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { Button } from "./ui/button";

// function ToggleMode() {

//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     if (!mounted) {
//         <Button variant="outline" size="icon" disabled={true}></Button>
//     }

//     const dark = theme === "dark";


//     return (
//         <Button variant="outline" size="icon" onClick={() => setTheme(`${dark ? "light" : "dark"}`)}>
//             {dark ?
//                 (<SunIcon className="hover:cursor-pointer hover:text-primary" />) :
//                 (<MoonIcon className="hover:cursor-pointer hover:text-primary" />)}
//         </Button>
//     )
// }

// export default ToggleMode

import React from 'react'

function ToggleMode() {
    return (
        <div>ToggleMode</div>
    )
}

export default ToggleMode