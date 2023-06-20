const RESOURCE_URI = "/user/";
const ENDPOINTS = [];

const ApiMethods = [
  "checkUser",
  "sendEmailVerificationOTP",
  "sendMobileVerificationOTP",
  "register",
  "verifyMobile",
  "verifyEmail",
  "login",
];

function urlGenerator(a = RESOURCE_URI) {
  var fun = function fun2(b) {
    return a + b;
  };
  return fun;
}

function genCallerFunction(methodName) {
  var callerFunc =
    "function ${methodName}(requestBodyParams) { " +
    "var apiRequestBody = { " +
    "...requestBodyParams," +
    "};" +
    "console.log('sending ${methodName}.',apiRequestBody);" +
    "return axiosClient.post(" +
    methodName.toUpperCase() +
    "_URL, apiRequestBody)";
  return callerFunc;
}

function genUrlEndpoint(apiMethods) {
  var textParagraph = "";
  apiMethods.map((method) => {
    textParagraph = textParagraph.concat(
      "const " +
        method.toUpperCase() +
        "_URL = RESOURCE_NM +'" +
        method +
        "'; " +
        "/n"
    );
  });
  return textParagraph;
}

const isOfferActive = (offer) => {
  if (!offer.isActive) return false;

  if (offer.startDate && new Date(offer.startDate) > new Date()) {
    return false;
  }

  if (offer.endDate && new Date(offer.endDate) < new Date()) {
    return false;
  }

  return true;
};

// returns a random integer between 0 and max value (excluding maxValue)
const getRandomInt = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
};

const isCourseFree = (courseSpecialtyTags) => {
  if (!courseSpecialtyTags) return false;

  // 12 is the free tag.
  // see if we need to move this to constants file
  return courseSpecialtyTags.includes(12);
};

export { isOfferActive, getRandomInt, isCourseFree };
