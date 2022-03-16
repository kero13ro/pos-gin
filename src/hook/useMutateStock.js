import { useState } from "react";
import { useDispatch } from "react-redux";
import { FetchStock } from "../utilities/axios";
import { updateStock } from "../store/slice/stock";

export default function useMutateStock() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const FetchSheet = () => {
    FetchStock()
      .then((data) => dispatch(updateStock(data)))
      .catch((err) => console.log(err));
  };

  return {
    loading,
    FetchSheet,
  };
}
