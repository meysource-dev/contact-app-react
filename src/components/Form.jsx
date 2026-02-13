import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Form = ({ setContacts, editingContact, setEditingContact }) => {
  const isEditing = !!editingContact;

  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    mobile: "",
  });

  useEffect(() => {
    if (editingContact) {
      setContact({
        name: editingContact.name || "",
        lastName: editingContact.lastName || "",
        mobile: editingContact.mobile || "",
      });
      setErrors({ name: "", lastName: "", mobile: "" });
    } else {
      setContact({ name: "", lastName: "", mobile: "" });
      setErrors({ name: "", lastName: "", mobile: "" });
    }
  }, [editingContact]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = { name: "", lastName: "", mobile: "" };
    let isValid = true;

    if (!contact.name.trim()) {
      newErrors.name = "نام اجباری است";
      isValid = false;
    }

    if (!contact.mobile.trim()) {
      newErrors.mobile = "شماره موبایل اجباری است";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id ? { ...c, ...contact } : c,
        ),
      );
      toast.success("تغییرات با موفقیت اعمال شد");
      setEditingContact(null);
    } else {
      setContacts((prev) => [
        ...prev,
        { ...contact, id: Date.now() + Math.random() },
      ]);
      toast.success("مخاطب با موفقیت اضافه شد");
    }

    setContact({ name: "", lastName: "", mobile: "" });
    setErrors({ name: "", lastName: "", mobile: "" });
  };

  const cancelHandler = () => {
    setEditingContact(null);
    setErrors({ name: "", lastName: "", mobile: "" });
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "32px",
        background: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {isEditing ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}
      </h3>

      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            name="name"
            placeholder="نام"
            value={contact.name}
            onChange={changeHandler}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: `1px solid ${errors.name ? "#d32f2f" : "#ccc"}`,
            }}
          />
          {errors.name && (
            <div
              style={{
                color: "#d32f2f",
                fontSize: "0.85rem",
                marginTop: "4px",
              }}
            >
              {errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            name="lastName"
            placeholder="نام خانوادگی (اختیاری)"
            value={contact.lastName}
            onChange={changeHandler}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <input
            type="tel"
            name="mobile"
            placeholder="شماره موبایل"
            value={contact.mobile}
            onChange={changeHandler}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: `1px solid ${errors.mobile ? "#d32f2f" : "#ccc"}`,
              direction: "ltr",
              textAlign: "left",
            }}
          />
          {errors.mobile && (
            <div
              style={{
                color: "#d32f2f",
                fontSize: "0.85rem",
                marginTop: "4px",
              }}
            >
              {errors.mobile}
            </div>
          )}
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          {isEditing && (
            <button
              type="button"
              onClick={cancelHandler}
              style={{
                padding: "10px 20px",
                background: "#757575",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              انصراف
            </button>
          )}

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: isEditing ? "#388e3c" : "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isEditing ? "ذخیره تغییرات" : "ثبت مخاطب"}
          </button>
        </div>
      </form>
    </div>
  );
};
<Toaster/>
export default Form;
