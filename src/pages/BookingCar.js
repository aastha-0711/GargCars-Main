import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import {
  DollarCircleOutlined,
  TagsOutlined,
  CarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import Footer from "./Footer";

const { RangePicker } = DatePicker;

function BookingCar() {
  const { id } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalmins] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setcar(cars.find((o) => o._id === id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cars]);

  useEffect(() => {
    const baseAmount = totalMins * Math.ceil(car.rentPerHour / 60);
    const driverCharge = driver ? 5 * totalMins : 0;
    setTotalAmount(baseAmount + driverCharge);
  }, [driver, totalMins]);

  function selectTimeSlots(values) {
    if (values) {
      setFrom(moment(values[0]).format("MMM DD yyyy HH"));
      setTo(moment(values[1]).format("MMM DD yyyy HH"));
      setTotalmins(values[1].diff(values[0], "minutes"));
    } else {
      setTotalmins(0);
    }
  }

  async function handleRazorpayBooking() {
    const user = JSON.parse(localStorage.getItem("user"));

    const reqBody = {
      user: user._id,
      car: id,
      totalMins,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: { from, to },
    };

    const response = await fetch("/api/bookings/bookcar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: "GoFoodie Car Booking",
      description: "Car Rental Payment",
      order_id: data.orderId,
      handler: async function(response) {
        const confirmData = {
          ...data.bookingDetails,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        await fetch("/api/bookings/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(confirmData),
        });

        alert("Payment successful & booking confirmed!");
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#6F8661",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt={car.name} className="carimg2 bs2" />
        </Col>
        <Col lg={10} sm={24} xs={24} style={{ marginLeft: "65px" }}>
          <div
            style={{
              backgroundColor: "#6F8661",
              borderRadius: "10px",
              width: "90%",
            }}
          >
            <Divider>
              <h4 style={{ color: "white" }}>DETAILS</h4>
            </Divider>
            <div className="d-flex justify-content-around">
              <div className="car-headings">
                <p>
                  <TagsOutlined /> Model
                </p>
                <p>
                  <DollarCircleOutlined /> Rent
                </p>
                <p>
                  <CarOutlined /> Fuel Type
                </p>
                <p>
                  <UsergroupAddOutlined /> Max Persons
                </p>
              </div>
              <div className="car-headData">
                <p>{car.name}</p>
                <p>{car.rentPerHour} Rs/-</p>
                <p>{car.fuelType}</p>
                <p>{car.capacity}</p>
              </div>
            </div>

            <Divider>
              <h4 style={{ color: "white" }}>SELECT TIME SLOTS</h4>
            </Divider>
            <div>
              <RangePicker
                className="RangePicker"
                showTime={{ format: "HH:mm a" }}
                format="MMM DD yyyy HH:mm"
                onChange={selectTimeSlots}
              />
              <button
                className="btn1 mt-2 mb-2"
                style={{ borderRadius: "5px", outline: "none", border: "none" }}
                onClick={() => setShowModal(true)}
              >
                See Booked Slots
              </button>

              {from && to && (
                <div
                  style={{
                    textAlign: "right",
                    marginRight: "56px",
                    color: "white",
                  }}
                >
                  <p>
                    Total Minutes : <b>{totalMins}</b>
                  </p>
                  <Checkbox onChange={(e) => setdriver(e.target.checked)}>
                    <span style={{ color: "white" }}> Driver Required</span>
                  </Checkbox>
                  <h3>Total Amount : {totalAmount}</h3>

                  <button
                    className="btn1"
                    style={{
                      marginBottom: "4px",
                      borderRadius: "5px",
                      fontWeight: "500",
                      outline: "none",
                      border: "none",
                    }}
                    onClick={handleRazorpayBooking}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => (
                <button className="btn1 mt-2 ml-2" key={index}>
                  {slot.from} - {slot.to}
                </button>
              ))}
              <div className="text-right mt-5">
                <button className="btn1" onClick={() => setShowModal(false)}>
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
      <Footer />
    </DefaultLayout>
  );
}

export default BookingCar;
