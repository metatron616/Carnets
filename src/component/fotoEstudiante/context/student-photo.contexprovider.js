import { useState } from "react";
import { StudentPhotoContext } from "./student-photo.context";
const StudentPhotoContextProvider = ({children}) => {
    const [showChangeImageModal, setShowChangeImageModal] = useState(false);
    const [image, setImage] = useState(null);
    const [imageThumbnail, setImageThumbnail] = useState(null);

    return (
        <StudentPhotoContext.Provider  
            value={{
                showChangeImageModal, setShowChangeImageModal, 
                image,setImage,
                imageThumbnail, setImageThumbnail
            }} 
        >
            {children}
        </StudentPhotoContext.Provider>
    );
};

export default StudentPhotoContextProvider;