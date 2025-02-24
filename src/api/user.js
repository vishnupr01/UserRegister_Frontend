import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints/userEndPoints";

const register = async (data) => {
  try {
    const response = await Api.post(userRoutes.register, data)
    return response
  } catch (error) {
    console.log(error);
    throw error

  }
}
export default register