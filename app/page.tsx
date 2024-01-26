import Header from './components/Header'
import ProductList from './components/ProductList'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
     <Header />
     <ProductList />
    </main>
  );
}
