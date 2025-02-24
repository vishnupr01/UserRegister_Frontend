import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    personalInfo: {
      title: '', // Mr, Mrs, etc.
      fullName: '',
      dateOfBirth: '',
      currentAddress: '',
      addressDuration: '',
      aboutYourself: '',
    },
    financialInfo: {
      employmentStatus: '',
      savingsInvestments: '',
    },
    registerInfo: {
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
  },
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setFinancialInfo: (state, action) => {
      state.financialInfo = { ...state.financialInfo, ...action.payload };
    },
    setRegisterInfo: (state, action) => {
      state.registerInfo = { ...state.registerInfo, ...action.payload };
    },
  },
});

const store = configureStore({ reducer: { user: userSlice.reducer } });

export const { setPersonalInfo, setFinancialInfo, setRegisterInfo } = userSlice.actions;
export default store;
