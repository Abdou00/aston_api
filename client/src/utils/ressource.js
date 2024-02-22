import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

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

export const handleLogin = async (username, password, navigate) => {
  try {
    const request = await fetch('http://localhost:4000/login', {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });

    const data = await request.json();

    if (data.error_message) {
      toast.error(data.error_message);
    } else {
      toast.success(data.message);
      localStorage.setItem('_id', data.data.id);
      localStorage.setItem('_myEmail', data.data.email);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error(error);
    toast.error("Please check your username or password!");
  }
}

export const handleCreateSchedule = async (selectedTimezone, schedule, navigate) => {
  try {
    await fetch("http://localhost:4000/schedule/create", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem('_id'),
        timezone: selectedTimezone,
        schedule,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });

    navigate(`/profile/${localStorage.getItem('_id')}`);
    // navigate('/profile/' + localStorage.getItem('_id'));
  } catch (error) {
    console.error(error);
    toast.error("Schedule cannot create!")
  }
}

export const fetchBookingDetails = (
  user,
  setError,
  setTimezone,
  setSchedules,
  setReceiverEmail
) => {
  fetch(`http://localhost:4000/schedules/${user}`, {
    method: "POST",
    body:  JSON.stringify({
      username: user,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error_message) {
        toast.error(data.error_message)
        setError(true);
      } else {
        setTimezone(data.timezone.label);
        setSchedules(data.schedules);
        setReceiverEmail(data.receiverEmail);
      }
    })
    .catch((err) => console.error(err));
}

export const sendEmail = async (
  receiverEmail,
  email,
  fullName,
  message,
  duration
) => {
  emailjs.send(
    "service_iiq0rxe",
    "template_176hacb",
    {
      to_email: receiverEmail,
      from_email: email,
      fullName,
      message,
      duration,
    },
    "0UDH9UTtMQMfoka8J"
  )
  .then((result) => {
    console.log(result.text);
    toast.success("Session booked successfully!")
  })
  .catch((err) => console.error(err));

  console.log("Message sent: %s", mail.messageId);
}