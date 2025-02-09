const BASE_URL = "https://6799f906747b09cdcccd31c4.mockapi.io";

window.onload = async () => {
  await loadData();
};

// Function to load and display users
const loadData = async (searchTerm = "") => {
  // Get all users from the backend
  const response = await axios.get(`${BASE_URL}/product`);
  let products = response.data;

  // Filter users based on the search term
  if (searchTerm) {
    products = products.filter(
      (product) =>
        String(product.pro_name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(product.pro_inch)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  // Construct HTML for the table
  let productHTMLData = `
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Inch</th>
          <th>Price</th>
          <th>QTY.</th>
          <th>Gifts</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>`;

  for (let i = 0; i < products.length; i++) {
    //Start Loop Data
    productHTMLData += `<tr>
      <td>${products[i].pro_name}</td>
      <td>${products[i].pro_des}</td>
      <td>${products[i].pro_inch}</td>
      <td>${products[i].pro_price}</td>
      <td>${products[i].pro_qty}</td>
      <td>${products[i].pro_gift}</td>
      <td>
        <button onclick="editUser(${products[i].id})">Edit</button>
        <button class='delete' data-id='${products[i].id}'>Delete</button>
      </td>
    </tr>
    `;
  } // End Loop Data

  productHTMLData += `
      </tbody>
    </table>`;

  // Insert the HTML into the DOM
  let productsDOM = document.getElementById("products");
  productsDOM.innerHTML = productHTMLData;

  // Attach click event listeners to all delete buttons
  let deleteDOMs = document.getElementsByClassName("delete");
  console.log(deleteDOMs);
  for (let i = 0; i < deleteDOMs.length; i++) {
    deleteDOMs[i].addEventListener("click", async (event) => {
      let id = event.target.dataset.id;
      try {
        await axios.delete(`${BASE_URL}/product/${id}`);
        loadData(); // Reload data after deletion
      } catch (error) {
        console.log("error", error);
      }
    });
  }

  // Check if the page was reloaded after an edit
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("edited")) {
    await loadData(); // Reload data after an edit
  }
};

// Function to handle edit action
const editUser = (id) => {
  // Navigate to the edit page and set the edited flag
  window.location.href = `index.html?id=${id}&edited=true`;
};

// Function to handle search action
const handleSearch = async () => {
  const searchInput = document.getElementById("search").value;
  await loadData(searchInput);
};
