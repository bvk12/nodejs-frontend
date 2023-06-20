import { useState } from 'react'
import { MediaAPI } from '../services/apis/MediaApiClient';
import useToast from "../hooks/useToast";
import {
      ToastVariants,
  } from "../utils/constants";

export default function ImageUploadViewer(props) {
    //imageName and its
    const { name, setValue } = props;
    const [imageUrl, setImageUrl] = useState(props.value);
    const [image, setImage] = useState("");
    console.log("Default image value:,name", imageUrl, props.name)
    const [id]= useState("fileInput"+Date.now())
     const { showToast } = useToast();
    const fileChangedHandler = event => {
        console.log("FILE CHANGEDDDDDDDd")
        let file = event.target.files[0];
        //let reader = new FileReader();    
        console.log("File upload", "->", file.type, "<-");
        //reader.onload = function(e) {
        // setFile(e.target.result);
        // };
        //reader.readAsDataURL(event.target.files[0]);     
        if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/x-icon" && file.type !=='image/svg+xml') {
            window.alert("File does not support. You must use .png or .jpg or .svg ");
            return false;
        }
        if (file.size > 5e6) {
            window.alert("Please upload a file smaller than 5 MB");
            return false;
        }
        setImage(file);
        console.log(URL.createObjectURL(file))
        setImageUrl(URL.createObjectURL(file));
    };

    
    //console.log("Image:", image);

    const saveImage = () => {
        console.log("uploading image.")
        const formData = new FormData();
        //formData.append('img', title);
        formData.append('img', image)
        console.log("FormData", formData)
        MediaAPI.uploadImage(formData)
            .then((res) => {
                console.log("Successful", res.data);
                setImageUrl(res.data.data.url);
                setValue(name, res.data.data.url);
                showToast(
                    "Image Uploaded Successfully. ",
                    ToastVariants.success
                  );

            }).catch((err) => {
                console.error("Error:", err)
                showToast(
                    "Image Upload failed. ",
                    ToastVariants.error
                  );
            });
        return false;
    }

    return (
        <>
            <div className='image-card'>
            <label for={id}>
                <img src={imageUrl} alt={""} style={{ width: '100%', objectFit:"scale-down" }} height="150" text-align="left" />
                {/*<input onChange={(e)=> {  setImage (e.target.files[0]) }} type="file" /> */}
                </label>
                <input value={imageUrl} className="m-1" disabled style={{ width: '100%', display: '' }} placeholder='Current Image URL'></input> <br />
                <input className="btn btn-secondary "
                    id={id}
                    name="file" type="file"
                    title="tt "
                    inputProps={{ accept: 'image/*' }}
                    onChange={fileChangedHandler}
                    style={{display:'none'}}
                />
                <button type='button' className="btn btn-primary m-3" onClick={saveImage}> Update Image </button>
            </div>
        </>
    )

}