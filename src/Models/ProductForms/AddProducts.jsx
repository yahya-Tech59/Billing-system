import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../api/axiosConfig";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import ClearButton from "../../components/ClearButton";

export const AddProduct = ({ onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [commission, setCommission] = useState("");
  const [products, setProducts] = useState([]);

  function handleClear() {
    setName("");
    setPrice("");
    setCommission("");
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    commission: yup.number().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const addProduct = async (data) => {
    const res = await axios.post(`/api/v1/products`, data);

    if (res.status === 201) {
      const response = await res.data;
      setProducts(response);
      alert("Product Added Successfully");
      onClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    addProduct();
  }, []);

  return (
    <div className="flex bg-slate-100">
      <form
        onSubmit={handleSubmit(addProduct)}
        className="flex flex-col gap-1 bg-white shadow-slate-300 shadow-sm w-[38rem] h-[32rem] rounded-xl p-3"
      >
        <div className="pb-16 ml-5 mt-8">
          <div className="flex">
            <h2 className="text-3xl ml-40">Add New Product</h2>
            <button
              onClick={onClose}
              className=" h-8 w-8 p-1 bg-blue-500 text-white text-2xl font-medium rounded-md hover:bg-blue-600 ml-36"
            >
              <IoCloseOutline />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <label>ProductName</label>
              <input
                type="text"
                {...register("name")}
                className=" bg-[#F9F9F9] placeholder:text-slate-400 p-3 mr-1 rounded-lg w-[34rem]"
                placeholder="Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Price</label>
              <input
                type="number"
                {...register("price")}
                className=" bg-[#F9F9F9] placeholder:text-slate-400 p-3 mr-1 rounded-lg w-[34rem]"
                placeholder="$599"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>commission </label>
              <input
                type="number"
                {...register("commission")}
                className=" bg-[#F9F9F9] placeholder:text-slate-400 p-3 mr-1 rounded-lg w-[34rem]"
                placeholder="123456"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="flex mt-6 gap-4 justify-center ">
            <input type="checkbox" />
            <p>I agree With The Terms Of Use</p>
          </div> */}
          <div className="flex gap-72 ml-5 ">
            <SubmitButton label="Submit" />
            <ClearButton label="Clear" onClick={handleClear} />
          </div>
        </div>
      </form>
    </div>
  );
};
