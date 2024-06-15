import React, { useState } from "react";
import ProductCard from "../component/productCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState("0");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const isPrevPage = page>1;
  const isNextPage = page<4;

  const addtocartHanlder = () => {};
  return (
    <div className="px-6 py-8 h-[calc(100vh-5rem)] flex flex-row justify-stretch gap-[1.8rem]">
      <aside className="w-[18rem] p-6 shadow-2xl">
        <h2 className="uppercase font-light text-[1.8rem] tracking-wide">
          filters
        </h2>
        <div>
          {/*  --------- Sort----------- */}
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[1.05rem]">Sort</label>
            <select
              name="sort"
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border-2 justify-end w-[100%] rounded m-[0.5rem] bg-white outline-none"
            >
              <option value="">none</option>
              <option value="asc">Price(Low to High)</option>
              <option value="dsc">Price (High to Low)</option>
            </select>
          </div>
          {/* --------- Max Price---------- */}
          <div>
            <label className="font-bold text-[1.05rem]">
              Max Price: {maxPrice}
            </label>

            <input
              className="p-2 border-2 justify-end w-[100%] rounded m-[0.5rem] text-gray-600 bg-white outline-none"
              type="range"
              name="maxPrice"
              max={100000}
              min={100}
              defaultValue={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          {/* --------------Category-------------- */}
          <div>
            <label className="font-bold text-[1.05rem]">Category</label>
            <select
              name="sort"
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border-2 justify-end w-[100%] rounded m-[0.5rem] bg-white outline-none"
            >
              <option value="">All</option>
              <option value="camera">Camera</option>
              <option value="game">Game</option>
              <option value="laptop">Laptop</option>
            </select>
          </div>
        </div>
      </aside>
      <main className="w-[100%]">
        <h2 className="font-sans text-[1.7rem] uppercase tracking-wider mb-6 mt-2">
          Products
        </h2>
        <div>
          <input
            type="text"
            placeholder="Search by Name...."
            className="p-[0.7rem] border-2 justify-end w-[10rem] rounded-md m-[0.5rem] bg-slate-100 outline-none"
          />
        </div>

        <div className="flex flex-row justify-start items-start flex-wrap h-[calc(100%-10rem)] overflow-y-auto">
          <ProductCard
            productsId="f4df"
            name="Samsung Galaxy S24 Ultra"
            price={2563}
            photo="https://m.media-amazon.com/images/I/81vxWpPpgNL._SL1500_.jpg"
            handler={addtocartHanlder}
            stock={42}
          />
        </div>
        <article className="flex justify-center items-center ">
          <button disabled={!isPrevPage} className={`bg-teal-700 flex justify-center items-center text-white px-[0.5rem] py-[0.2rem] rounded-[5px] disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-gray-800`} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span className="mx-[0.5rem]">{page} of 4</span>
          <button disabled ={!isNextPage} className="bg-teal-700 flex justify-center items-center text-white px-[0.5rem] py-[0.2rem] rounded-[5px] disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-gray-800" onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  );
};

export default Search;
