const dataUrlToFile = (url, fileName) => {
    const [mediaType, data] = url.split(",");
  
    const mime = mediaType.match(/:(.*?);/)?.[0];
  
    var n = data.length;
  
    const arr = new Uint8Array(n);
  
    while (n--) {
      arr[n] = data.charCodeAt(n);
    }
    console.log("FileName And  type:",fileName,mime);
    return new File([arr], fileName, { type: mime });
  };
  
  const dataUrlToFileUsingFetch = async (
    url,
    fileName,
    mimeType
  ) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    console.log("FileName & type:",fileName,mimeType);  
    return new File([buffer], fileName, { type: mimeType });
  };
  
  export { dataUrlToFile, dataUrlToFileUsingFetch };