// const url = "http://172.16.1.53:3044/api/v1";
const url = "https://nodepune-investment.mobiloitte.io/api/v1"
// const url = "http://172.16.6.114:3044/api/v1";

export const socketNotification = "";
export const baseUrl = "";
const user = `${url}/user`;
const admin = `${url}/admin`;
const propertyUser = `${url}/propertyUser`;
const cashWallet = `${url}/wallet`;

export const api_configs = {
  //admin
  login: `${admin}/login`,
  forgotPassword: `${admin}/password/forget`,
  verifyOTP: `${admin}/otp/verify`,
  resetPassword: `${admin}/password/reset`,
  getExitedPropertiesWeb: `${url}/propertyUser/getExitedPropertiesWeb`,
  getBlogDataWeb: `${url}/blog/getBlogDataWeb`,
  //user
  signup: `${user}/signup`,
  verifyEmailForSignup: `${user}/verifyEmailForSignup`,
  resendOtp: `${user}/resendOtp`,

  //Upload-file -image url
  uploadFile: `${admin}/uploadFile`,

  //Feedback
  addFeedback: `${url}/feedback/addFeedback`,

  //property
  getAllTheProperties: `${propertyUser}/getAllTheProperties`,
  getFundedProperties: `${propertyUser}/getFundedProperties`,
  getExitedProperties: `${propertyUser}/getExitedProperties`,
  getCounts: `${propertyUser}/getCounts`,
  setPassword: `${user}/setPassword`,
  addMobileNumber: `${user}/addMobileNumber`,
  verifyMobileNumber: `${user}/verifyMobileNumber`,
  forgotPassword: `${user}/forgotPassword`,
  login: `${user}/login`,
  socialLogin: `${user}/socialLogin`,
  resetPassword: `${user}/resetPassword`,
  getWaletDetails: `${user}/getWaletDetails`,
  listUsersTransactions: `${user}/listUsersTransactions`,
  addCard: `${user}/addCard`,
  addBank: `${user}/addBank`,
  viewBankDetails: `${user}/viewBankDetails`,
  viewCardDetails: `${user}/viewCardDetails`,
  updateBankDetails: `${user}/updateBankDetails`,
  updateCardDetails: `${user}/updateCardDetails`,
  events: `${cashWallet}/events`,
  initiate: `${user}/initiate`,
  withdrawalMoney: `${user}/withdrawalMoney`,
  getFinacialDetailsUser: `${propertyUser}/getFinacialDetailsUser`,
  addToBookmark: `${propertyUser}/addToBookmark`,
  removeBookmark: `${propertyUser}/removeBookmark`,
  addToCart: `${propertyUser}/addToCart`,
  getCartDetails: `${propertyUser}/getCartDetails`,
  removeCartData: `${propertyUser}/removeCartData`,
  addInvestment: `${propertyUser}/addInvestment`,
  getPortFolioOfUser: `${propertyUser}/getPortFolioOfUser`,
  getUserFullInvestmentDetails: `${propertyUser}/getUserFullInvestmentDetails`,
  viewAccountInfo: `${user}/viewAccountInfo`,
  deleteAccount: `${user}/deleteAccount`,
  listBlog: `${url}/blog/listBlog`,
  getOneAvailableProperty: `${propertyUser}/getOneAvailableProperty`,
  getOneFundedProperty: `${propertyUser}/getOneFundedProperty`,
  getExitedPropertyById: `${propertyUser}/getExitedPropertyById`,
  glossaryContentList: `${url}/glossary/glossaryContentList`,
  getLinks: `${url}/welcome/getLinks`,
  getTotalReward: `${user}/getTotalReward`,
  addSupport: `${url}/support/addSupport`,
  removeCardDetails: `${user}/removeCardDetails`,
  deleteBankDetails: `${user}/deleteBankDetails`,
  getBookmark: `${propertyUser}/getBookmark`,
  addKYCDetails: `${url}/kyc/addKYCDetails`,
  getKycDetail: `${url}/kyc/getKycDetail`,
  generateWebSdkToken: `${url}/kyc/generateWebSdkToken`,
  viewStaticContent: `${url}/static/viewStaticContent`,
  getFundSettings: `${admin}/getFundSettings`,
};
