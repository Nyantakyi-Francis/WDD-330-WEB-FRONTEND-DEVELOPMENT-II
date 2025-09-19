const baseURL = "http://127.0.0.1:3000/tents";

// This is the updated class that uses the API
export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    try {
      // Build the URL dynamically based on the category
      const response = await fetch(`http://127.0.0.1:3000/${this.category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return [];
    }
  }
}
