const loadGoogleSignIn = (callback) => {
    //const existingScript = document.getElementById('googleMaps');
    //if (!existingScript) {
      console.log("################# Window ###############",window?.document)    
      const script = window.document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'googleSignin';
      script.async = true;
      
      window.document.body.appendChild(script);
      script.onload = () => { 
        console.log("################# Window.google ###############",window?.google)
        if (callback) callback();
      };

      script.onerror = function(e) {
        console.log("Error loading script....###########",JSON.stringify(e, ["message", "arguments", "type", "name"]))
       };
    //}
    //if (existingScript && callback) callback();
  };
  export default loadGoogleSignIn;