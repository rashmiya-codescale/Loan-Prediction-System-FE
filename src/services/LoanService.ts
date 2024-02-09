import axios from 'axios';
const baseUrl = 'http://3.106.187.155:8000/user';

export const getLoanDataByEmailService = async (user_email: string) => {
  console.log(user_email);
  const res = await axios.get(baseUrl + '/getUser/' + user_email);
  return res;
};
export const saveLoanService = async (loanDataObj: any) => {
  const res = await axios.post(baseUrl, loanDataObj);
  return res;
};
