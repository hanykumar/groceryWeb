import React from "react";

interface props {
    title: String,
    description: String,
    closeSnackBar: () => void
}
const Snackbar: React.FC<props> = ({ title, description, closeSnackBar }) => {
    return (
        <div className="w-100 h-100 ">
            <div className="absolute top-10 right-10 bg-gray-600 rounded">
                <div>
                    {title}
                </div>
                <div>
                    {description}
                </div>
                <button className="p-3 bg-green-300" onClick={closeSnackBar}>Close</button>
            </div>
        </div>
    )
}
export default Snackbar;