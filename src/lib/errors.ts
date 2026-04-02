//Error messages map
const loginErrorMap: Record<string, string> = {
  'Invalid Email': 'الإيميل غير صحيح',
  'Invalid Password': 'كلمة المرور غير صحيحة',
};

//Login error messages handler
export const getLoginErrorMessage = (error: any) => {
  const message = error.response?.data?.message;
  return loginErrorMap[message] || message || 'حدث خطأ ما';
};

//Register error messages map
const registerErrorMap: Record<string, string> = {
  'This Email is Already Exist.': 'الإيميل موجود بالفعل',
};

//Register error messages handler
export const getRegisterErrorMessage = (error: any) => {
  const message = error.response?.data?.message;
  return registerErrorMap[message] || message || 'حدث خطأ ما';
};
