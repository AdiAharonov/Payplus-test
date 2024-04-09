"use client";
import { useUser } from "@/context/userContext";
import { signin, signup } from "@/server";
import { validateIsraeliID } from "@/utils/validations";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const initialEmployeeForm = {
  employeeId: "",
  password: "",
};

const formInputs = [
  {
    label: "תעודת זהות",
    type: "text",
    name: "employeeId",
    placeholder: "יש להזין תעודת זהות",
    id: "employee-id-input",
  },

  {
    label: "סיסמא",
    type: "password",
    name: "password",
    placeholder: "יש להזין סיסמא",
    id: "password-input",
  },
];

export default function Signin() {
  const [employeeForm, setEmployeeForm] = useState(initialEmployeeForm);
  const [validationError, setValidationError] = useState("");

  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && router) {
      router.push('/');
    }
  }, [user, router]);
  

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["employee-signin"],
    queryFn: () => signin(employeeForm),
    enabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    setValidationError("");

    if (
      !employeeForm.employeeId ||
      !employeeForm.password
    ) {
      setValidationError("נא למלא את כל השדות");
      isValid = false;
    }


    if (!validateIsraeliID(employeeForm.employeeId)) {
      setValidationError("התעודת זהות אינה נכונה");
      isValid = false;
    }

    if (isValid) {
      const user  = await refetch();

      setUser(user.data)
    }
  };



  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="block text-gray-700 text-lg font-bold mb-2">
          התחבר
        </h2>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            label={input.label}
            type={input.type}
            value={employeeForm[input.name]}
            name={input.name}
            placeholder={input.placeholder}
            id={input.id}
            onChange={handleChange}
          />
        ))}
        <div className="flex items-center justify-between flex-col gap-8">
          <button
            className="bg-pink-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="submit"
          >
            התחבר למערכת
          </button>

          <Link href={"/signup"} className="text-pink-500 hover:underline">
            פתח משתמש חדש
          </Link>

          {(validationError || error) && (
            <p className="text-lg text-red-500">
              {validationError ? validationError : "משהו השתבש"}
            </p>
          )}


        </div>
      </form>
    </div>
  );
}

const FormInput = ({ label, type, value, onChange, name, placeholder, id }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
