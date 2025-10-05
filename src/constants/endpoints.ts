// src/constants/endpoints.ts

const BASE_URL = `http://${window.location.hostname}:8000`;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/tenant/client/login/`,
  SIGNUP: `${BASE_URL}/tenant/signup/`,
  SUPERADMIN_SIGNUP: `${BASE_URL}/tenant/create-superadmin/`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password/`,
  TENANT_LOGIN: `${BASE_URL}/tenant/login/`,
  registerInstitution: `${BASE_URL}/public/register-institution/`,
  getClientInstitution: `${BASE_URL}/tenant/client/institution/`,
  deleteInstitution: `${BASE_URL}/tenant/delete/institution/`,
  updateInstitution: `${BASE_URL}/tenant/update/institution/`,
  TENANT_PROFILE: `${BASE_URL}/tenant/institution-info/`,
};