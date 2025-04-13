
# 🛍️ Shop Playtorium API

A simple REST API for managing shop items and discount codes, and simulating a shopping process.

## 📝 Prerequisite

- Github
- Docker
- Postman (optional)

## 🔗 Set Up

1. Pull the code

```
git clone https://github.com/manochatt/shop.git
```
2. Run docker compose command

```
docker compose up -d
```
3. Test the API
 - You can use either **Postman** or **http://localhost:3000/api** to test
 - Visit **http://localhost:8081** to see the database.

---

## 📦 Items API

### ➕ Create Item

**POST** `/items`

Create a new item.

**Request Body (example):**

```json
{
  "name": "item_C",
  "category": "accessories",
  "prize": 150
}
```

---

### 📄 Get Item by ID

**GET** `/items/:id`

Retrieve details for a single item.

**Path Variable:**

- `id`: Item ID (e.g. `67f88c4cb2c34b657bdbd190`)

---

### 📋 List Items

**GET** `/items`

Retrieve a list of items with optional filters:

**Query Parameters (optional):**

- `name`: Filter by name
- `categories`: Filter with array of item category (e.g. clothing, accessories)
- `minPrize`: Minimum prize
- `maxPrize`: Maximum prize
- `limit`: Pagination limit
- `offset`: Pagination offset

---

### ✏️ Update Item

**PATCH** `/items/:id`

Update the name or details of an item.

**Request Body (example):**

```json
{
  "name": "shirts",
  "category": "clothing",
  "prize": 300
}
```

---

### 🛒 Shopping

**POST** `/items/shopping`

Simulate a shopping process with optional discount codes and point redemption.

**Request Body (example):**

```json
{
  "itemIds": [
    "67f88c4cb2c34b657bdbd190",
    "67f8ef505a4c544b07e65935",
    "67fa352ffbd5394644da4ba3"
  ],
  "discountCode": "DIS00",
  "point": 78
}
```
> **Note:** discountCode represent to the discount with type coupon | 1 point equal to 1 THB (both field is optional you can fill either or both)

---

## 🎟️ Discounts API

### ➕ Create Discount

**POST** `/discounts`

Create a new discount code.

**Request Body (example):**

```json
{
  "code": "DIS50",
  "value": 50,
  "type": "percent",
  "category": "onTop",
  "itemCategory": "accessories"
}
```

---

### 📄 Get Discount by ID

**GET** `/discounts/:id`

Retrieve a specific discount by its ID.

---

### 📋 List All Discounts

**GET** `/discounts`

Retrieve all available discount codes.

---

### ❌ Delete Discount

**DELETE** `/discounts/:id`

Remove a discount by its ID.

---

## 🤓 Contributor
Manoch Attaudomporn
