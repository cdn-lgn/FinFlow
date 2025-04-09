import { Box } from '@mui/material'
import React, { useState } from 'react'
import FaceDetector from './components/FaceDetector'


const Signup = () => {
    const [userFace,setUserFace] = useState(null)
    const [isImageCaptured, setIsImageCaptured] = useState(true);
  return (
    <>
    <div>Signup</div>
<Box>
    {!userFace && !isImageCaptured && <FaceDetector setUserFace={setUserFace} />}
    {userFace && <img src={userFace} alt="Captured" />}
</Box>
    </>

  )
}

export default Signup