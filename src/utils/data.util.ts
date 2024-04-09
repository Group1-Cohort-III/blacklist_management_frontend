export const UserViewData = {
  head: ["S/N", "NAME", "CATEGORY", "DESCRIPTION", "REASON", "DATE"],
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
  head: ["#", "First Name", "Last Name", "Email", "Phone", "Role", ""],
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
  head: ["#", "NAME", "CATEGORY", "DESCRIPTION", "STATUS", "DATE", ""],
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
  head: ["#", "NAME", "CATEGORY", "DESCRIPTION", "REASON", "DATE", ""],
  body: [
    ["1", "Lenovo", "Computer", "14’ Screen Black", "Broken", "24/03/2024", ""],
    ["2", "iPhone", "Phone", "Sleek Black", "Good condition", "25/03/2024", ""],
    ["3", "Lenovo", "Computer", "14’ Screen Black", "Broken", "27/03/2024", ""],
    ["4", "iPhone", "Phone", "Sleek Black", "Good condition", "04/01/2024", ""],
    ["5", "Lenovo", "Computer", "14’ Screen Black", "Broken", "24/03/2024", ""],
    ["6", "iPhone", "Phone", "Sleek Black", "Good condition", "21/03/2024", ""],
  ],
};

export const inputData = ["Email", "Password"];

export const inputDataList = ["Name", "Description"];

export const inputDataEdit = [
  { ph: "First Name", value: "Vicolas", opt: [] },
  { ph: "Last Name", value: "Akoh", opt: [] },
  { ph: "Email", value: "vicolas@email.com", opt: [] },
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
  { value: "user", label: "Admin User" },
  { value: "blacklist", label: " Admin Blacklist" },
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
