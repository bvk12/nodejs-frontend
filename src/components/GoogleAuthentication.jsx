// import { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";
// import loadGoogleSignIn from "./GoogleSignIn";

// // const CLIENT_ID =
// //   "637042349641-resl2k9ikgp2jkg1llqibltac1dtkg91.apps.googleusercontent.com";

// export const GoogleAuthentication = () => {
//   // const [isSignedIn, setIsSignedIn] = useState(false);
//   // const [user, setUser] = useState({});

// //  function loadedScriptSignin(e){
// //   console.log("Loaded.....",e,window.google);
// //   /* global google */
// //   google.accounts.id.initialize({
// //     client_id:
// //       "637042349641-resl2k9ikgp2jkg1llqibltac1dtkg91.apps.googleusercontent.com",
// //     callback: handleCallbackResponse,
// //   });
  
 
// //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
// //     theme: "outline",
// //     size: "large",
// //   });
// //  }

// //   function handleCallbackResponse(response) {
// //     console.log("Encoded jwt id token" + response.credential);
// //     var userObject = jwt_decode(response.credential);
// //     console.log(userObject);
// //     setUser(userObject);
// //     setIsSignedIn(true);
// //   }

// //   useEffect(() => {
// //     loadGoogleSignIn(loadedScriptSignin);    
// //   }, [loadedScriptSignin]);

  
// //   return (
// //     <>
// //       {isSignedIn ? (
// //         <>
// //           <p>Welcome to visualpath tech.</p>
// //           {user && (
// //             <div className="row">
// //             <div className="col-sm-4">.</div>
// //               <div className="col-sm-4">
// //                 <img src={user.picture} alt="user-avatar"></img>
// //                 <h6>{user.name}</h6>
// //               </div>
// //               <div className="col-sm-4">.</div>
// //             </div>
// //           )}
// //           <a id="logoutframe" href="https://accounts.google.com/logout">
// //             Logout
// //           </a>
// //         </>
// //       ) : (
// //         <>
// //           <div id="signInDiv"></div>
// //         </>
// //       )}
// //     </>
// //   );
// };
