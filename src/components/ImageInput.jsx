import React, { useState } from "react";
import axios from "axios";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { MediaAPI } from "../services/apis/MediaApiClient";

const ImageInput = (props) => {
  const [imgSrc, setImgSrc] = useState(props.imgSrc || "");

  const handleImageChange = async (event) => {
    if (imgSrc) {
      try {
        await MediaAPI.deleteImage({
          url: imgSrc,
        });

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

    try {
      const { data: response } = await MediaAPI.uploadImage(formData);
      setImgSrc(response.data.url);

      console.info(
        "ImageInput: Image Successfully Uploaded, ImgSrc: ",
        response.data.url
      );

      props.onChange(response.data.url);
    } catch (error) {
      console.error("ImageInput: Image Failed to Upload, error: ", error);
    }
  };

  return (    
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <Image
            src={imgSrc || props.placeholder}
            alt="Preview"
            rounded
            style={{
                 smaxWidth:'100%',
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
  );
};

export default ImageInput;
