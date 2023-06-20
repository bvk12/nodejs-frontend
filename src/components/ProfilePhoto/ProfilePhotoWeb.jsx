import React, { useContext, useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./profilephotoweb.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { dataUrlToFileUsingFetch } from "./imageUtils";
import "./profilephotoweb.css";
import Alert from "react-bootstrap/Alert";
import { MediaAPI } from "../../services/apis/MediaApiClient";
import { AccountAPI } from "../../services/apis/AccountAPI";
import useToast from "../../hooks/useToast";
import { INPUT_VALIDATION_STATES, ToastVariants } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContextProvider";

export const ProfilePhotoWeb = ({
  showIt,
  setEditProfilePic,
  profileImage,
}) => {
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileExt, setFileExt] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleClose = () => {
    setEditProfilePic(false);
    setImage("");
    console.log("handle close....");
  };

  const setImageUrl = async (url) => {
    console.log("user.profileImage EXISTING", user.profileImage);
    console.log("user.profileImage GOING to be:", url);
    await setUser({ ...user, profileImage: url });
    console.log("user.profileImage AFTER SET", user.profileImage);
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setFileName(files[0].name);
      console.log("File read is ", files[0]);
      var fileExtension = files[0].name.split(".").pop();
      if (fileExtension) {
        console.log(fileExtension);
        setFileExt(fileExtension);
      }
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    let cropData = "";
    if (image) {
      if (typeof cropper !== "undefined") {
        // console.log("Croped image url", cropper.getCroppedCanvas().toDataURL());
        cropData = cropper.getCroppedCanvas().toDataURL();
        setCropData(cropData);

        return cropData;
      }
    } else {
      // alert("Please select Image");
      setShowAlert(true);
    }
  };

  const handleUpload = async () => {
    /**
     * You can also use this async method in place of dataUrlToFile(url) method.
     * const file = await dataUrlToFileUsingFetch(url, 'output.png', 'image/png')
     */
    //const file = dataUrlToFile(url, "output.png",'image/png');

    const cropData = getCropData();
    var file = await dataUrlToFileUsingFetch(
      cropData,
      "output",
      "image/" + fileExt
    );
    console.log("Uploading file::::", file);
    saveImage(file);
    // AccountAPI.updateProfileImage(file,user.userId);
  };

  const saveImage = async (imageFile) => {
    var formData = new FormData();
    console.log("Image file,userID", imageFile, user.userId);
    formData.append("userId", user.userId);
    formData.append("avatar", imageFile, "output." + fileExt);
    //   var profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ41qK5T-QszJIK6Wm1g_bfPe49GrokVLGb0oUaWitKw&s"   ;
    //   await setImageUrl(profileImage)
    //  //setImageUrl("https://fs369-image.s3.ap-south-1.amazonaws.com/uploads/768063a2-3114-43ae-b1a1-511cc11aa42b_output.png");
    //   console.log("Successful upload: NEW PROFILE IMAGE-->", profileImage.substring(user.profileImage.length-20,
    //   profileImage.length-1));

    await AccountAPI.updateProfileImage(formData)
      .then(async (res) => {
        var profileImage = res.data.profile.profileImage;
        console.log(
          "Successful upload: NEW PROFILE IMAGE-->",
          profileImage.substring(
            user.profileImage.length - 20,
            profileImage.length
          )
        );
        await setImageUrl(res.data.profile.profileImage);
        setEditProfilePic(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        showToast(
          "Image upload failed, Please try again ",
          ToastVariants.error
        );
        setEditProfilePic(false);
      });
    return false;
  };

  return (
    <Modal
      show={showIt}
      onHide={handleClose}
      style={{ height: "94vh" }}
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile Image</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              padding: "3%",
              border: "thin solid black",
            }}
          >
            <label
              for="profileInput"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <b>Select Image</b>
              <input
                type="file"
                id="profileInput"
                className="profileInput"
                onChange={onChange}
                accept="image/png, image/jpg, image/jpeg"
              />
              <i className="fa fa-2x fa-upload" aria-hidden="true"></i>
            </label>
            {showAlert && (
              <Alert
                variant="danger"
                style={{ marginTop: "10px" }}
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Please select an image before cropping.</p>
              </Alert>
            )}
          </div>
          <div id="liveAlertPlaceholder"></div>
          <Cropper
            style={{ height: "25vh", width: "100%" }}
            zoomTo={0.1}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={false}
          />
        </div>
        <div>
          <div className="box">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                padding: "3%",
                border: "thin solid black",
              }}
            >
              <b>Preview</b>
              <div
                className="img-preview"
                style={{ width: "300px", borderRadius: "50%", height: "300px" }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {cropData && (
          <>
            {/*<Button style={{ float: "right" }} onClick={getCropData}>
            Crop Image
          </Button>*/}
            <Button style={{ float: "right" }} onClick={() => handleUpload()}>
              Upload
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProfilePhotoWeb;
