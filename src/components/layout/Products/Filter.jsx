import { FaSearch, FaSpinner } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { filtreActions } from "../../../redux/slices/filtreSlice";
import { useEffect, useState } from "react";
import { handleFiltre } from "../../../database/firestoreFunc";
import { productsActions } from "../../../redux/slices/productsSlice";
import { modalActions } from "../../../redux/slices/modalSlice";

const Filter = ({ currentPage }) => {
  const dispatch = useDispatch();
  const { filtreTags } = useSelector((state) => state.filtreSlice);
  const { isOpen } = useSelector((state) => state.modalSlice);
  const [pageSize, setPageSize] = useState(16);
  const [lastVisible, setLastVisible] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setPageSize(16);
      else if (width >= 930) setPageSize(12);
      else if (width >= 768) setPageSize(8);
      else if (width >= 640) setPageSize(15);
      else setPageSize(16);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterOptionsHandleChange = (field, arr, option) => {
    const optionsArray = arr;

    const newFiltreOptions = optionsArray.includes(option)
      ? optionsArray.filter((item) => item !== option)
      : [...optionsArray, option];
    setFieldValue(field, newFiltreOptions);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch(productsActions.loading());
        const products = await handleFiltre(
          filtreTags,
          currentPage,
          lastVisible,
          setLastVisible,
          pageSize
        );
        dispatch(productsActions.setProducts(products));
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [filtreTags, currentPage, pageSize]);

  const onSubmit = async (values) => {
    dispatch(filtreActions.updateFiltreTags(values));

    if (isOpen) dispatch(modalActions.closeModal());
  };
  const {
    isSubmitting,
    handleReset,
    setValues,
    setFieldValue,
    handleChange,
    handleSubmit,
    values,
  } = useFormik({
    initialValues: {
      searchTerm: "",
      minPrice: 0,
      filteredBrands: [],
      filteredCategories: [],
      filteredYears: [],
    },
    onSubmit,
    onReset: () => {
      setValues({
        searchTerm: "",
        minPrice: 0,
        filteredBrands: [],
        filteredCategories: [],
        filteredYears: [],
      });
      dispatch(
        filtreActions.updateFiltreTags({
          searchTerm: "",
          minPrice: 0,
          filteredBrands: [],
          filteredCategories: [],
          filteredYears: [],
        })
      );
      if (isOpen) dispatch(modalActions.closeModal());
    },
  });

  return (
    <>
      <h4 className="font-semibold text-3xl m-1">Filters</h4>
      <form onSubmit={handleSubmit}>
        <Input
          name="searchTerm"
          onChange={handleChange}
          value={values.searchTerm}
          placeholder="Search product"
          leftIcon={<FaSearch className="mx-1" />}
          className=" my-6"
        />
        <h6 className="font-medium text-2xl mb-4">Price Adjuster</h6>
        <div className="flex-between font-semibold text-lg">
          <span>{values.minPrice}$</span>
          <span>100000$</span>
        </div>
        <input
          max="100000"
          onChange={handleChange}
          type="range"
          value={values.minPrice}
          name="minPrice"
          className="accent-indigo-600 w-full mt-2 my-12"
        />
        <h6 className="font-medium text-2xl mb-4">Select Brands</h6>
        <ul className="border-y-2 grid grid-cols-2 gap-2 border-indigo-600 py-6">
          {[
            "Apple",
            "Samsung",
            "Lenovo",
            "Hp",
            "Lg",
            "Huawei",
            "Xiaomi",
            "Jbl",
            "Asus",
            "Monster",
          ].map((brand) => (
            <li key={brand} className="flex items-center gap-2 text-lg">
              <input
                value={brand}
                checked={values.filteredBrands.includes(brand)}
                onChange={() =>
                  filterOptionsHandleChange(
                    "filteredBrands",
                    values.filteredBrands,
                    brand
                  )
                }
                type="checkbox"
                className="scale-125"
              />
              {brand}
            </li>
          ))}
        </ul>
        <h6 className="font-medium text-2xl my-4">Select Category</h6>
        <ul className="border-y-2 grid grid-cols-2 gap-2 border-indigo-600 py-6">
          {[
            "Telephone",
            "Tablet",
            "Laptop",
            "Watch",
            "Headphones",
            "TV",
            "Accessories",
          ].map((category) => (
            <li key={category} className="flex items-center gap-2 text-lg">
              <input
                value={category}
                checked={values.filteredCategories.includes(category)}
                onChange={() =>
                  filterOptionsHandleChange(
                    "filteredCategories",
                    values.filteredCategories,
                    category
                  )
                }
                type="checkbox"
                className="scale-125"
              />
              {category}
            </li>
          ))}
        </ul>
        <h6 className="font-medium text-2xl my-4">Select Output Year</h6>
        <ul className="border-y-2 grid grid-cols-2 gap-2 border-indigo-600 py-6">
          {[
            "2024",
            "2023",
            "2022",
            "2021",
            "2020",
            "2019",
            "2018",
            "2017",
            "2016",
            "2015",
            "2014",
            "2013",
          ].map((year) => (
            <li key={year} className="flex items-center gap-2 text-lg">
              <input
                value={year}
                checked={values.filteredYears.includes(year)}
                onChange={() =>
                  filterOptionsHandleChange(
                    "filteredYears",
                    values.filteredYears,
                    year
                  )
                }
                type="checkbox"
                className="scale-125"
              />
              {year}
            </li>
          ))}
        </ul>
        <Button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 my-2 rounded-xl w-full text-white"
        >
          <GrPowerReset />
          Reset Filtres
        </Button>
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting && "opacity-50"
          } bg-indigo-600 hover:bg-indigo-700 my-2 rounded-xl w-full text-white`}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin text-3xl" />
          ) : (
            <>
              <FaSearch />
              Apply Filtres
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default Filter;
