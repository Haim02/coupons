import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import "dayjs/locale/he";
import Button from "../../../components/button/Button";
import { useCoupons } from "../../../context/Coupon";
import { useAuth } from "../../../context/Auth";
import "./couponsList.css";
import Loader from "../../../components/Loader";

const CouponsList = () => {
  const { coupons, loading, gettAllCoupons } = useCoupons();
  const { users, getUsers } = useAuth();
  let date = new Date();
  const [dateRange, setDateRange] = useState([dayjs(date), dayjs(date)]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    gettAllCoupons();
    getUsers()
  }, [gettAllCoupons]);

  const onChangeUser = (e) => {
    setUser(e.target.value);
  };

  useEffect(() => {
    if (dateRange[0]) {
      setStartDate(dateRange[0]);
    } else {
      setStartDate(null);
    }

    if (dateRange[1]) {
      setEndDate(dateRange[1]);
    } else {
      setEndDate(null);
    }
  }, [dateRange]);

  const userColumns = [
    {
      field: "couponCode",
      headerName: "קוד קופון",
      width: 250,
    },
    {
      field: "userId",
      headerName: "ID משתמש",
      width: 250,
    },
    {
      field: "createAt",
      headerName: "נוצר ב",
      width: 250,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "פעולות",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/copons/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">
                <Button type="button" text="צפה" />
              </div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatableContainer">
      <h1>קופונים</h1>
      <div className="datatableCard">
        <div className="inputContainer">
          <label>מיין לפי משתמש</label>
          <select name="user" onChange={onChangeUser}>
            <option></option>
            {users && users && users.map((user) => {
              return <option value={user}>{user}</option>;
            })}
          </select>
        </div>
        <div className="inputContainer">
          <label>סנן לפי טווח תאריכים</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]}>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                localeText={{ start: "התחלה", end: "סוף" }}
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      {!coupons ? <Loader />
       : <DataGrid
        className="datagrid"
        rows={coupons || 0}
        getRowId={(row) => row?._id || 0}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />}
    </div>
  );
};

export default CouponsList;
