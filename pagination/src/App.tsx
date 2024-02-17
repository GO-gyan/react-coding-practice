import { useState, useEffect } from "react";
import { fetchProduct } from "./api/product";
import "./App.css";

interface Product {
    id: number;
    title: string;
    thumbnail: string;
}

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        fetchProduct().then((res) => {
            console.log(res);
            if (res && res.products) setProducts(res.products);
        });
    }, []);

    const selectPageHandler = (selectedPage: number) => {
        if (selectedPage <= 0 || selectedPage > Math.ceil(products.length / 10)) return;
        setPage(selectedPage);
    };

    return (
        <div>
            {products.length > 0 && (
                <div className="products">
                    {products.slice(page * 10 - 10, page * 10).map((product) => {
                        return (
                            <span key={product.id} className="products__single">
                                <img src={product.thumbnail} alt={product.title} />
                                <span>{product.title}</span>
                            </span>
                        );
                    })}
                </div>
            )}
            {products.length > 0 && (
                <div className="pagination">
                    <span
                        onClick={() => selectPageHandler(page - 1)}
                        className={page > 1 ? "" : "pagination__disabled"}
                    >
                        ◀
                    </span>
                    {[...Array(products.length / 10)].map((_, index) => {
                        return (
                            <span
                                key={index}
                                className={page === index + 1 ? "pagination__selected" : ""}
                                onClick={() => selectPageHandler(index + 1)}
                            >
                                {index + 1}
                            </span>
                        );
                    })}
                    <span
                        onClick={() => selectPageHandler(page + 1)}
                        className={page < products.length / 10 ? "" : "pagination__disabled"}
                    >
                        ▶
                    </span>
                </div>
            )}
        </div>
    );
}

export default App;
