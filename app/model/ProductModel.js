class ProductModel {
    constructor(id, title, description, image, price) {
      this.id = id; 
      this.title = title;
      this.description = description;
      this.image = image;
      this.price = price;
      this.quantity = 0;
    }
  
    addToCart() {
      this.quantity += 1;
    }

    getTotalPrice() {
      return this.price * this.quantity;
    }
  }
  
  export default ProductModel;
  