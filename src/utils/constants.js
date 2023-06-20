export const routes = {
  login: "/login",
  signup: "/signup",
  applelogin: "/apple",
  resetPassword: "/resetPassword",
  account: "/account",
  userCourses: "/account/courses",
  userSubscriptions: "/account/subscriptions",
  profileSettings: "/account/profile-settings",
  loginSettings: "/account/login-settings",
  admin: "/admin",
  adminDashboard: "/admin/dasboard",
  adminReports:"/admin/reports",
  adminSalesReport:"/admin/reports/salesReport",
  adminUserReport:"/admin/reports/userReport",
  adminSubscriptionReport:"/admin/reports/subscriptionReport",
  adminSettings: "/admin/settings",
  adminRoles: "/admin/roles",
  adminFeatures: "/admin/features",
  adminRoleFeatures: "/admin/role-features",
  manageUsers: "/admin/users",
  maangeOffers: "/admin/offers",
  manageCategories: "/admin/categories",
  manageTags: "/admin/tags",
  addCourse: "/admin/courses/add-course",
  editCourse: "/admin/courses/edit-course/:id",
  manageCourses: "/admin/courses",
  home: "/home",
  checkout: "/payment/checkout",
  successPay: "/payment/successPay",
  cancelPay: "/payment/cancelPay",
  courses: "/courses",
  coursePage: "/course/:courseId",
  favouritesPage: "/account/favorites",
  programs: "/programs",
  addProgram: "/admin/programs/add-program",
  editProgram: "/admin/programs/edit-program/:id",
  managePrograms: "/admin/programs",
  program: "/program/:programId",
  dynamicSiteInfo: "/siteinfo/:pageName",
  imgUploads:"/admin/img/uploads"
};

export const ACTIVE_FILTER_STATES = {
  active: "Active",
  inActive: "InActive",
  all: "All",
};

export const INPUT_VALIDATION_STATES = {
  input: "Input",
  verification: "Verification",
  validated: "Validated",
};

export const courseFormTypes = {
  addCourse: "Add Course",
  editCourse: "Edit Course",
};

export const routeToRoleFeaturesCodesMap = {
  [routes.adminFeatures]: "F4",
  [routes.adminRoles]: "F1",
  [routes.adminReports]: "R8",
  [routes.adminRoleFeatures]: "F3",
  [routes.manageUsers]: "R5",
  [routes.manageCourses]: "R7",
  [routes.managePrograms]: "R9",
  [routes.manageCategories]: "R10",
  [routes.manageTags]: "R11",
  [routes.maangeOffers]: "R12",
  [routes.adminSettings]: "R8",
  [routes.imgUploads]: "R8",
  [routes.admin]: "R13",
};

export const programFormTypes = {
  addCourse: "Add Program",
  editCourse: "Edit Program",
};

export const DialogTypes = {
  login: "login",
  signup: "signup",
  resetPassword: "resetPassword",
};

export const LocalStorageKeys = {
  loginAuthKey: "login.auth",
  loginUserKey: "login.user",
  userPermissionKeys: "user.permissions",
};

export const ReviewStatusStates = {
  active: "active",
  inActive: "inActive",
  pending: "pending",
};

export const MAX_TITLE_LENGTH = 50;
export const MAX_DESC_LENGTH = 100;

export const ToastVariants = {
  success: "success",
  info: "info",
  warning: "warn",
  error: "error",
};

export const RoleCodesMap = {
  Student: "R99",
  SuperAdmin: "R1",
};

export const SubscriptionTypes = {
  platform: "platform",
  course: "course",
  program: "program",
};

export const SubscriptionStatusTypes = {
  active: "ACTIVE",
  inActive: "INACTIVE",
};

export const InstanceTypes = {
  partner: "partner",
  platform: "platform",
  platformCourseProgram: "platformCourseProgram",
  courseProgram: "courseProgram",
};
