import { useEffect, useState } from "react";
import { CategoriesAPI } from "../services/apis/CategoriesAPI";
import { RolesAPI } from "../services/apis/RolesAPI";

import { ACTIVE_FILTER_STATES, ToastVariants } from "../utils/constants";
import useToast from "./useToast";

const categoryTypes = {
  category: "category",
  subCategory: "subCategory",
};

const useCategories = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [activeFilter, setActiveFilter] = useState(ACTIVE_FILTER_STATES.active);
  const [filteredData, setFilteredData] = useState([]);

  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [category, setCategory] = useState({
    id: "",
    title: "",
    type: categoryTypes.category,
    parent: undefined,
    icon: undefined,
    thumbnailUrl: undefined,
    isProgramCategory: false,
    ordering: 1,
    isActive: true,
  });

  const getActiveCategories = () => {
    return categories.filter((cat) => cat.isActive);
  };

  const maxOrderCategories = () => {
    return getActiveCategories().length;
  };

  const maxOrderSubCategories = (categoryParent) => {
    let parentCategory = getActiveCategories().find(
      (cate) => cate.id === categoryParent
    );

    return parentCategory && parentCategory.subCategories
      ? parentCategory.subCategories.filter((subCat) => subCat.isActive).length
      : 1;
  };

  const getCategories = async (showLoader = true) => {
    try {
      setLoading(showLoader);
      setError(false);

      const { data: responseData } = await CategoriesAPI.getCategories({
        showMapping: true,
        isActive: "A",
      });

      if (responseData.status === "SUCCESS") {
        setCategories(responseData.data.category);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCategories: getCategories: getting data failed, error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // for chsnging parent, when user toggles back between category/subcategory types
  useEffect(() => {
    if (category.type === categoryTypes.category) {
      setCategory({ ...category, parent: undefined });
    } else {
      if (category.parent === undefined) {
        let activeCategories = getActiveCategories();
        let firstParent =
          activeCategories.length > 0 ? activeCategories[0].id : undefined;
        setCategory({ ...category, parent: firstParent });
      }
    }
  }, [category.type]);

  useEffect(() => {
    if (!categories) return;

    let newFilteredCategories = [];

    if (activeFilter === ACTIVE_FILTER_STATES.active) {
      newFilteredCategories = categories.filter(
        (category) => category.isActive
      );
    } else if (activeFilter === ACTIVE_FILTER_STATES.inActive) {
      newFilteredCategories = categories.filter(
        (category) => !category.isActive
      );
    } else {
      newFilteredCategories = [...categories];
    }

    setFilteredData(newFilteredCategories);
  }, [categories, activeFilter]);

  const openAddModal = () => {
    setShowAddModal(true);

    setCategory({
      title: "",
      type: categoryTypes.category,
      parent: undefined,
      icon: "fab fa-500px",
      thumbnailUrl: undefined,
      isProgramCategory: false,
      ordering: 1,
      isActive: true,
    });
  };

  const getNoOfSubCategories = (category) => {
    return category.subCategories
      ? category.subCategories.filter((subCategory) => subCategory.isActive)
          .length
      : 0;
  };

  const editCategory = async () => {
    try {
      let categoryId = category.id;

      const categoryData = {
        title: category.title,
        type: category.type,
        parent: category.parent,
        ordering: category.ordering,
        icon: category.icon,
        thumbnailUrl: category.thumbnailUrl,
        isActive: category.isActive,
        isProgramCategory: category.isProgramCategory,
      };

      const body = {
        categoryId,
        category: categoryData,
      };
      const { data: responseData } = await CategoriesAPI.updateCategory(body);

      if (responseData.status === "SUCCESS") {
        getCategories(false);

        showToast("Successfully Updated Category", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCategpries: editCategory: update category failed:",
        error
      );
      showToast(
        "Failed to edit category. Please try again.",
        ToastVariants.error
      );
    }
  };

  const getProgramCategories = () => {
    return filteredData.filter((catgeory) => catgeory.isProgramCategory);
  };

  const getCourseCategories = () => {
    return filteredData.filter((category) => !category.isProgramCategory);
  };

  const createCategory = async () => {
    try {
      const categoryData = {
        title: category.title,
        type: category.type,
        parent: category.parent,
        ordering: category.ordering,
        icon: category.icon,
        thumbnailUrl: category.thumbnailUrl,
        isProgramCategory: category.isProgramCategory,
      };

      const { data: responseData } = await CategoriesAPI.createCategory({
        category: categoryData,
      });

      if (responseData.status === "SUCCESS") {
        if (category.type === categoryTypes.category) {
          setCategories([...categories, responseData.data.category]);
        } else {
          let newCategories = [...categories];
          let updatedCategory = newCategories.find(
            (cat) => cat.id === category.parent
          );

          if (!updatedCategory.subCategories) {
            updatedCategory.subCategories = [];
          }

          updatedCategory.subCategories.push(responseData.data.category);
        }

        showToast("Successfully Created Category", ToastVariants.success);

        setCategory({
          title: "",
          type: categoryTypes.category,
          parent: undefined,
          icon: undefined,
          thumbnailUrl: undefined,
          ordering: 1,
          isActive: true,
          isProgramCategory: false,
        });
      } else {
        throw responseData.message;
      }
    } catch (error) {
      console.error(
        "useCategories: createCategory: create category failed:",
        error
      );
      showToast(
        "Failed to create category. Please try again.",
        ToastVariants.error
      );
    }
  };

  const deleteCategory = async (deletedCategory) => {
    try {
      let categoryId = deletedCategory.id;

      const categoryData = {
        title: deletedCategory.title,
        type: deletedCategory.type,
        parent: deletedCategory.parent,
        ordering: deletedCategory.ordering,
        icon: deletedCategory.icon,
        thumbnailUrl: deletedCategory.thumbnailUrl,
        isActive: false,
      };

      const body = {
        categoryId,
        category: categoryData,
      };
      const { data: responseData } = await CategoriesAPI.updateCategory(body);

      if (responseData.status === "SUCCESS") {
        getCategories();

        showToast("Successfully Deleted Category", ToastVariants.success);
      } else {
        throw responseData.message;
      }
    } catch (error) {
      setError(true);
      console.error(
        "useCategpries: deleteCategory: delete category failed:",
        error
      );
      showToast(
        "Failed to delete category. Please try again.",
        ToastVariants.error
      );
    }
  };

  return {
    loading,
    error,
    categories,
    editCategory,
    createCategory,
    category,
    deleteCategory,
    maxOrderSubCategories,
    setCategory,
    setShowAddModal,
    setShowEditModal,
    showAddModal,
    showEditModal,
    openAddModal,
    maxOrderCategories,
    getNoOfSubCategories,
    filteredData,
    activeFilter,
    setActiveFilter,
    getProgramCategories,
    getCourseCategories,
  };
};

export default useCategories;
