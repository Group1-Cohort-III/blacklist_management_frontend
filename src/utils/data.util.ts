import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import { formatDate } from "./formatdate.util";
import { UserData } from "../interfaces/slice.interface";

export const UserViewData = {
  head: ["#", "NAME", "CATEGORY", "DESCRIPTION", "REASON", "DATE"],
  body: [
    ["1", "Honda", "Vehicle", "Black Honda Civic", "Bad wheels", "24/03/2024"],
    ["2", "Honda", "Vehicle", "Black Honda Civic", "Bad wheels", "24/03/2024"],
    ["3", "Honda", "Vehicle", "Black Honda Civic", "Bad wheels", "24/03/2024"],
    ["4", "Honda", "Vehicle", "Black Honda Civic", "Bad wheels", "24/03/2024"],
    ["5", "Honda", "Vehicle", "Black Honda Civic", "Bad wheels", "24/03/2024"],
    ["6", "Honda", "Vehicle", "Black Honda Civic", "Bad wheels", "24/03/2024"],
  ],
};

export const UsersData = {
  head: ["#", "First Name", "Last Name", "Email", "Set Password", ""],
  body: [
    [
      "1",
      "Victoria",
      "Paul",
      "victoria.paul@email.com",
      "08102056891",
      "Admin User",
      "",
    ],
    [
      "2",
      "Victoria",
      "Paul",
      "victoria.paul@email.com",
      "08102056891",
      "Admin User",
      "",
    ],
    [
      "3",
      "Victoria",
      "Paul",
      "victoria.paul@email.com",
      "08102056891",
      "Admin User",
      "",
    ],
    [
      "4",
      "Victoria",
      "Paul",
      "victoria.paul@email.com",
      "08102056891",
      "Admin User",
      "",
    ],
    [
      "5",
      "Victoria",
      "Paul",
      "victoria.paul@email.com",
      "08102056891",
      "Admin User",
      "",
    ],
    [
      "6",
      "Victoria",
      "Paul",
      "victoria.paul@email.com",
      "08102056891",
      "Admin User",
      "",
    ],
  ],
};

export const ProductData = {
  head: ["#", "NAME", "DESCRIPTION", "STATUS", "CREATED", ""],
  body: [
    [
      "1",
      "Lenovo",
      "Computer",
      "14’ Screen Black",
      "Blacklisted",
      "24/03/2024",
      "",
    ],
    ["2", "iPhone", "Phone", "Sleek Black", "UnBlacklisted", "25/03/2024", ""],
    [
      "3",
      "Lenovo",
      "Computer",
      "14’ Screen Black",
      "Blacklisted",
      "27/03/2024",
      "",
    ],
    ["4", "iPhone", "Phone", "Sleek Black", "UnBlacklisted", "04/01/2024", ""],
    [
      "5",
      "Lenovo",
      "Computer",
      "14’ Screen Black",
      "Blacklisted",
      "24/03/2024",
      "",
    ],
    ["6", "iPhone", "Phone", "Sleek Black", "UnBlacklisted", "21/03/2024", ""],
  ],
};

export const BlackListData = {
  head: ["#", "PRODUCT NAME", "DESCRIPTION", "CRITERIA", "DATE", ""],
  body: [
    ["1", "Lenovo", "Computer", "14’ Screen Black", "Broken", "24/03/2024", ""],
    ["2", "iPhone", "Phone", "Sleek Black", "Good condition", "25/03/2024", ""],
    ["3", "Lenovo", "Computer", "14’ Screen Black", "Broken", "27/03/2024", ""],
    ["4", "iPhone", "Phone", "Sleek Black", "Good condition", "04/01/2024", ""],
    ["5", "Lenovo", "Computer", "14’ Screen Black", "Broken", "24/03/2024", ""],
    ["6", "iPhone", "Phone", "Sleek Black", "Good condition", "21/03/2024", ""],
  ],
};

