// src/constants/endpoints.ts

const BASE_URL = "http://127.0.0.1:8000"; // 👈 badilika kirahisi ukihost

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/lms/login/`,
  SIGNUP: `${BASE_URL}/lms/signup/`,
  SUPERADMIN_SIGNUP: `${BASE_URL}/lms/create-superadmin/`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password/`,
  TENANT_LOGIN: `${BASE_URL}/tenant/login/`,
  registerInstitution: `${BASE_URL}/lms/register-institution/`,
  getClientInstitution: `${BASE_URL}/lms/client/institution/`,
  deleteInstitution:  `${BASE_URL}/lms/delete/institution/`,
  updateInstitution: `${BASE_URL}/lms/update/institution/`,


};