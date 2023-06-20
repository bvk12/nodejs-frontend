import React, { useState } from "react";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { MediaAPI } from "../../../services/apis/MediaApiClient";
import { IonContent, IonPage } from "@ionic/react";


const CustomNamedUploadImage = (props) => {
    const [imgSrc, setImgSrc] = useState(props.imgSrc || "");
    const [imageName, setImageName] = useState(props.imageName || "");
    const [imageType, setImageType] = useState(props.imageType || "jpg")
    const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif'];

    const handleImageChange = async (event) => {
        console.log("imgSrc",imgSrc)
        if (imgSrc) {
            console.log("Deleteing image....",imgSrc)
            try {
                await MediaAPI.deleteImage({url:imgSrc});

                console.info(
                    "ImageInput: Image Successfully Deleted, ImgSrc: ",
                    imgSrc
                );
            } catch (error) {
                console.error("ImageInput: Image Failed to Delete, ImgSrc: ", imgSrc);
            }
        }

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("img", file);
        formData.append("imageName", imageName);
        formData.append("imageType", imageType);

        for (var pair of formData.entries()) {
            console.log( pair[0] + ' - ' + pair[1] );
        }

        try {
            const { data: response } = await MediaAPI.uploadNamedImage(formData,imageName,imageType);
            setImgSrc("");
            setImgSrc(response.data.url);

            console.info(
                "ImageInput: Image Successfully Uploaded, ImgSrc: ",
                response.data.url
            );

            //props.onChange(response.data.url);
        } catch (error) {
            console.error("ImageInput: Image Failed to Upload, error: ", error);
        }
    };


    const handleNameInput = (e) => {
        setImageName(e.target.value);
    };

    const handleTypeSelect = (e) => {
        setImageType(e.target.value);
    };
   console.log("Inside.....")
    return (
         <IonPage>
        <IonContent>
          <Container fluid className="pt-4 course-container">          
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <label>Image Name:</label>
                    <input type="text" value={imageName} onChange={handleNameInput} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>File Type:</label>
                    <select value={imageType} onChange={handleTypeSelect}>
                        {allowedFileTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <Image
                        src={imgSrc || props.placeholder}
                        alt="Preview"
                        rounded
                        style={{
                            maxWidth: '100%',
                            objectFit: "scale-down"
                        }}
                    />
                </Col>
                <Col xs={12} className="d-flex justify-content-center">
                    <label htmlFor="file-input" className="btn">
                        <i className="fa fa-camera" />&nbsp; {props.label}
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: "none" }}
                        title="test"
                    />
                </Col>
            </Row>
            </Container>
            </IonContent>
            </IonPage>
        
    );
};

export default CustomNamedUploadImage;
