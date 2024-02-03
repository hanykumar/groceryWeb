interface productProps {
  id: number,
  title: string,
  description: string,
  image: string,
  price: number,
  quantity: number;
}
class ProductModel {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  constructor({ id, title, description, image, price, quantity }: productProps) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
  }
}

export default ProductModel;
