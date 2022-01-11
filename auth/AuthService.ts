import axios from "axios";

export class AuthService {
  static async getToken() {
    let token = "";
    const clientId = process.env.API_CLIENT_ID ? process.env.API_CLIENT_ID : "";
    const secret = process.env.API_SECRET ? process.env.API_SECRET : "";
    const tokenUrl = process.env.API_TOKEN_URL ? process.env.API_TOKEN_URL : "";

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", secret);
    params.append("grant_type", "client_credentials");

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    try {
      const { status, data } = await axios.post(tokenUrl, params, config);
      if (status == 200 && data) {
        token = data.access_token;
      } else {
        console.log(`${status} : ${data}`);
      }
    } catch (error) {
      console.error(error);
    }
    return token;
  }
}