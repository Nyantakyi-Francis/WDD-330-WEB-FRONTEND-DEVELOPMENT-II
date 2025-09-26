const baseURL = import.meta.env.VITE_SERVER_URL;

// --- UPDATED FUNCTION ---
async function convertToJson(res) {
  // Check for successful response (status code 200-299)
  if (res.ok) {
    // If successful, parse the JSON body and return it
    return res.json();
  } else {

    const data = await res.json();


    throw new Error(data);
  }
}
// ------------------------

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    // The response from fetch is passed to convertToJson for error handling
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}