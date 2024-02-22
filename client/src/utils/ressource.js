import { toast } from "react-toastify";

export const time = [
  {id: "null", hour: "Select time"},
  {id: "", hour: "7:00am"},
  {id: "", hour: "8:00am"},
  {id: "", hour: "9:00am"},
  {id: "", hour: "10:00am"},
  {id: "", hour: "11:00am"},
  {id: "", hour: "12:00am"},
  {id: "", hour: "13:00pm"},
  {id: "", hour: "14:00pm"},
  {id: "", hour: "15:00pm"},
  {id: "", hour: "16:00pm"},
  {id: "", hour: "17:00pm"},
  {id: "", hour: "18:00pm"},
  {id: "", hour: "19:00pm"},
];

export const handleRegister = async (email, username, password, navigate) => {
  try {
    const request = await fetch('http://localhost:4000/register', {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });

    const data = await request.json();

    if (data.error_message)
      toast.error(data.error_message);
    else
      toast.success(data.message);
      navigate('/');
  } catch (error) {
    console.error(error);
    toast.error("Account creation failed!")
  }
}