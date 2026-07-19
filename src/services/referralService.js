import axios from "axios";

export const getReferralLink = async () => {
  const response = await axios.get("http://localhost:5000/api/referral");

  return response.data;
};