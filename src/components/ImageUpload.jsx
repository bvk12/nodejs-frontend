import  { useState, useRef, useEffect } from "react";

export const ImageUpload = (props) => {

    const [images,setImages] = useState([]);
    const [loading,setLoading] = useState(true);
    const [uploading,setUploading] = useState(false);
    

      /**
       * Step1. select local image
       *
       */
      function selectLocalImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
  
        // Listen upload local image and save to server
        input.onchange = () => {
          const file = input.files[0];
  
          // file type is only image.
          if (/^image\//.test(file.type)) {
            saveToServer(file);
          } else {
            console.warn('You could only upload images.');
          }
        };
      }

     /**
     * Step2. save to server
     *
     * @param {File} file
     */
     function saveToServer(file) {
        const fd = new FormData();
        fd.append('image', file);
  
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/upload/image', true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            // this is callback data: url
            const url = JSON.parse(xhr.responseText).data;
            insertToEditor(url);
          }
        };
        xhr.send(fd);
      }


       /**
     * Step3. insert image url to rich editor.
     *
     * @param {string} url
     */
    function insertToEditor(url) {
        // push image url to rich editor.
       // const range = editor.getSelection();
       // editor.insertEmbed(range.index, 'image', `http://localhost:9000${url}`);
      }
  
      // quill editor add image handler
      //editor.getModule('toolbar').addHandler('image', () => {
      //  selectLocalImage();
     // });
    

    const filter = id => {
        return images.filter(image => image.public_id !== id)
      }
    
      const removeImage = id => {
        setImages(...this.filter(id) )
      }
    
     const onError = id => {
        //this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
        setImages(...this.filter(id))
      }

    const  onChange = e => {
        console.log("Changed the  file data...",e)
        const errs = [] 
        const files = Array.from(e.target.files)
    
        if (files.length > 3) {
          const msg = 'Only 3 images can be uploaded at a time'
         // return this.toast(msg, 'custom', 2000, toastColor)  
        }
    
        const formData = new FormData()
        const types = ['image/png', 'image/jpeg', 'image/jpg']
    
        files.forEach((file, i) => {
    
          if (types.every(type => file.type !== type)) {
            errs.push(`'${file.type}' is not a supported format`)
          }
    
          if (file.size > 150000) {
            errs.push(`'${file.name}' is too large, please pick a smaller file`)
          }
    
          formData.append(i, file);


          setUploading( true );
          console.log("Images,errs",images,errs,file,formData.get(0))

        });
    }


  return (
    <div className="buttons fadein">
      <div className="button">
        <label htmlFor="single">
          <ion-icon name="image" size="medium"></ion-icon>          
        </label>
        &nbsp;
        <input type="file" id="single" onChange={onChange} />
      </div>
      {/*     
    <div className='button'>
      <label htmlFor='multi'>
      <ion-icon name="images-outline" color='#6d84b4' size='10x'></ion-icon>   
      </label>
      <input type='file' id='multi' onChange={props.onChange} multiple />
    </div> */}
    </div>
  )
}