export const sidebarLinksFunc = (role: string) =>
  role === "UserAdmin"
    ? [
        { title: "Users", Icon: FaUsers, path: "/users" },
        {
          title: "Products",
          Icon: MdOutlineProductionQuantityLimits,
          path: "/products",
        },
        { title: "Settings", Icon: IoMdSettings, path: "/settings" },
      ]
    : role === "BlackListAdmin"
    ? [
        { title: "BlackList", Icon: TiCancelOutline, path: "/blacklist" },
        {
          title: "Products",
          Icon: MdOutlineProductionQuantityLimits,
          path: "/products",
        },
        { title: "Settings", Icon: IoMdSettings, path: "/settings" },
      ]
    : [];

export const inputData = ["Email"];

export const inputDataList = ["Name", "Description"];

export const inputDataEdit = [
  { ph: "First Name", value: "Kalu", opt: [] },
  { ph: "Last Name", value: "Uche", opt: [] },
  { ph: "Email", value: "kalu@email.com", opt: [] },
];

export const inputDataListEdit = [
  { ph: "Name", value: "Lenovo", opt: [] },
  { ph: "Category", value: "electron", opt: [] },
  { ph: "Description", value: "Black Sleek Laptop, 14 inch screen", opt: [] },
  {
    ph: "Reason",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veniam cum pariatur delectus impedit vitae dolor, quidem, illo quisquam eaque corrupti, nesciunt provident optio dolores molestiae itaque earum consequatur distinctio!",
    opt: [],
  },
];

export const inputDataView = [
  ...inputDataEdit,
  { ph: "Role", value: "Admin User" },
];

export const inputDataListView = [
  { ph: "Name", value: "Lenovo" },
  { ph: "Category", value: "Electronics" },
  { ph: "Description", value: "Black Sleek Laptop, 14 inch screen" },
  {
    ph: "Reason",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veniam cum pariatur delectus impedit vitae dolor, quidem, illo quisquam eaque corrupti, nesciunt provident optio dolores molestiae itaque earum consequatur distinctio!",
  },
];

export const inputDataProdView = [
  { ph: "Name", value: "Lenovo" },
  { ph: "Description", value: "Black Sleek Laptop, 14 inch screen" },
  { ph: "Category", value: "Electronics" },
  { ph: "Status", value: "Blacklisted" },
];

export const userOpts = [
  { value: "0", label: "User Admin" },
  { value: "1", label: " BlackList Admin" },
];

export const filterOpts = [
  { value: "all", label: "All Products" },
  { value: "blacklisted", label: "Blacklisted" },
  { value: "unblacklisted", label: "Unblacklisted" },
];

export const cateOpts = [
  { value: "electron", label: "Electronics" },
  { value: "food", label: "Food & Drinks" },
  { value: "phone", label: "Phone" },
  { value: "others", label: "Others" },
];

export const statusOpts = [
  { label: "Blacklist", value: "blc" },
  { label: "Unblacklist", value: "unblc" },
];

export const inputDataProd = [
  { ph: "Name", value: "Lenovo", opt: [] },
  { ph: "Description", value: "14 Inches Black Laptop", opt: [] },
  { ph: "Category", value: "electron", opt: cateOpts },
  { ph: "Status", value: "blc", opt: statusOpts },
];

export const userData = [
  { label: "First Name", data: "Vicolas" },
  { label: "Last Name", data: "Akoh" },
  { label: "Username", data: "Vicolas11" },
  { label: "Email", data: "vicolas@email.com" },
  { label: "Current Password", data: "" },
  { label: "New Password", data: "" },
  { label: "Confirm Password", data: "" },
];

export const selectOptData = [
  { title: "Yes, I have a password!", key: "yes" },
  { title: "No, I don't have a password!", key: "no" },
];

export const userDataFunc = (userInfo: UserData | null) => {
  const fname = userInfo?.given_name.split(" ")[0];
  const lname = userInfo?.given_name.split(" ")[1];

  return [
    { label: "First Name", data: fname || "None" },
    { label: "Last Name", data: lname || "None" },
    { label: "Email", data: userInfo?.email || "None" },
    { label: "Role", data: userInfo?.role || "None" },
    { label: "Date Created", data: formatDate("2024-04-11T21:43:49.6089055") },
    { label: "Current Password", data: "" },
    { label: "New Password", data: "" },
    { label: "Confirm Password", data: "" },
  ];
};

export const modalAnimate = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const errorMsgAnimate = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const navbarAnimate = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const sidebarAnimate = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

export const framerText = (delay: number) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.3 + delay / 10,
    },
  };
};
